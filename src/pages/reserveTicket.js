import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/reserveTicket.tsx
import { useEffect, useState } from "react";
import { API_BASE_URL, publicFetch } from "@/services/api";
export default function ReserveTicket() {
    const [showDates, setShowDates] = useState([]);
    // ───────────────────────────────
    // 1) Cargar fechas desde backend
    // ───────────────────────────────
    useEffect(() => {
        async function loadDates() {
            try {
                const resp = await publicFetch("/api/show-dates/open");
                if (!resp.ok)
                    throw new Error("Error loading open show dates");
                const data = await resp.json();
                setShowDates(data);
            }
            catch (err) {
                console.error("Error loading available show dates:", err);
                alert("There was a problem loading available show dates.");
            }
        }
        loadDates();
    }, []);
    // ───────────────────────────────
    // 2) Enviar reserva
    // ───────────────────────────────
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
            showDateId: Number(data.get("showDateId")),
            contactName: data.get("contactName"),
            role: data.get("role"),
            email: data.get("email"),
            phone: data.get("phone"),
            school: data.get("school"),
            schoolAddress: data.get("schoolAddress"),
            students: Number(data.get("students")),
            notes: data.get("notes"),
        };
        try {
            const resp = await fetch(`${API_BASE_URL}/api/leads/reserve-ticket`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!resp.ok)
                throw new Error("Error sending form");
            alert("Thanks! Your ticket reservation request was sent.");
            form.reset();
        }
        catch (err) {
            console.error(err);
            alert("There was a problem sending the reservation. Please try again.");
        }
    }
    const formatDate = (date) => {
        if (!date)
            return "-";
        const [year, month, day] = date.split("-").map(Number);
        return new Date(year, month - 1, day).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    };
    // ───────────────────────────────
    // 3) Render del formulario (mismo estilo que SetDate)
    // ───────────────────────────────
    return (_jsx("div", { className: "min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28", children: _jsxs("div", { className: "w-full max-w-3xl", children: [_jsxs("header", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#243f4a] mb-4", children: "Reserve Tickets for Your Students" }), _jsx("p", { className: "text-gray-500 max-w-2xl mx-auto", children: "Choose an available concert date and reserve seats for your school. Our team will confirm your reservation and send you all the details for the Legado Tour concert in your area." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[#243f4a] mb-3", children: "Concert Location" }), _jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Select your show *" }), _jsxs("select", { required: true, name: "showDateId", className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", children: [_jsx("option", { value: "", children: "Select one option\u2026" }), showDates.map((d) => (_jsxs("option", { value: d.id, children: [d.date ? formatDate(d.date) : "-", " — ", d.schoolName, " — ", d.address] }, d.id)))] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[#243f4a] mb-3", children: "Contact Information" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Full Name *" }), _jsx("input", { type: "text", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "contactName" })] }), _jsx("div", { className: "md:col-span-2 flex justify-center", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1 text-center", children: "Cell Phone *" }), _jsx("input", { type: "tel", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "cellphone" })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Email *" }), _jsx("input", { type: "email", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "email" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "School Phone *" }), _jsx("input", { type: "tel", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "phone" })] })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[#243f4a] mb-3", children: "School Reservation" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "School Name *" }), _jsx("input", { type: "text", required: true, 
                                                    //placeholder="Granville High School"
                                                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "school" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "School Address *" }), _jsx("input", { type: "text", required: true, 
                                                    //placeholder="Ex: 248 New Burg Street, Granville, OH, ZIP 43023"
                                                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "schoolAddress" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Number of Students *" }), _jsx("input", { type: "number", required: true, min: 1, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "students" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Comments" }), _jsx("textarea", { className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "notes", placeholder: "Transportation details, accessibility needs, comments\u2026" })] }), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", className: "inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white text-sm font-semibold shadow hover:scale-[1.02] transition-all", children: "Submit Reservation" }) })] }), _jsx("p", { className: "text-xs text-gray-400 text-center mt-8", children: "Sistema de administraci\u00F3n" })] }) }));
}
