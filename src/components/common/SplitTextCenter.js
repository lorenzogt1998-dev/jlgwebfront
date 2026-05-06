import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SplitTextCenter({ title, text, className = "" }) {
    const hasTitle = Boolean(title && title.trim().length > 0);
    return (_jsx("section", { className: ["py-10", className].join(" "), children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 text-center", children: [hasTitle && (_jsx("h2", { className: "text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6", children: title })), _jsx("div", { className: "space-y-4 text-slate-600 leading-relaxed", children: text
                        .filter((t) => t && t.trim() !== "")
                        .map((t, i) => (_jsx("p", { children: t }, i))) })] }) }));
}
