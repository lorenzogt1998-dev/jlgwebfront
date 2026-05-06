import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { MapPinned, Trash2, Pencil, X } from "lucide-react";
export default function ToursListAdmin() {
    const [tours, setTours] = useState([]);
    // Modal de edición
    const [editingTour, setEditingTour] = useState(null);
    const [showMessage, setShowMessage] = useState(null);
    // Modal de eliminación
    const [deleteTourId, setDeleteTourId] = useState(null);
    useEffect(() => {
        async function fetchTours() {
            try {
                const resp = await adminFetch("/api/tours");
                if (!resp.ok)
                    throw new Error("Error loading tours");
                const data = await resp.json();
                setTours(data);
            }
            catch (err) {
                console.error("Error fetching tours:", err);
            }
        }
        fetchTours();
    }, []);
    // --------------------------------------------------
    //  ELIMINAR TOUR (abre modal)
    // --------------------------------------------------
    function handleDelete(id) {
        setDeleteTourId(id); // Abrir modal
    }
    // Confirmar eliminación
    async function confirmDeleteTour() {
        if (deleteTourId === null)
            return;
        try {
            const resp = await adminFetch(`/api/tours/${deleteTourId}`, {
                method: "DELETE",
            });
            if (!resp.ok)
                throw new Error("Error deleting tour");
            setTours((prev) => prev.filter((t) => t.id !== deleteTourId));
            setShowMessage({ type: "success", text: "Tour eliminado correctamente" });
            setTimeout(() => setShowMessage(null), 3000);
        }
        catch (err) {
            console.error("Error deleting tour:", err);
        }
        finally {
            setDeleteTourId(null); // Cerrar modal
        }
    }
    function cancelDelete() {
        setDeleteTourId(null);
        setShowMessage({ type: "info", text: "Eliminación cancelada" });
        setTimeout(() => setShowMessage(null), 2500);
    }
    // --------------------------------------------------
    //  GUARDAR EDICIÓN
    // --------------------------------------------------
    async function handleSave() {
        if (!editingTour)
            return;
        try {
            const resp = await adminFetch(`/api/tours/${editingTour.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingTour),
            });
            if (!resp.ok)
                throw new Error("Error updating tour");
            // Actualizar localmente
            setTours((prev) => prev.map((t) => (t.id === editingTour.id ? editingTour : t)));
            setShowMessage({ type: "success", text: "Tour actualizado correctamente" });
            setEditingTour(null);
            setTimeout(() => setShowMessage(null), 3000);
        }
        catch (err) {
            console.error("Error updating tour:", err);
        }
    }
    // --------------------------------------------------
    //  CANCELAR EDICIÓN
    // --------------------------------------------------
    function handleCancel() {
        setEditingTour(null);
        setShowMessage({ type: "info", text: "Edición cancelada" });
        setTimeout(() => setShowMessage(null), 2500);
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28", children: [_jsxs("div", { className: "w-full max-w-6xl", children: [_jsxs("div", { className: "flex items-center gap-4 mb-6", children: [_jsx("div", { className: "w-14 h-14 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center shadow-md", children: _jsx(MapPinned, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between w-full", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-[#243f4a]", children: "Listado de Tours" }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Administraci\u00F3n general de tours" })] }), _jsx("a", { href: "http://localhost:5173/posts/tour/admin", className: "mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all", children: "Nuevo Tour" })] })] }), showMessage && (_jsx("div", { className: `
            mb-6 px-4 py-3 rounded-xl text-center text-sm shadow 
            ${showMessage.type === "success"
                            ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                            : "bg-[#243f4a]/10 text-[#243f4a]"}
          `, children: showMessage.text })), _jsx("div", { className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-8", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200", children: [_jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "ID" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "Nombre" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a]", children: "A\u00F1o" }), _jsx("th", { className: "py-3 px-4 text-sm font-semibold text-[#243f4a] text-center", children: "Acciones" })] }) }), _jsx("tbody", { children: tours.map((tour, index) => (_jsxs("tr", { className: `transition-all ${index % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#2fa79a]/10`, children: [_jsx("td", { className: "py-3 px-4 text-sm text-gray-700", children: tour.id }), _jsx("td", { className: "py-3 px-4 text-sm text-gray-800 font-medium", children: tour.name }), _jsx("td", { className: "py-3 px-4 text-sm text-gray-700", children: tour.year }), _jsxs("td", { className: "py-3 px-4 flex gap-2 justify-center", children: [_jsxs("button", { onClick: () => setEditingTour(tour), className: "px-3 py-2 rounded-lg bg-[#243f4a]/15 text-[#243f4a] hover:bg-[#243f4a]/25 transition-all flex items-center gap-1", children: [_jsx(Pencil, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Editar" })] }), _jsxs("button", { onClick: () => handleDelete(tour.id), className: "px-3 py-2 rounded-lg bg-[#df6a47]/15 text-[#df6a47] hover:bg-[#df6a47]/25 transition-all flex items-center gap-1", children: [_jsx(Trash2, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Eliminar" })] })] })] }, tour.id))) })] }) }), _jsx("p", { className: "text-xs text-gray-400 text-center mt-8", children: "Sistema de administraci\u00F3n" })] }), editingTour && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-100 relative", children: [_jsx("button", { onClick: handleCancel, className: "absolute right-4 top-4 text-gray-400 hover:text-gray-600", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-2xl font-bold text-[#243f4a] mb-6", children: "Editar Tour" }), _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-semibold text-[#243f4a]", children: "ID" }), _jsx("input", { type: "text", disabled: true, value: editingTour.id, className: "w-full mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-semibold text-[#243f4a]", children: "Nombre" }), _jsx("input", { type: "text", value: editingTour.name, onChange: (e) => setEditingTour({ ...editingTour, name: e.target.value }), className: "w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-semibold text-[#243f4a]", children: "A\u00F1o" }), _jsx("input", { type: "number", value: editingTour.year, onChange: (e) => setEditingTour({ ...editingTour, year: Number(e.target.value) }), className: "w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-8", children: [_jsx("button", { onClick: handleCancel, className: "px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all", children: "Cancelar" }), _jsx("button", { onClick: handleSave, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all", children: "Guardar" })] })] }) })), deleteTourId !== null && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative", children: [_jsx("h2", { className: "text-xl font-bold text-[#243f4a] mb-4 text-center", children: "Confirmar Eliminaci\u00F3n" }), _jsx("p", { className: "text-gray-600 text-sm text-center mb-6", children: "\u00BFSeguro que deseas eliminar este tour? Esta acci\u00F3n no se puede deshacer." }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: cancelDelete, className: "px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all", children: "Cancelar" }), _jsx("button", { onClick: confirmDeleteTour, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#df6a47] to-[#f58c6c] text-white font-semibold shadow hover:scale-[1.02] transition-all", children: "Eliminar" })] })] }) }))] }));
}
