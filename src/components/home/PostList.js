import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export function PostList({ posts }) {
    return (_jsx("div", { id: "archive-wrapper", children: _jsx("ul", { className: "grid gap-8 md:grid-cols-2", children: posts.map((p) => {
                const description = p.title === "SET A DATE"
                    ? "Schedule a concert date for your school and bring the JLG experience to your students."
                    : p.title === "RESERVE TICKET"
                        ? "Reserve your seat for the Legado Tour and enjoy an unforgettable educational concert."
                        : p.excerpt;
                return (_jsxs("li", { className: "\r\n                group relative overflow-hidden rounded-3xl\r\n                bg-gradient-to-b from-neutral-900 to-black\r\n                border border-neutral-800 \r\n                shadow-[0_18px_40px_rgba(0,0,0,0.65)]\r\n                transition-transform duration-300\r\n                hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.9)]\r\n              ", children: [p.image && (_jsx(Link, { to: p.href, className: "block relative", children: _jsx("div", { className: "overflow-hidden rounded-t-3xl", children: _jsx("img", { src: p.image, alt: p.title, className: "\r\n                        w-full aspect-[16/9] object-cover\r\n                        transform transition-transform duration-700\r\n                        group-hover:scale-105\r\n                      " }) }) })), _jsxs("div", { className: "px-6 pt-4 pb-6 text-center border-t border-white/10", children: [_jsx("div", { className: "mx-auto mb-3 h-[2px] w-12 bg-[#ddad0d]" }), _jsx("h2", { className: "text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em]\r\n                             text-[#ddad0d]\r\n                             drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]", style: { fontFamily: "'Cinzel', serif" }, children: _jsx(Link, { to: p.href, className: "text-3xl md:text-4xl font-extrabold tracking-wide uppercase", children: p.title }) }), _jsx("p", { className: "mt-3 text-sm text-slate-200/90 leading-relaxed", children: description })] })] }, p.id));
            }) }) }));
}
