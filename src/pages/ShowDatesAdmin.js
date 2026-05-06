import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { CalendarDays, MapPin, Clock, Trash2, RefreshCcw, Info, Search, X, } from "lucide-react";
const ShowDatesAdmin = () => {
    const [showDates, setShowDates] = useState([]);
    const [filteredDates, setFilteredDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // Estados para manejar modal y mensajes
    const [deleteShowId, setDeleteShowId] = useState(null);
    const [forceDelete, setForceDelete] = useState(false);
    const [showMessage, setShowMessage] = useState(null);
    // const token = localStorage.getItem("token");
    const formatTime = (time) => {
        if (!time)
            return "--:--";
        const [hour, minute] = time.split(":");
        return `${hour}:${minute}hs`;
    };
    const formatDate = (date) => {
        if (!date)
            return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };
    const dateToNumber = (dateStr) => {
        const [y, m, d] = dateStr.split("-").map(Number);
        return new Date(y, m - 1, d).getTime(); // fecha local, sin UTC shift
    };
    const fetchShowDates = async () => {
        try {
            const res = await adminFetch("/api/show-dates", {
                method: "GET",
                /*
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                */
            });
            const rawData = await res.json();
            const normalizedData = rawData.map((show) => ({
                ...show,
                address: show.address ?? "",
                schoolName: show.schoolName ?? "",
                startTime: show.startTime ?? "",
                endTime: show.endTime ?? "",
            }));
            /*se ordenan cronologicamente - priorizar los shows que están OPEN,
                  y dentro de cada grupo (OPEN o CLOSED) se ordenan cronológicamente.*/
            const sorted = [...normalizedData].sort((a, b) => {
                if (a.status === "OPEN" && b.status !== "OPEN")
                    return -1;
                if (a.status != "OPEN" && b.status === "OPEN")
                    return 1;
                return dateToNumber(a.date) - dateToNumber(b.date);
            });
            setShowDates(sorted);
            setFilteredDates(sorted);
        }
        catch (error) {
            console.error("Error fetching show dates:", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchShowDates();
    }, []);
    // FILTRADO EN EL FRONTEND
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = showDates.filter((show) => show.address.toLowerCase().includes(term) ||
            show.schoolName.toLowerCase().includes(term) ||
            formatDate(show.date).includes(term));
        setFilteredDates(filtered);
    }, [searchTerm, showDates]);
    // ELIMINAR SHOW DATE
    function handleDelete(id) {
        setDeleteShowId(id);
        setForceDelete(false); // resetear modo forzar al abrir modal
    }
    async function confirmDelete() {
        if (deleteShowId === null)
            return;
        setLoading(true);
        try {
            const resp = await adminFetch(`/api/show-dates/${deleteShowId}?force=${forceDelete}`, { method: "DELETE" });
            //  Show con reservas → pedir confirmación forzada
            if (resp.status === 409 && !forceDelete) {
                setForceDelete(true); //activa segundo popup
                return;
            }
            if (!resp.ok) {
                throw new Error("Error eliminando show");
            }
            // ✅ Eliminado OK
            setShowDates((prev) => prev.filter((s) => s.id !== deleteShowId));
            setShowMessage({
                type: "success",
                text: forceDelete
                    ? "Show eliminado correctamente (forzado)"
                    : "Show eliminado correctamente",
            });
            setDeleteShowId(null);
        }
        catch (err) {
            console.error("Error deleting show date:", err);
            setShowMessage({
                type: "error",
                text: "Error al eliminar el show",
            });
            setDeleteShowId(null);
        }
        finally {
            setLoading(false);
        }
    }
    // CANCELAR ELIMINACIÓN
    function cancelDelete() {
        setDeleteShowId(null);
        setForceDelete(false);
        setShowMessage({ type: "info", text: "Eliminación cancelada" });
        setTimeout(() => setShowMessage(null), 2500);
    }
    // EDITAR STATUS DE SHOW DATE
    const handleEditStatus = async (id) => {
        const currentShow = showDates.find((show) => show.id === id);
        if (!currentShow)
            return;
        const newStatus = currentShow.status === "OPEN" ? "CLOSED" : "OPEN";
        try {
            const res = await adminFetch(`/api/show-dates/${id}/status`, {
                method: "PATCH",
                /*
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                */
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok)
                throw new Error("Failed to update status");
            const updatedShow = await res.json();
            setShowDates(showDates.map((show) => (show.id === id ? updatedShow : show)));
        }
        catch (error) {
            console.error("Error updating status:", error);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-screen text-[#243f4a] text-lg pt-28", children: _jsx("p", { className: "animate-pulse", children: "Cargando fechas..." }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28", children: [_jsxs("div", { className: "w-full max-w-7xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-10 flex-wrap gap-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-14 h-14 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center shadow-md", children: _jsx(CalendarDays, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-[#243f4a]", children: "Fechas de Shows" }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Administraci\u00F3n general de fechas de shows" })] })] }), _jsxs("div", { className: "relative w-full md:w-64", children: [_jsx("input", { type: "text", placeholder: "Buscar por ciudad, fecha o escuela...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a] focus:border-transparent" }), _jsx(Search, { className: "absolute left-3 top-2.5 w-5 h-5 text-gray-400" })] }), _jsx("a", { href: "http://localhost:5173/posts/setDate/admin", className: "mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all", children: "Nuevo Show" })] }), showMessage && (_jsx("div", { className: `
      mb-6 px-4 py-3 rounded-xl text-center text-sm shadow
      ${showMessage.type === "success"
                            ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                            : showMessage.type === "error"
                                ? "bg-[#df6a47]/15 text-[#df6a47]"
                                : "bg-[#243f4a]/10 text-[#243f4a]"}
    `, children: showMessage.text })), _jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow p-6 mb-10", children: [_jsx("h3", { className: "text-sm text-gray-500 font-semibold tracking-wide uppercase", children: "Total de Fechas" }), _jsx("p", { className: "text-4xl font-bold text-[#2fa79a] mt-2", children: filteredDates.length })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredDates.map((show) => (_jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-md p-6 hover:shadow-lg transition-all", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5 text-[#2fa79a]" }), _jsx("h4", { className: "font-bold text-lg text-[#243f4a]", children: show.schoolName.charAt(0).toUpperCase() +
                                                        show.schoolName.slice(1) })] }), _jsx("p", { className: `px-3 py-1 rounded-xl text-xs font-semibold
            ${show.status === "OPEN"
                                                ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                                                : "bg-[#df6a47]/15 text-[#df6a47]"}
        `, children: show.status })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex flex-col mt-4 text-sm text-gray-700 items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4 text-[#243f4a]/70" }), _jsx("span", { className: "font-semibold text-[#243f4a]", children: "Fecha:" }), _jsx("span", { children: formatDate(show.date) })] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Clock, { className: "w-4 h-4 text-[#243f4a]/70" }), _jsx("span", { className: "font-semibold text-[#243f4a]", children: "Time:" }), _jsxs("span", { children: [formatTime(show.startTime), " - ", formatTime(show.endTime)] })] })] }), _jsxs("p", { className: "text-sm text-gray-600 mt-4", children: ["Address: ", show.address] }), show.tour.status && (_jsxs("p", { className: `mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold
                            ${show.tour.status === "ACTIVE"
                                                ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                                                : "bg-[#243f4a]/10 text-[#243f4a]"}
                        `, children: [_jsx(Info, { className: "w-3 h-3" }), "Tour: ", show.tour.status] })), _jsxs("p", { className: "text-xs text-gray-400 mt-3", children: ["Tour: ", show.tour.name] })] }), _jsxs("div", { className: "flex justify-center gap-3 mt-6", children: [_jsxs("button", { onClick: () => handleEditStatus(show.id), className: "px-4 py-2 rounded-xl bg-[#243f4a]/15 text-[#243f4a] hover:bg-[#243f4a]/25 transition-all flex items-center gap-2", children: [_jsx(RefreshCcw, { className: "w-4 h-4" }), show.status === "OPEN" ? "Cerrar" : "Abrir"] }), _jsxs("button", { onClick: () => handleDelete(show.id), className: "px-4 py-2 rounded-xl bg-[#df6a47]/15 text-[#df6a47] hover:bg-[#df6a47]/25 transition-all flex items-center gap-2", children: [_jsx(Trash2, { className: "w-4 h-4" }), "Eliminar"] })] })] }, show.id))) }), _jsx("p", { className: "text-xs text-gray-400 text-center mt-10", children: "Sistema de administraci\u00F3n" })] }), deleteShowId !== null && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative", children: [_jsx("button", { onClick: cancelDelete, className: "absolute right-4 top-4 text-gray-400 hover:text-gray-600", disabled: loading, children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-xl font-bold text-[#243f4a] mb-4 text-center", children: forceDelete ? "Forzar eliminación" : "Confirmar Eliminación" }), _jsx("p", { className: "text-gray-600 text-sm text-center mb-6", children: forceDelete
                                ? "Este show tiene reservas relacionadas.¿Estás seguro que querés eliminar el show y sus reservas relacionadas? Esta acción no se puede deshacer."
                                : "¿Seguro que deseas eliminar este show? Esta acción no se puede deshacer." }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: cancelDelete, className: "px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all", disabled: loading, children: "Cancelar" }), _jsx("button", { onClick: confirmDelete, className: `px-6 py-2.5 rounded-xl ${forceDelete
                                        ? "bg-gradient-to-r from-[#df6a47] to-[#f58c6c]"
                                        : "bg-gradient-to-r from-[#243f4a] to-[#2fa79a]"} text-white font-semibold shadow hover:scale-[1.02] transition-all`, disabled: loading, children: forceDelete ? "Forzar eliminación" : "Eliminar" })] })] }) }))] }));
};
export default ShowDatesAdmin;
