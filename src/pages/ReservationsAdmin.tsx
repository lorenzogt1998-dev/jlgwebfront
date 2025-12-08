import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { Search, Filter, Trash2, Edit3, Plus, X } from "lucide-react";
import ContactTooltip from "@/components/ContactTooltip";

interface Reservation {
    id: number;
    organizationName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;

    city: string | null;
    state: string | null;
    grades: string | null;
    notes: string | null;

    seatsRequested: number;
    seatsConfirmed: number | null;

    createdAt: string;

    showDate: {
        id: number;
        date: string;
        city: string;
        state: string;
        country: string;
        venueName: string;
        venueType: string;
        timeSlot: string;
        status: string;
        tour: {
            id: number;
            name: string;
            year: number;
        };
    };
}

export default function ReservationsAdmin() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    const [filterId, setFilterId] = useState("");
    const [filterShowDate, setFilterShowDate] = useState("");

    const [editing, setEditing] = useState<Reservation | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [successPopup, setSuccessPopup] = useState<{ title: string; message: string } | null>(null);

    // FORMATEO DE FECHAS DD/MM/YYYY
    const formatDate = (date: string) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        loadReservations();
    }, []);

    async function loadReservations() {
        setLoading(true);
        try {
            const res = await adminFetch("http://localhost:8080/api/reservations");
            const data = await res.json();
            setReservations(data);
        } finally {
            setLoading(false);
        }
    }

    async function filterById() {
        if (!filterId) return loadReservations();
        const res = await adminFetch(`http://localhost:8080/api/reservations/${filterId}`);
        const data = await res.json();
        setReservations([data]);
    }

    // FILTRADO POR FECHA (DD/MM/YYYY -> YYYY-MM-DD)
    const filterByShowDate = async () => {
        if (!filterShowDate) return loadReservations();

        const parts = filterShowDate.split("/");
        if (parts.length !== 3) {
            alert("Formato de fecha incorrecto. Usa DD/MM/YYYY");
            return;
        }

        const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD

        try {
            const res = await adminFetch(`http://localhost:8080/api/reservations/by-show-date/${isoDate}`);
            const data = await res.json();
            setReservations(data);
        } catch (error) {
            console.error("Error fetching reservations by date:", error);
        }
    };

    async function confirmDelete() {
        if (deleteId === null) return;

        await adminFetch(`http://localhost:8080/api/reservations/${deleteId}`, { method: "DELETE" });
        setDeleteId(null);

        setSuccessPopup({
            title: "Reserva eliminada",
            message: "La reserva fue eliminada exitosamente.",
        });
        setTimeout(() => setSuccessPopup(null), 3000);

        loadReservations();
    }

    const showPopup = (title: string, message: string) => {
        setSuccessPopup({ title, message });
        setTimeout(() => setSuccessPopup(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10 pt-28 flex justify-center">
            <div className="w-full max-w-7xl">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center shadow-md">
                            <Filter className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#243f4a]">Reservations Manager</h1>
                            <p className="text-gray-500 text-sm mt-1">Manejo de todas las reservas</p>
                        </div>
                    </div>

                    <a
                        href="http://localhost:5173/posts/reserveTicket/admin"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition"
                    >
                        <Plus className="w-5 h-5" /> Crear reserva
                    </a>
                </div>

                {/* FILTERS */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow p-6 mb-10">
                    <div className="flex flex-wrap justify-center gap-4 items-end">
                        {/* FILTER BY ID */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Filtrar por ID de reserva..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") filterByShowDate();
                                }}
                                value={filterId}
                                onChange={(e) => setFilterId(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a] focus:border-transparent"
                            />
                            <Search
                                onClick={filterById}
                                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer"
                            />
                        </div>

                        {/* FILTER BY SHOW DATE */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Filtrar por fecha del show (DD/MM/YYYY)"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") filterByShowDate();
                                }}
                                value={filterShowDate}
                                onChange={(e) => setFilterShowDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a] focus:border-transparent"
                            />
                            <Search
                                onClick={filterByShowDate}
                                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer"
                            />
                        </div>

                        {/* RESET FILTERS */}
                        <div className="w-full md:w-auto flex justify-center">
                            <button
                                onClick={() => {
                                    setFilterId("");           // Borra el filtro por ID
                                    setFilterShowDate("");     // Borra el filtro por fecha
                                    loadReservations();        // Recarga todas las reservas
                                }}
                                className="w-full md:w-auto px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 transition"
                            >
                                Reset Filters
                            </button>

                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">ID</th>
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Contact</th>
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Organization</th>
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Seats Requested</th>
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Seats Confirmed</th>
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Show Date</th>
                                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Tour</th>
                                <th className="py-3 px-4 text-center text-sm font-semibold text-[#243f4a]">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservations.map((r, i) => (
                                <tr
                                    key={r.id}
                                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#2fa79a]/10 transition`}
                                >
                                    <td className="py-3 px-4 text-sm">{r.id}</td>
                                    <td className="p-2">
                                        <ContactTooltip name={r.contactName} email={r.contactEmail} phone={r.contactPhone} />
                                    </td>
                                    <td className="py-3 px-4 text-sm">{r.organizationName}</td>
                                    <td className="py-3 px-4 text-sm">{r.seatsRequested}</td>
                                    <td className="py-3 px-4 text-sm">{r.seatsConfirmed ?? "-"}</td>
                                    <td className="py-3 px-4 text-sm">{formatDate(r.showDate.date)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{r.showDate.tour.name}</td>
                                    <td className="py-3 px-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => setEditing(r)}
                                            className="px-3 py-2 rounded-lg bg-[#243f4a]/15 text-[#243f4a] hover:bg-[#243f4a]/25 transition flex items-center gap-1"
                                        >
                                            <Edit3 className="w-4 h-4" /> Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(r.id)}
                                            className="px-3 py-2 rounded-lg bg-[#df6a47]/15 text-[#df6a47] hover:bg-[#df6a47]/25 transition flex items-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-xs text-gray-400 text-center mt-8">Sistema de administración</p>
            </div>

            {/* POPUPS & MODALS */}
            {successPopup && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative text-center">
                        <h2 className="text-xl font-bold text-[#243f4a] mb-4">{successPopup.title}</h2>
                        <p className="text-gray-600 text-sm mb-6">{successPopup.message}</p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setSuccessPopup(null)}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteId !== null && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative">
                        <h2 className="text-xl font-bold text-[#243f4a] mb-4 text-center">Confirmar Eliminación</h2>
                        <p className="text-gray-600 text-sm text-center mb-6">¿Seguro que deseas eliminar esta reserva?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#df6a47] to-[#f58c6c] text-white font-semibold shadow hover:scale-[1.02] transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
