import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Sidebar from "./Sidebar";
export default function SidebarGeneral() {
    const widgets = [
        {
            id: "contact",
            title: "Need help?",
            content: (_jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("a", { href: "mailto:concerts@justolamasgroup.com", className: "flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition", children: [_jsx(Mail, { className: "h-4 w-4 text-slate-600" }), _jsx("span", { className: "font-medium text-slate-800", children: "Email" }), _jsx("span", { className: "ml-auto text-blue-600", children: "concerts@justolamasgroup.com" })] }), _jsxs("a", { href: "tel:+16827101443", className: "flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition", children: [_jsx(Phone, { className: "h-4 w-4 text-slate-600" }), _jsx("span", { className: "font-medium text-slate-800", children: "Text only" }), _jsx("span", { className: "ml-auto text-blue-600", children: "(682) 710-1443" })] }), _jsxs("a", { href: "https://wa.me/541150455615", target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition", children: [_jsx(MessageCircle, { className: "h-4 w-4 text-slate-600" }), _jsx("span", { className: "font-medium text-slate-800", children: "WhatsApp" }), _jsx("span", { className: "ml-auto text-blue-600", children: "+54 11 5045-5615" })] })] })),
        },
        {
            id: "follow",
            title: "Follow us",
            content: (_jsxs("div", { className: "flex flex-col gap-2 text-sm", children: [_jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noreferrer", className: "rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition text-blue-600", children: "Facebook" }), _jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noreferrer", className: "rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition text-blue-600", children: "Instagram" })] })),
        },
    ];
    return _jsx(Sidebar, { widgets: widgets });
}
