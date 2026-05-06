import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SplitSection({ title, text, image, flip = false, }) {
    return (_jsx("section", { className: "py-16 bg-white", children: _jsxs("div", { className: `w-full px-4 flex flex-col md:flex-row items-center gap-10 ${flip ? "md:flex-row-reverse" : ""}`, children: [_jsx("div", { className: "md:w-1/2", children: _jsx("img", { src: image, alt: title, className: "w-full rounded-2xl shadow-md object-cover" }) }), _jsxs("div", { className: "md:w-1/2", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6 text-gray-900", children: title }), _jsx("div", { className: "space-y-4 text-gray-700 leading-relaxed", children: Array.isArray(text)
                                ? text
                                    .filter((t) => t && t.trim() !== "")
                                    .map((t, i) => _jsx("p", { children: t }, i))
                                : _jsx("p", { children: text }) })] })] }) }));
}
