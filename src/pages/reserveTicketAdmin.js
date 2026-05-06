import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/reserveTicketAdmin.tsx
import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api"; // ⬅️ IMPORTANTE
function formatShowDateLocal(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
export default function ReserveTicketAdmin() {
    const [showDates, setShowDates] = useState([]);
    const [loadingDates, setLoadingDates] = useState(false);
    useEffect(() => {
        async function loadShowDates() {
            try {
                setLoadingDates(true);
                // ⬇️ AHORA CON adminFetch (lleva Authorization)
                const resp = await adminFetch("/api/show-dates");
                if (!resp.ok)
                    throw new Error("Error loading show dates");
                const data = await resp.json();
                setShowDates(data);
            }
            catch (err) {
                console.error(err);
                alert("Error loading show dates from backend");
            }
            finally {
                setLoadingDates(false);
            }
        }
        loadShowDates();
    }, []);
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
            city: data.get("city"),
            state: data.get("state"),
            students: Number(data.get("students")),
            grades: data.get("grades"),
            notes: data.get("notes"),
        };
        try {
            // ⬇️ TAMBIÉN adminFetch PARA EL POST
            const resp = await adminFetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!resp.ok)
                throw new Error("Error creating reservation");
            const saved = await resp.json();
            alert(`Reservation created! ID: ${saved.id}`);
            form.reset();
        }
        catch (err) {
            console.error(err);
            alert("There was a problem creating the reservation.");
        }
    }
    return (_jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 pt-28", children: [_jsxs("header", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-wide mb-2", children: "Admin \u00B7 Ticket Reservation" }), _jsx("p", { className: "text-gray-700 max-w-2xl mx-auto", children: "Use this screen to create the official reservation for a school on an existing Show Date." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-3", children: "Show Date" }), _jsx("label", { className: "block text-sm font-medium mb-1", children: "Select Date / City *" }), _jsxs("select", { required: true, name: "showDateId", disabled: loadingDates, className: "w-full border rounded-md px-3 py-2 text-sm", children: [_jsx("option", { value: "", children: "Select one option\u2026" }), showDates.map((d) => (_jsxs("option", { value: d.id, children: [formatShowDateLocal(d.date), " \u2014 ", d.city, ", ", d.state, " \u00B7 ", d.schoolName] }, d.id)))] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-3", children: "School / Contact" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Contact Name *" }), _jsx("input", { type: "text", required: true, name: "contactName", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Role / Title" }), _jsx("input", { type: "text", name: "role", placeholder: "Spanish teacher, Activities director, etc.", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email *" }), _jsx("input", { type: "email", required: true, name: "email", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Phone *" }), _jsx("input", { type: "tel", required: true, name: "phone", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "School Name *" }), _jsx("input", { type: "text", required: true, name: "school", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "City *" }), _jsx("input", { type: "text", required: true, name: "city", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "State *" }), _jsx("input", { type: "text", required: true, name: "state", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Number of Students *" }), _jsx("input", { type: "number", required: true, min: 1, name: "students", className: "w-full border rounded-md px-3 py-2 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Grades / Notes" }), _jsx("input", { type: "text", name: "grades", placeholder: "7th\u201312th, ZIP code, etc.", className: "w-full border rounded-md px-3 py-2 text-sm" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Internal Notes" }), _jsx("textarea", { name: "notes", className: "w-full border rounded-md px-3 py-2 text-sm min-h-[120px]", placeholder: "Transportation details, accessibility needs, comments\u2026" })] }), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", className: "inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition", children: "Create Reservation" }) })] })] }));
}
