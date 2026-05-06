import { jsx as _jsx } from "react/jsx-runtime";
import AdminDashboard from "@/pages/adminDashboard";
import { Navigate, Route } from "react-router-dom";
function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}
_jsx(Route, { path: "/posts/admin/dashboard", element: isAdmin() ? _jsx(AdminDashboard, {}) : _jsx(Navigate, { to: "/posts/admin/login" }) });
