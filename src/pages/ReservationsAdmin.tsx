import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";

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
        }
    };
}

export default function ReservationsAdmin() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    const [filterId, setFilterId] = useState("");
    const [filterShowId, setFilterShowId] = useState("");

    // MODAL
    const [editing, setEditing] = useState<Reservation | null>(null);
    const [newSeatsRequested, setNewSeatsRequested] = useState<number>(0);
    const [newSeatsConfirmed, setNewSeatsConfirmed] = useState<number>(0);

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

    useEffect(() => {
        loadReservations();
    }, []);

    //  FILTRO POR ID
    async function filterById() {
        if (!filterId) return loadReservations();

        const res = await adminFetch(`http://localhost:8080/api/reservations/${filterId}`);
        const data = await res.json();
        setReservations([data]);
    }

    //  FILTRO POR SHOWDATE
    async function filterByShow() {
        if (!filterShowId) return loadReservations();

        const res = await adminFetch(`http://localhost:8080/api/reservations/by-show/${filterShowId}`);
        const data = await res.json();
        setReservations(data);
    }

    //  ELIMINAR
    async function deleteReservation(id: number) {
        if (!confirm("¿Eliminar esta reserva?")) return;

        await adminFetch(`http://localhost:8080/api/reservations/${id}`, {
            method: "DELETE",
        });

        loadReservations();
    }

    // edicion full de la reserva
    function openEditModalFull(r: Reservation) {
        setEditing({ ...r }); // copia
    }

    //  GUARDAR EDICIÓN
    async function saveEdit() {
        if (!editing) return;

        const body = {
            seatsRequested: newSeatsRequested,
            seatsConfirmed: newSeatsConfirmed,
        };

        await adminFetch(`http://localhost:8080/api/reservations/${editing.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        setEditing(null);
        loadReservations();
    }

    return (
        <div className="p-8 pt-28">

            {/* ------ FILTROS ------ */}
            <div className="mb-6 flex gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Filter by Reservation ID"
                        className="border rounded px-3 py-1"
                        value={filterId}
                        onChange={(e) => setFilterId(e.target.value)}
                    />
                    <button
                        onClick={filterById}
                        className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Search
                    </button>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Filter by ShowDate ID"
                        className="border rounded px-3 py-1"
                        value={filterShowId}
                        onChange={(e) => setFilterShowId(e.target.value)}
                    />
                    <button
                        onClick={filterByShow}
                        className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
                    >
                        Search
                    </button>
                </div>

                <button
                    onClick={loadReservations}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                    Reset
                </button>
            </div>

            {/* ------ TABLA ------ */}
            <table className="w-full bg-white shadow rounded border">
                <thead>
                    <tr className="border-b bg-slate-100">
                        <th className="p-2">ID</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Organization</th>
                        <th className="p-2">Seats Req.</th>
                        <th className="p-2">Seats Conf.</th>
                        <th className="p-2">ShowDate</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {reservations.map((r) => (
                        <tr key={r.id} className="border-b hover:bg-slate-50">
                            <td className="p-2">{r.id}</td>
                            <td className="p-2">
                                {r.contactName} <br />
                                {r.contactEmail}
                            </td>
                            <td className="p-2">{r.organizationName}</td>
                            <td className="p-2">{r.seatsRequested}</td>
                            <td className="p-2">{r.seatsConfirmed}</td>
                            <td className="p-2">{r.showDate.id}</td>

                            <td className="p-2 flex gap-2">
                                <button
                                    onClick={() => openEditModalFull(r)}
                                    className="px-2 py-1 bg-purple-600 text-white rounded"
                                >
                                    Edit Full
                                </button>

                                <button
                                    onClick={() => deleteReservation(r.id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL EDICIÓN COMPLETA --- */}
{editing && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-xl w-[500px]">
            <h2 className="text-xl font-bold mb-4">
                Edit Full Reservation #{editing.id}
            </h2>

            <div className="grid grid-cols-1 gap-3">

                <input
                    className="border p-2 rounded"
                    placeholder="Organization Name"
                    defaultValue={editing.organizationName}
                    onChange={(e) => editing.organizationName = e.target.value}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Contact Name"
                    defaultValue={editing.contactName}
                    onChange={(e) => editing.contactName = e.target.value}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Email"
                    defaultValue={editing.contactEmail}
                    onChange={(e) => editing.contactEmail = e.target.value}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Phone"
                    defaultValue={editing.contactPhone}
                    onChange={(e) => editing.contactPhone = e.target.value}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="City"
                    defaultValue={editing.city || ""}
                    onChange={(e) => editing.city = e.target.value}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="State"
                    defaultValue={editing.state || ""}
                    onChange={(e) => editing.state = e.target.value}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Grades"
                    defaultValue={editing.grades || ""}
                    onChange={(e) => editing.grades = e.target.value}
                />

                <textarea
                    className="border p-2 rounded"
                    placeholder="Notes"
                    defaultValue={editing.notes || ""}
                    onChange={(e) => editing.notes = e.target.value}
                />

                <input
                    type="number"
                    className="border p-2 rounded"
                    placeholder="Seats Requested"
                    defaultValue={editing.seatsRequested}
                    onChange={(e) => editing.seatsRequested = Number(e.target.value)}
                />

                <input
                    type="number"
                    className="border p-2 rounded"
                    placeholder="Seats Confirmed"
                    defaultValue={editing.seatsConfirmed || 0}
                    onChange={(e) => editing.seatsConfirmed = Number(e.target.value)}
                />

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-5">
                <button
                    onClick={() => setEditing(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                    Cancel
                </button>

                <button
                    onClick={async () => {
                        await adminFetch(`http://localhost:8080/api/reservations/${editing.id}/full`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(editing),
                        });

                        setEditing(null);
                        loadReservations();
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
}