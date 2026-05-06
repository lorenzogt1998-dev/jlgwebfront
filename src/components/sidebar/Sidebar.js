import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Sidebar({ widgets }) {
    return (_jsx("aside", { id: "sidebar-wrapper", className: "w-full px-4", children: _jsx("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: widgets.map((w) => (_jsxs("li", { className: "border rounded-3xl p-6 shadow-lg bg-white/80 backdrop-blur-sm border-gray-100", children: [w.title && (_jsx("h4", { className: "font-semibold text-lg mb-4 text-[#243f4a] border-b pb-2", children: w.title })), _jsx("div", { className: "text-sm text-gray-700", children: w.content })] }, w.id))) }) }));
}
