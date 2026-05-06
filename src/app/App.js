import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Tour from "../pages/tour";
import Contact from "../pages/contact";
import Layout from "./Layout";
import ContactConfirm from "@/pages/contactConfirm";
import ThankYou from "@/pages/thankYou";
import "@/styles/legacy.css";
import ReserveTicket from "@/pages/reserveTicket";
import SetDate from "@/pages/setDate";
import Services from "@/pages/services";
import MediaPage from "@/pages/media";
import SetDateAdmin from "@/pages/setDateAdmin";
import ReserveTicketAdmin from "@/pages/reserveTicketAdmin";
import AdminDashboard from "@/pages/adminDashboard";
import AdminTour from "@/pages/adminTour";
import AdminLogin from "@/pages/login";
import ToursListAdmin from "@/pages/toursListAdmin";
import ShowDatesAdmin from "@/pages/ShowDatesAdmin";
import ReservationsAdmin from "@/pages/ReservationsAdmin";
// Wrapper para proteger rutas admin
function RequireAdmin({ children }) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    return isAdmin ? children : _jsx(Navigate, { to: "/admin/login", replace: true });
}
export default function App() {
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/tour", element: _jsx(Tour, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/contact/confirm", element: _jsx(ContactConfirm, {}) }), _jsx(Route, { path: "/thank-you", element: _jsx(ThankYou, {}) }), _jsx(Route, { path: "/services", element: _jsx(Services, {}) }), _jsx(Route, { path: "/media", element: _jsx(MediaPage, {}) }), _jsx(Route, { path: "/posts/setadate", element: _jsx(SetDate, {}) }), _jsx(Route, { path: "/posts/reserveticket", element: _jsx(ReserveTicket, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: "/posts/tour/admin", element: _jsx(RequireAdmin, { children: _jsx(AdminTour, {}) }) }), _jsx(Route, { path: "/posts/setdate/admin", element: _jsx(RequireAdmin, { children: _jsx(SetDateAdmin, {}) }) }), _jsx(Route, { path: "/posts/reserveTicket/admin", element: _jsx(RequireAdmin, { children: _jsx(ReserveTicketAdmin, {}) }) }), _jsx(Route, { path: "/posts/admin/dashboard", element: _jsx(RequireAdmin, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/admin/tours", element: _jsx(RequireAdmin, { children: _jsx(ToursListAdmin, {}) }) }), _jsx(Route, { path: "/admin/showdates", element: _jsx(RequireAdmin, { children: _jsx(ShowDatesAdmin, {}) }) }), _jsx(Route, { path: "/admin/reservations", element: _jsx(RequireAdmin, { children: _jsx(ReservationsAdmin, {}) }) }), _jsx(Route, { path: "*", element: _jsx("div", { className: "p-8", children: "Not found" }) })] }) }));
}
