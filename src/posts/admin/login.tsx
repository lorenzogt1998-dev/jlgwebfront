import AdminDashboard from "@/pages/adminDashboard";
import { Navigate, Route } from "react-router-dom";

function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}

<Route path="/posts/admin/dashboard" element={isAdmin() ? <AdminDashboard /> : <Navigate to="/posts/admin/login" />}
/>
