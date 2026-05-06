import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API BASE URL =", API_BASE_URL);
export default function SetDate() {
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
            contactName: data.get("contactName"),
            role: data.get("role"),
            email: data.get("email"),
            cellphone: data.get("cellphone"),
            schoolphone: data.get("schoolphone"),
            school: data.get("school"),
            address: data.get("address"),
            capacity: data.get("capacity") ? Number(data.get("capacity")) : null,
            preferredDate: data.get("preferredDate"),
            notes: data.get("notes"),
        };
        try {
            const resp = await fetch(`${API_BASE_URL}/api/leads/set-date`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!resp.ok)
                throw new Error("Error sending form");
            alert("Thanks! Your Set a Date request was sent.");
            form.reset();
        }
        catch (err) {
            console.error(err);
            alert("There was a problem sending the form. Please try again.");
        }
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28", children: _jsxs("div", { className: "w-full max-w-3xl", children: [_jsxs("header", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#243f4a] mb-4", children: "Set a Date for Your School" }), _jsx("p", { className: "text-gray-500 max-w-2xl mx-auto", children: "Bring the Justo Lamas Group Concert to your school for an unforgettable musical and cultural experience. Complete this form and our team will contact you to coordinate dates, details, and availability." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[#243f4a] mb-3", children: "Contact Information" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Full Name *" }), _jsx("input", { type: "text", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "contactName" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Email *" }), _jsx("input", { type: "email", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "email" })] }), _jsx("div", { className: "md:col-span-2 flex justify-center", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1 text-center", children: "Cell Phone *" }), _jsx("input", { type: "tel", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "cellphone" })] }) })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[#243f4a] mb-3", children: "School Information" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "School Name *" }), _jsx("input", { type: "text", 
                                                    //placeholder="Granville High School"
                                                    required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "school" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Address *" }), _jsx("input", { type: "text", required: true, 
                                                    //placeholder="Ex: 248 New Burg Street, Granville, OH, ZIP 43023"
                                                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "address" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "School Phone *" }), _jsx("input", { type: "tel", required: true, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "schoolphone" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Estimated Capacity (seats)" }), _jsx("input", { type: "number", min: 0, className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", name: "capacity" })] })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[#243f4a] mb-3 text-center", children: "Date" }), _jsx("div", { className: "grid md:grid-cols-2 gap-4 justify-center", children: _jsx("div", { className: "md:col-span-2 flex justify-center", children: _jsxs("div", { className: "w-full md:w-1/2", children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1 text-center", children: "Preferred Month" }), _jsx("input", { type: "text", className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", placeholder: "Ex: April or Spring 2026 - 2027", name: "preferredDate" })] }) }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-[#243f4a] mb-1", children: "Comments" }), _jsx("textarea", { className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]", placeholder: "Tell us about your group, language levels, special needs, or questions.", name: "notes" })] }), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", className: "inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white text-sm font-semibold shadow hover:scale-[1.02] transition-all", children: "Submit Request" }) })] }), _jsx("p", { className: "text-xs text-gray-400 text-center mt-8", children: "Sistema de administraci\u00F3n" })] }) }));
}
