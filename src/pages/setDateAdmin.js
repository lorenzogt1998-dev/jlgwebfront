import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { X } from "lucide-react";
export default function SetDateAdmin() {
    const [tours, setTours] = useState([]);
    const [loadingTours, setLoadingTours] = useState(false);
    const [selectedTourId, setSelectedTourId] = useState("");
    const [showMessage, setShowMessage] = useState(null);
    useEffect(() => {
        async function loadTours() {
            try {
                setLoadingTours(true);
                const resp = await adminFetch("/api/tours");
                if (!resp.ok)
                    throw new Error("Error loading tours");
                const data = await resp.json();
                setTours(data);
            }
            catch (err) {
                console.error(err);
                setShowMessage({ type: "error", text: "Error loading tours from backend" });
            }
            finally {
                setLoadingTours(false);
            }
        }
        loadTours();
    }, []);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!selectedTourId) {
            setShowMessage({ type: "error", text: "Please select a tour first." });
            return;
        }
        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
            date: data.get("date"),
            address: data.get("address"),
            schoolName: data.get("schoolName"),
            startTime: data.get("startTime"),
            endTime: data.get("endTime"),
            status: data.get("status"),
        };
        try {
            const resp = await adminFetch(`/api/show-dates/${selectedTourId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!resp.ok)
                throw new Error("Error creating show date");
            const saved = await resp.json();
            setShowMessage({ type: "success", text: `ShowDate created! ID: ${saved.id}` });
            form.reset();
            setSelectedTourId("");
        }
        catch (err) {
            console.error(err);
            setShowMessage({ type: "error", text: "There was a problem creating the show date." });
        }
    }
    function handleCancel() {
        setShowMessage({ type: "info", text: "Accion cancelada!" });
        setTimeout(() => {
            setShowMessage(null);
            window.location.href = "/posts/admin/dashboard";
        }, 2000);
    }
    return (_jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 pt-28", children: [_jsxs("header", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-wide mb-2 text-[#243f4a]", children: "Create Show Date" }), _jsxs("p", { className: "text-gray-600 max-w-2xl mx-auto text-sm md:text-base", children: ["Use this screen to create an official Show Date in the database after reviewing the ", _jsx("strong", { children: "Set a Date" }), " email."] })] }), showMessage && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative text-center", children: [_jsx("button", { onClick: () => setShowMessage(null), className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-xl font-bold text-[#243f4a] mb-4", children: showMessage.type === "success"
                                ? "¡Éxito!"
                                : showMessage.type === "error"
                                    ? "Error"
                                    : "Información" }), _jsx("p", { className: "text-gray-700 text-sm mb-6", children: showMessage.text })] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white shadow-lg rounded-3xl p-6 md:p-8 space-y-6 border border-gray-100", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-3 text-[#243f4a]", children: "Tour" }), _jsx("label", { className: "block text-sm font-medium mb-1", children: "Select Tour *" }), _jsxs("select", { required: true, disabled: loadingTours, value: selectedTourId, onChange: (e) => setSelectedTourId(e.target.value ? Number(e.target.value) : ""), className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", children: [_jsx("option", { value: "", children: "Select a tour\u2026" }), tours.map((t) => (_jsxs("option", { value: t.id, children: [t.year, " \u2014 ", t.name] }, t.id)))] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-3 text-[#243f4a]", children: "Show Date Details" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Date *" }), _jsx("input", { type: "date", required: true, name: "date", className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Start Time *" }), _jsx("input", { type: "time", required: true, name: "startTime", defaultValue: "10:00", className: "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "End Time *" }), _jsx("input", { type: "time", required: true, name: "endTime", defaultValue: "11:30", className: "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Address*" }), _jsx("input", { type: "text", required: true, placeholder: "Ex: 248 New Burg Street, Granville, OH, ZIP 43023", name: "address", className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "School Name *" }), _jsx("input", { type: "text", required: true, placeholder: "Granville High School", name: "schoolName", className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Status" }), _jsxs("select", { name: "status", defaultValue: "OPEN", className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", children: [_jsx("option", { value: "OPEN", children: "OPEN" }), _jsx("option", { value: "CLOSED", children: "CLOSED" }), _jsx("option", { value: "CANCELED", children: "CANCELED" })] })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: handleCancel, className: "px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all", children: "Create Show Date" })] })] })] }));
}
