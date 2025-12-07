import { JSX } from "react";
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
import AdminLogin from "@/pages/login";// importa la vista de login
import ToursListAdmin from "@/pages/toursListAdmin";



// 🔐 Wrapper para proteger rutas admin
function RequireAdmin({ children }: { children: JSX.Element }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* TODAS las rutas cuelgan de Layout para que veas header y footer */}
      <Route element={<Layout />}>
        {/* públicas */}
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/confirm" element={<ContactConfirm />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/services" element={<Services />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/posts/setadate" element={<SetDate />} />
        <Route path="/posts/reserveticket" element={<ReserveTicket />} />

        {/* login admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/posts/tour/admin"
          element={
            <RequireAdmin>
              <AdminTour />
            </RequireAdmin>
          }
        />
        <Route
          path="/posts/setdate/admin"
          element={
            <RequireAdmin>
              <SetDateAdmin />
            </RequireAdmin>
          }
        />
        <Route
          path="/posts/reserveTicket/admin"
          element={
            <RequireAdmin>
              <ReserveTicketAdmin />
            </RequireAdmin>
          }
        />
        <Route
          path="/posts/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        {/* admin (protegidas) */}
        <Route
          path="/admin/tours"
          element={
            <RequireAdmin>
              <ToursListAdmin />
            </RequireAdmin>
          }
        />

        {/* 404 mínima */}
        <Route path="*" element={<div className="p-8">Not found</div>} />
      </Route>
    </Routes>
  );
}
