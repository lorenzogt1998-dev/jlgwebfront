import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/app/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout() {
    return (_jsxs("div", { className: "legacy", children: [_jsx(Header, {}), _jsx("main", { id: "wrapper", className: "pt-[92px]", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
}
