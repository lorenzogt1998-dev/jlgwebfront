import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Tour.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
// ------- helpers -------
function parseLocalDate(dateStr) {
    // dateStr = "YYYY-MM-DD"
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d); // LOCAL, sin UTC shift
}
function monthNameFromDate(d) {
    return d.toLocaleString("en-US", { month: "long" });
}
function formatDateHuman(dateStr) {
    const d = parseLocalDate(dateStr); // 🔴 ACÁ está el fix
    if (Number.isNaN(d.getTime()))
        return dateStr;
    return `${monthNameFromDate(d)} ${d.getDate()}, ${d.getFullYear()}`;
}
function StatusButton({ show }) {
    const baseBtn = "inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition transform hover:-translate-y-0.5";
    if (show.status === "OPEN") {
        // Podés cambiar la ruta cuando tengas tu flujo de reservas definido
        return (_jsxs("div", { className: "space-y-1", children: [_jsx(Link, { to: `/posts/reserveTicket`, className: `${baseBtn} bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 hover:brightness-110`, children: "Reserve Seats" }), _jsx("p", { className: "text-xs text-amber-500 italic", children: "tickets available" })] }));
    }
    if (show.status === "CANCELED") {
        return (_jsx("p", { className: "text-xs text-red-400 italic", children: "This show was canceled." }));
    }
    if (show.status === "CLOSED") {
        return (_jsx("p", { className: "text-xs text-slate-400 italic", children: "Reservations are closed." }));
    }
    return _jsx("p", { className: "text-xs text-slate-400", children: "\u00A0" });
}
function formatTime(timeStr) {
    if (!timeStr)
        return "";
    const [h, m] = timeStr.split(":");
    return `${h}:${m}`;
}
function Accordion({ title, items }) {
    const [open, setOpen] = useState(null);
    const list = useMemo(() => items
        .slice()
        .sort((a, b) => parseLocalDate(a.date).getTime() -
        parseLocalDate(b.date).getTime()), [items]);
    if (!list.length)
        return null;
    return (_jsxs("section", { className: "mx-auto max-w-6xl px-4 py-10", children: [_jsx("h4", { className: "text-center text-xl font-semibold mb-6 tracking-wide text-slate-900", children: title }), _jsx("ul", { className: "space-y-4", children: list.map((show, idx) => {
                    const isOpen = open === idx;
                    const showDate = new Date(show.date);
                    return (_jsxs("li", { className: "rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 shadow-2xl border border-slate-700/70 overflow-hidden", children: [_jsxs("button", { type: "button", onClick: () => setOpen(isOpen ? null : idx), className: "w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/70 transition", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:gap-4", children: [_jsx("span", { className: "text-sm font-semibold text-amber-300", children: formatDateHuman(show.date) }), _jsx("span", { className: "text-sm text-slate-200", children: show.address }), _jsx("span", { className: "text-xs text-slate-400", children: show.schoolName }), _jsxs("span", { className: "text-xs text-slate-400", children: [formatTime(show.startTime), " \u2014 ", formatTime(show.endTime)] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [show.status && (_jsx("span", { className: "text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-amber-400/60 text-amber-200", children: show.status })), _jsx("span", { className: "text-xs text-amber-300", children: isOpen ? "hide details" : "more info" })] })] }), isOpen && (_jsx("div", { className: "px-6 pb-6 pt-2 border-t border-slate-700/70", children: _jsxs("div", { className: "grid md:grid-cols-3 gap-6 pt-3", children: [_jsxs("div", { className: "md:col-span-2 text-sm leading-6 space-y-1", children: [_jsxs("p", { children: [_jsx("strong", { className: "text-slate-100", children: "Date:" }), " ", formatDateHuman(show.date)] }), _jsxs("p", { children: [_jsx("strong", { className: "text-slate-100", children: "Time:" }), " ", formatTime(show.startTime), " \u2014 ", formatTime(show.endTime)] }), _jsxs("p", { children: [_jsx("strong", { className: "text-slate-100", children: "School:" }), " ", show.schoolName] }), _jsxs("p", { children: [_jsx("strong", { className: "text-slate-100", children: "Address:" }), " ", show.address] })] }), _jsxs("div", { className: "flex flex-col items-center justify-center gap-3 text-center", children: [_jsx(StatusButton, { show: show }), _jsx("p", { className: "text-[11px] text-slate-400 max-w-[14rem]", children: "Need help? Write us and we\u2019ll assist you with the booking process." })] })] }) }))] }, show.id));
                }) })] }));
}
// --------- PAGE ----------
export default function Tour() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_BASE_URL}/api/show-dates`);
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                const data = await res.json();
                setShows(data);
            }
            catch (err) {
                console.error(err);
                setError("Could not load tour dates. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);
    return (_jsxs("div", { className: "pt-28 pb-16", children: [_jsxs("div", { className: "max-w-4xl mx-auto px-4 mb-10 text-center", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900", children: "Tour Dates" }), _jsxs("p", { className: "mt-3 text-slate-600 text-sm md:text-base", children: ["The", " ", _jsx("strong", { className: "text-amber-600", children: "Justo Lamas Group Concerts" }), " ", "are an educational program with the primary objective of promoting the study of the Spanish language through music."] }), _jsx("p", { className: "mt-2 text-slate-600 text-sm md:text-base", children: "During the last years we have taken concerts to schools all across the USA, creating enthusiasm and motivation for Spanish in thousands of students." }), _jsx("p", { className: "mt-2 text-slate-700 text-sm md:text-base", children: _jsx("strong", { children: _jsx("em", { children: "The JLG Concerts program is much more than a concert \u2013 it is an inspiring educational experience." }) }) })] }), _jsx("div", { className: "max-w-4xl mx-auto px-4 mb-10", children: _jsx("a", { href: "/book_a_date.php", className: "block", children: _jsx("img", { src: "/images/222.png", alt: "Set a Date", className: "w-full rounded-3xl shadow-xl border border-slate-200" }) }) }), loading && (_jsx("p", { className: "text-center text-sm text-slate-500", children: "Loading tour dates..." })), error && (_jsx("p", { className: "text-center text-sm text-red-500 mb-4", children: error })), !loading && !error && (_jsx(Accordion, { title: "Legado Tour 2026-2027", items: shows })), _jsx("div", { className: "max-w-4xl mx-auto px-4 mt-10 text-right text-xs text-slate-500", children: _jsx(Link, { to: "/booking", className: "underline hover:text-amber-600", children: "Go to booking" }) })] }));
}
