import { adminFetch } from "@/services/api";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

type Tour = {
    id: number;
    name: string;
    year: number;
    status?: string;
};

type ShowStatus = "OPEN" | "CLOSED" | "CANCELED" | "";

// si querés ser más estricto:
type ShowDate = {
    id: number;
    date: string;
    city: string;
    state: string;
    country: string;
    venueName: string;
    venueType: string;
    timeSlot: string;
    status: ShowStatus;
};

type TicketReservation = {
    id: number;
    organizationName: string;
    contactName: string;
    contactEmail: string;
    seatsRequested: number;
    seatsConfirmed: number | null;
    createdAt: string;
    showDate: ShowDate;
};

export default function AdminDashboard() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [showDates, setShowDates] = useState<ShowDate[]>([]);
    const [reservations, setReservations] = useState<TicketReservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [savingStatusId, setSavingStatusId] = useState<number | null>(null);
    const [deletingReservationId, setDeletingReservationId] = useState<number | null>(null);
    const [savingSeatsId, setSavingSeatsId] = useState<number | null>(null);
    // ───────────────────────────────
    // 1) Cargar datos del backend (ADMIN)
    // ───────────────────────────────
    useEffect(() => {
        async function loadAll() {
            try {
                const [toursResp, showsResp, reservResp] = await Promise.all([
                    adminFetch("http://localhost:8080/api/tours"),
                    adminFetch("http://localhost:8080/api/show-dates"),
                    adminFetch("http://localhost:8080/api/reservations"),
                ]);

                const [toursJson, showsJson, reservJson] = await Promise.all([
                    toursResp.json(),
                    showsResp.json(),
                    reservResp.json(),
                ]);

                setTours(toursJson);
                setShowDates(showsJson);
                setReservations(reservJson);
                setError(null);
            } catch (err) {
                console.error("Error loading dashboard:", err);
                setError("There was an error loading the dashboard: Failed to fetch");
            } finally {
                setLoading(false);
            }
        }

        loadAll();
    }, []);

    // 2) Métricas básicas
    const totalTours = tours.length;
    const totalShowDates = showDates.length;
    const totalReservations = reservations.length;
    const totalSeatsRequested = reservations.reduce(
        (sum, r) => sum + (r.seatsRequested || 0),
        0
    );

    // Próximos shows (ordenados por fecha)
    const upcomingShows = [...showDates]
        .filter((d) => !!d.date)
        .sort(
            (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .slice(0, 5);

    // Últimas reservas
    const latestReservations = [...reservations]
        .filter((r) => !!r.createdAt)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

    // “Alertas” simples en base a datos
    const pendingReservations = reservations.filter(
        (r) => r.seatsConfirmed === null
    ).length;

    const openShows = showDates.filter(
        (s) => s.status && s.status.toUpperCase() === "OPEN"
    ).length;

    const alerts = [
        {
            id: 1,
            type: "warning",
            message: `${pendingReservations} reservation requests without confirmed seats.`,
        },
        {
            id: 2,
            type: "info",
            message: `${openShows} shows currently open for reservations.`,
        },
    ];

    // 3) UI estilo “FitForge”
    if (loading) {
        return (
            <div className="pt-28 max-w-5xl mx-auto px-4">
                <p className="text-center text-slate-600">Loading dashboard…</p>
            </div>
        );
    }

    // 3) eliminar showdate
    async function handleDeleteShowDate(id: number) {
        const ok = window.confirm(
            "Are you sure you want to delete this show date? This action cannot be undone."
        );
        if (!ok) return;

        try {
            setDeletingId(id);

            const resp = await adminFetch(
                `http://localhost:8080/api/show-dates/${id}`,
                { method: "DELETE" }       // ⬅️ importante
            );

            if (!resp.ok) {
                throw new Error("Failed to delete show date");
            }

            // Actualizar estado local: sacamos el show eliminado
            setShowDates((prev) => prev.filter((s) => s.id !== id));
            setError(null);
        } catch (err) {
            console.error("Error deleting show date:", err);
            setError("There was an error deleting the show date.");
        } finally {
            setDeletingId(null);
        }
    }

    // 3) actualizar estado de show
    async function handleChangeShowStatus(id: number, status: ShowStatus) {
        // guardamos el valor anterior por si hay que hacer rollback
        const prev = showDates;

        // update optimista en UI
        setShowDates((current) =>
            current.map((s) =>
                s.id === id ? { ...s, status } : s
            )
        );

        try {
            setSavingStatusId(id);

            const resp = await adminFetch(
                `http://localhost:8080/api/show-dates/${id}/status`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                }
            );

            if (!resp.ok) {
                throw new Error("Failed to update status");
            }

            setError(null);
        } catch (err) {
            console.error("Error updating show status:", err);
            setError("There was an error updating the show status.");
            // rollback
            setShowDates(prev);
        } finally {
            setSavingStatusId(null);
        }
    }

    async function handleDeleteReservation(id: number) {
        const ok = window.confirm("Delete this reservation? This cannot be undone.");
        if (!ok) return;

        try {
            setDeletingReservationId(id);

            const resp = await adminFetch(`http://localhost:8080/api/reservations/${id}`, {
                method: "DELETE",
            });

            if (!resp.ok) {
                throw new Error("Failed to delete reservation");
            }

            // Actualizamos el estado global de reservas
            setReservations((prev) => prev.filter((r) => r.id !== id));
            setError(null);
        } catch (err) {
            console.error("Error deleting reservation:", err);
            setError("There was an error deleting the reservation.");
        } finally {
            setDeletingReservationId(null);
        }
    }

    async function handleUpdateSeats(id: number) {
        // Pedimos nuevos valores con prompt (simple para admin)
        const seatsRequestedStr = window.prompt("New seats requested (leave blank to keep):");
        const seatsConfirmedStr = window.prompt("New seats confirmed (leave blank to keep):");

        // Si ambos están vacíos, no hacemos nada
        if (!seatsRequestedStr && !seatsConfirmedStr) return;

        const seatsRequested = seatsRequestedStr ? Number(seatsRequestedStr) : undefined;
        const seatsConfirmed = seatsConfirmedStr ? Number(seatsConfirmedStr) : undefined;

        try {
            setSavingSeatsId(id);

            const resp = await adminFetch(`http://localhost:8080/api/reservations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    seatsRequested,
                    seatsConfirmed,
                }),
            });

            if (!resp.ok) {
                throw new Error("Failed to update seats");
            }

            const updated = await resp.json();

            // Actualizamos el estado global de reservas
            setReservations((prev) =>
                prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
            );

            setError(null);
        } catch (err) {
            console.error("Error updating seats:", err);
            setError("There was an error updating the seats.");
        } finally {
            setSavingSeatsId(null);
        }
    }

    return (
        <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 space-y-6">
            {/* Error arriba si algo falló */}
            {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
                    {error}
                </div>
            )}

            {/* Título */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-600 text-sm mt-1">
                        Overview of tours, show dates and ticket reservations.
                    </p>
                </div>

                {/* Links rápidos */}
                <div className="flex flex-wrap gap-2 text-sm">
                    <Link
                        to="/posts/tour/admin"          // ⬅️ NUEVA VISTA PARA CREAR TOUR
                        className="px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    >
                        + New Tour
                    </Link>
                    <Link
                        to="/posts/setDate/admin"       // ⬅️ Set a Date admin
                        className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                        + New Show Date
                    </Link>
                    <Link
                        to="/posts/reserveTicket/admin" // ⬅️ Reserve Ticket admin
                        className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                        + New Reservation
                    </Link>
                </div>

            </header>

            {/* Cards principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tours */}
                <NavLink to="/admin/tours">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">
                        Tours
                    </h3>
                    <p className="text-4xl font-bold text-indigo-600">
                        {totalTours}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                        Active + legacy tours
                    </p>
                </div>
                </NavLink>

                {/* Fechas de show */}
                <NavLink to="/admin/showdates">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">
                        Show Dates
                    </h3>
                    <p className="text-4xl font-bold text-blue-600">
                        {totalShowDates}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                        Created on all tours
                    </p>
                </div>
                </NavLink>

                {/* Reservas */}
                <NavLink to="/admin/reservations">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">
                            Ticket Reservations
                        </h3>
                        <p className="text-4xl font-bold text-emerald-600">
                            {totalReservations}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            {totalSeatsRequested} seats requested
                        </p>
                    </div>
                </NavLink>
            </div>

            {/* Zona principal: tabla + alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna izquierda (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Próximos shows */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">
                            Upcoming Shows
                        </h2>
                        {upcomingShows.length === 0 ? (
                            <p className="text-sm text-slate-500">
                                No show dates created yet.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="text-left text-slate-500 border-b border-slate-200">
                                        <tr>
                                            <th className="pb-2 font-semibold">Date</th>
                                            <th className="pb-2 font-semibold">City</th>
                                            <th className="pb-2 font-semibold">Venue</th>
                                            <th className="pb-2 font-semibold">Status</th>
                                            <th className="pb-2 font-semibold text-right">Actions</th> {/* ⬅️ NUEVO */}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {upcomingShows.map((s) => (
                                            <tr key={s.id} className="text-slate-700">
                                                <td className="py-2">
                                                    {s.date
                                                        ? new Date(s.date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })
                                                        : "-"}
                                                </td>
                                                <td className="py-2">
                                                    {s.city}, {s.state}
                                                </td>
                                                <td className="py-2">{s.venueName}</td>

                                                {/* 🔥 select de status */}
                                                <td className="py-2">
                                                    <select
                                                        value={s.status ?? ""}
                                                        onChange={(e) =>
                                                            handleChangeShowStatus(
                                                                s.id,
                                                                e.target.value as ShowStatus
                                                            )
                                                        }
                                                        disabled={savingStatusId === s.id}
                                                        className={`text-xs rounded-md border px-2 py-1
                                                            ${(s.status || "").toUpperCase() === "OPEN"
                                                                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                                                : (s.status || "").toUpperCase() === "CANCELED"
                                                                    ? "border-red-300 bg-red-50 text-red-700"
                                                                    : "border-slate-300 bg-slate-50 text-slate-700"
                                                            }
                                                            `}
                                                    >
                                                        <option value="">— Select —</option>
                                                        <option value="OPEN">OPEN</option>
                                                        <option value="CLOSED">CLOSED</option>
                                                        <option value="CANCELED">CANCELED</option>
                                                    </select>
                                                </td>

                                                {/* BOTÓN DELETE */}
                                                <td className="py-2 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteShowDate(s.id)}
                                                        disabled={deletingId === s.id}
                                                        className="inline-flex items-center rounded-md border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        {deletingId === s.id ? "Deleting…" : "Delete"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}
                    </div>

                    {/* Últimas reservas */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">
                            Latest Reservations
                        </h2>

                        {latestReservations.length === 0 ? (
                            <p className="text-sm text-slate-500">No reservations yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead className="text-left text-slate-500 border-b border-slate-200">
                                        <tr>
                                            <th className="pb-2 font-semibold">Date</th>
                                            <th className="pb-2 font-semibold">School / Org</th>
                                            <th className="pb-2 font-semibold">Show</th>
                                            <th className="pb-2 font-semibold">Seats</th>
                                            <th className="pb-2 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {latestReservations.map((r) => (
                                            <tr key={r.id} className="text-slate-700">
                                                {/* Date */}
                                                <td className="py-2">
                                                    {r.createdAt
                                                        ? new Date(r.createdAt).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })
                                                        : "-"}
                                                </td>

                                                {/* Org */}
                                                <td className="py-2">
                                                    {r.organizationName || "(no name)"}
                                                </td>

                                                {/* Show */}
                                                <td className="py-2">
                                                    {r.showDate
                                                        ? `${r.showDate.city}, ${r.showDate.state}`
                                                        : "—"}
                                                </td>

                                                {/* Seats */}
                                                <td className="py-2">
                                                    <span className="font-semibold text-slate-800">
                                                        {r.seatsRequested}
                                                    </span>
                                                    {r.seatsConfirmed !== null && (
                                                        <span className="text-xs text-slate-500 ml-1">
                                                            (confirmed {r.seatsConfirmed})
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-2 text-right space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateSeats(r.id)}
                                                        disabled={savingSeatsId === r.id}
                                                        className="inline-flex items-center rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                                                    >
                                                        {savingSeatsId === r.id ? "Saving…" : "Edit seats"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteReservation(r.id)}
                                                        disabled={deletingReservationId === r.id}
                                                        className="inline-flex items-center rounded-md border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        {deletingReservationId === r.id ? "Deleting…" : "Delete"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>

                {/* Columna derecha (1/3) */}
                <div className="space-y-6">
                    {/* Alertas */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">
                            Alerts
                        </h2>
                        <div className="space-y-3 text-sm">
                            {alerts.map((a) => (
                                <div
                                    key={a.id}
                                    className={`flex items-start gap-2 p-3 rounded-lg ${a.type === "warning"
                                        ? "bg-yellow-50 border border-yellow-200"
                                        : "bg-blue-50 border border-blue-200"
                                        }`}
                                >
                                    <span
                                        className={
                                            a.type === "warning" ? "text-yellow-700" : "text-blue-700"
                                        }
                                    >
                                        {a.type === "warning" ? "⚠️" : "ℹ️"}
                                    </span>
                                    <p className="text-slate-800">{a.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resumen rápido */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">
                            Summary
                        </h2>
                        <ul className="text-sm text-slate-700 space-y-1">
                            <li>
                                • {totalTours} tours registered in the system.
                            </li>
                            <li>
                                • {totalShowDates} show dates created.
                            </li>
                            <li>
                                • {totalReservations} reservation requests received.
                            </li>
                            <li>
                                • {totalSeatsRequested} total seats requested so far.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}