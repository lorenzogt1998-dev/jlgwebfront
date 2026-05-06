import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { Search, Filter, Trash2, Edit3, Plus, X } from "lucide-react";
import ContactTooltip from "@/components/ContactTooltip";
export default function ReservationsAdmin() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterId, setFilterId] = useState("");
    const [filterShowDate, setFilterShowDate] = useState("");
    const [editing, setEditing] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [successPopup, setSuccessPopup] = useState(null);
    // FORMATEO DE FECHAS DD/MM/YYYY
    const formatDate = (date) => {
        if (!date)
            return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };
    useEffect(() => {
        loadReservations();
    }, []);
    async function loadReservations() {
        setLoading(true);
        try {
            const res = await adminFetch("/api/reservations");
            const data = await res.json();
            const activeReservations = data.filter((reservation) => reservation.showDate && reservation.showDate.deleted === false);
            setReservations(activeReservations);
        }
        finally {
            setLoading(false);
        }
    }
    async function filterById() {
        if (!filterId)
            return loadReservations();
        const res = await adminFetch(`/api/reservations/${filterId}`);
        const data = await res.json();
        setReservations([data]);
    }
    // FILTRADO POR FECHA (DD/MM/YYYY -> YYYY-MM-DD)
    const filterByShowDate = async () => {
        if (!filterShowDate)
            return loadReservations();
        const parts = filterShowDate.split("/");
        if (parts.length !== 3) {
            alert("Formato de fecha incorrecto. Usa DD/MM/YYYY");
            return;
        }
        const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
        try {
            const res = await adminFetch(`/api/reservations/by-show-date/${isoDate}`);
            const data = await res.json();
            setReservations(data);
        }
        catch (error) {
            console.error("Error fetching reservations by date:", error);
        }
    };
    async function confirmDelete() {
        if (deleteId === null)
            return;
        await adminFetch(`/api/reservations/${deleteId}`, { method: "DELETE" });
        setDeleteId(null);
        setSuccessPopup({
            title: "Reserva eliminada",
            message: "La reserva fue eliminada exitosamente.",
        });
        setTimeout(() => setSuccessPopup(null), 3000);
        loadReservations();
    }
    const showPopup = (title, message) => {
        setSuccessPopup({ title, message });
        setTimeout(() => setSuccessPopup(null), 3000);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 px-6 py-10 pt-28 flex justify-center", children: [_jsxs("div", { className: "w-full max-w-7xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-10", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-14 h-14 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center shadow-md", children: _jsx(Filter, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-[#243f4a]", children: "Reservations Manager" }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Manejo de todas las reservas" })] })] }), _jsxs("a", { href: "http://localhost:5173/posts/reserveTicket/admin", className: "flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition", children: [_jsx(Plus, { className: "w-5 h-5" }), " Crear reserva"] })] }), _jsx("div", { className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow p-6 mb-10", children: _jsxs("div", { className: "flex flex-wrap justify-center gap-4 items-end", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx("input", { type: "text", placeholder: "Filtrar por ID de reserva...", onKeyDown: (e) => {
                                                if (e.key === "Enter")
                                                    filterByShowDate();
                                            }, value: filterId, onChange: (e) => setFilterId(e.target.value), className: "w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a] focus:border-transparent" }), _jsx(Search, { onClick: filterById, className: "absolute left-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer" })] }), _jsxs("div", { className: "relative w-full md:w-64", children: [_jsx("input", { type: "text", placeholder: "Filtrar por fecha del show (DD/MM/YYYY)", onKeyDown: (e) => {
                                                if (e.key === "Enter")
                                                    filterByShowDate();
                                            }, value: filterShowDate, onChange: (e) => setFilterShowDate(e.target.value), className: "w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a] focus:border-transparent" }), _jsx(Search, { onClick: filterByShowDate, className: "absolute left-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer" })] }), _jsx("div", { className: "w-full md:w-auto flex justify-center", children: _jsx("button", { onClick: () => {
                                            setFilterId(""); // Borra el filtro por ID
                                            setFilterShowDate(""); // Borra el filtro por fecha
                                            loadReservations(); // Recarga todas las reservas
                                        }, className: "w-full md:w-auto px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 transition", children: "Reset Filters" }) })] }) }), _jsx("div", { className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6", children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200", children: [_jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "ID" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Contact" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Organization" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Seats Requested" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Seats Confirmed" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Show Date" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Tour" }), _jsx("th", { className: "py-3 px-4 text-center text-sm font-semibold text-[#243f4a]", children: "Actions" })] }) }), _jsx("tbody", { children: reservations.map((r, i) => (_jsxs("tr", { className: `${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#2fa79a]/10 transition`, children: [_jsx("td", { className: "py-3 px-4 text-sm", children: r.id }), _jsx("td", { className: "p-2", children: _jsx(ContactTooltip, { name: r.contactName, email: r.contactEmail, phone: r.contactPhone }) }), _jsx("td", { className: "py-3 px-4 text-sm", children: r.organizationName }), _jsx("td", { className: "py-3 px-4 text-sm", children: r.seatsRequested }), _jsx("td", { className: "py-3 px-4 text-sm", children: r.seatsConfirmed ?? "-" }), _jsx("td", { className: "py-3 px-4 text-sm", children: formatDate(r.showDate.date) }), _jsx("td", { className: "py-3 px-4 text-sm text-gray-700", children: r.showDate.tour.name }), _jsxs("td", { className: "py-3 px-4 flex gap-2 justify-center", children: [_jsxs("button", { onClick: () => setEditing(r), className: "px-3 py-2 rounded-lg bg-[#243f4a]/15 text-[#243f4a] hover:bg-[#243f4a]/25 transition flex items-center gap-1", children: [_jsx(Edit3, { className: "w-4 h-4" }), " Edit"] }), _jsxs("button", { onClick: () => setDeleteId(r.id), className: "px-3 py-2 rounded-lg bg-[#df6a47]/15 text-[#df6a47] hover:bg-[#df6a47]/25 transition flex items-center gap-1", children: [_jsx(Trash2, { className: "w-4 h-4" }), " Delete"] })] })] }, r.id))) })] }) }), _jsx("p", { className: "text-xs text-gray-400 text-center mt-8", children: "Sistema de administraci\u00F3n" })] }), successPopup && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] px-4", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative text-center", children: [_jsx("h2", { className: "text-xl font-bold text-[#243f4a] mb-4", children: successPopup.title }), _jsx("p", { className: "text-gray-600 text-sm mb-6", children: successPopup.message }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { onClick: () => setSuccessPopup(null), className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition", children: "OK" }) })] }) })), deleteId !== null && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative", children: [_jsx("h2", { className: "text-xl font-bold text-[#243f4a] mb-4 text-center", children: "Confirmar Eliminaci\u00F3n" }), _jsx("p", { className: "text-gray-600 text-sm text-center mb-6", children: "\u00BFSeguro que deseas eliminar esta reserva?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: () => setDeleteId(null), className: "px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition", children: "Cancelar" }), _jsx("button", { onClick: confirmDelete, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#df6a47] to-[#f58c6c] text-white font-semibold shadow hover:scale-[1.02] transition", children: "Eliminar" })] })] }) })), editing && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-white shadow-lg rounded-3xl p-6 md:p-8 w-full max-w-lg border border-gray-100 max-h-[90vh] overflow-y-auto relative", children: [_jsx("button", { onClick: () => {
                                setEditing(null);
                                showPopup("Edición cancelada", "Se canceló la edición exitosamente.");
                            }, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-xl md:text-2xl font-bold text-[#243f4a] mb-6 text-center", children: "Editar Reserva" }), _jsxs("form", { onSubmit: async function handleSubmit(e) {
                                e.preventDefault();
                                try {
                                    // 1️⃣ Actualizar campos de reserva (reservation)
                                    const reservationUpdate = {
                                        organizationName: editing.organizationName,
                                        contactName: editing.contactName,
                                        contactEmail: editing.contactEmail,
                                        contactPhone: editing.contactPhone,
                                        address: editing.address,
                                        notes: editing.notes,
                                        seatsRequested: editing.seatsRequested,
                                        seatsConfirmed: editing.seatsConfirmed,
                                    };
                                    await adminFetch(`/api/reservations/${editing.id}/full`, {
                                        method: "PATCH",
                                        body: JSON.stringify(reservationUpdate),
                                    });
                                    // 2️⃣ Actualizar campos de ShowDate
                                    const showDateUpdate = {
                                        date: editing.showDate.date,
                                        schoolName: editing.showDate.schoolName,
                                        address: editing.showDate.address,
                                        startTime: editing.showDate.startTime,
                                        endTime: editing.showDate.endTime,
                                        status: editing.showDate.status,
                                    };
                                    await adminFetch(`/api/show-dates/${editing.showDate.id}/status`, {
                                        method: "PATCH",
                                        body: JSON.stringify(showDateUpdate),
                                    });
                                    setEditing(null);
                                    loadReservations();
                                    showPopup("Edición exitosa", "Los cambios se guardaron correctamente.");
                                }
                                catch (error) {
                                    console.error(error);
                                    showPopup("Error", "Ocurrió un problema al guardar los cambios.");
                                }
                            }, className: "space-y-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Escuela" }), _jsx("input", { type: "text", value: editing.organizationName, onChange: (e) => setEditing({
                                                        ...editing,
                                                        organizationName: e.target.value,
                                                    }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Contact Name" }), _jsx("input", { type: "text", value: editing.contactName, onChange: (e) => setEditing({ ...editing, contactName: e.target.value }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Contact Email" }), _jsx("input", { type: "email", value: editing.contactEmail, onChange: (e) => setEditing({ ...editing, contactEmail: e.target.value }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Contact Phone" }), _jsx("input", { type: "text", value: editing.contactPhone, onChange: (e) => setEditing({ ...editing, contactPhone: e.target.value }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Address" }), _jsx("input", { type: "text", value: editing.address, onChange: (e) => setEditing({ ...editing, address: e.target.value }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Notes" }), _jsx("textarea", { value: editing.notes ?? "", onChange: (e) => setEditing({ ...editing, notes: e.target.value }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Seats Requested" }), _jsx("input", { type: "number", value: editing.seatsRequested, onChange: (e) => setEditing({
                                                        ...editing,
                                                        seatsRequested: Number(e.target.value),
                                                    }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Seats Confirmed" }), _jsx("input", { type: "number", value: editing.seatsConfirmed ?? "", onChange: (e) => setEditing({
                                                        ...editing,
                                                        seatsConfirmed: e.target.value
                                                            ? Number(e.target.value)
                                                            : null,
                                                    }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Show Date" }), _jsx("input", { type: "date", value: editing.showDate.date, onChange: (e) => setEditing({
                                                        ...editing,
                                                        showDate: { ...editing.showDate, date: e.target.value },
                                                    }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Show School Name" }), _jsx("input", { type: "text", value: editing.showDate.schoolName, onChange: (e) => setEditing({
                                                        ...editing,
                                                        showDate: {
                                                            ...editing.showDate,
                                                            schoolName: e.target.value,
                                                        },
                                                    }), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: () => {
                                                setEditing(null);
                                                showPopup("Edición cancelada", "Se canceló la edición exitosamente.");
                                            }, className: "px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all", children: "Cancelar" }), _jsx("button", { type: "submit", className: "px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all", children: "Guardar" })] })] })] }) }))] }));
}
