import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SidebarSmall() {
    const widgets = [
        {
            id: "promo1",
            title: "Upcoming Concert",
            content: (_jsxs("p", { children: ["Join ", _jsx("strong", { children: "Edgar Rene" }), " on the ", _jsx("em", { children: "Bien Tour 2025" }), "!", _jsx("br", {}), _jsx("a", { href: "/tour", className: "text-blue-500 underline", children: "View tour dates \u2192" })] })),
        },
        {
            id: "promo2",
            title: "Teachers' Resources",
            content: (_jsx("a", { href: "/downloads", className: "text-blue-600 underline", children: "Download lesson materials" })),
        },
    ];
    return (_jsx("div", { id: "sidebar-small-wrapper", className: "my-8", children: _jsx("ul", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3", children: widgets.map((w) => (_jsxs("li", { className: "border rounded-lg p-4 shadow-sm bg-white/70 backdrop-blur-sm", children: [_jsx("h4", { className: "font-semibold text-lg mb-2", children: w.title }), _jsx("div", { className: "text-sm text-gray-700", children: w.content })] }, w.id))) }) }));
}
