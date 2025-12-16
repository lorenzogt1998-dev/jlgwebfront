"use client"

import { adminFetch } from "@/services/api"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Calendar, Users, Ticket, TrendingUp, AlertCircle, Info, Trash2, Edit3 } from "lucide-react"

type Tour = {
  id: number
  name: string
  year: number
  status?: string
}

type ShowStatus = "OPEN" | "CLOSED" | "CANCELED" | ""

type ShowDate = {
  id: number
  date: string
  city: string
  state: string
  country: string
  schoolName: string
  venueType: string
  timeSlot: string
  status: ShowStatus
}

type TicketReservation = {
  id: number
  organizationName: string
  contactName: string
  contactEmail: string
  seatsRequested: number
  seatsConfirmed: number | null
  createdAt: string
  showDate: ShowDate
}

export default function AdminDashboard() {
  const [tours, setTours] = useState<Tour[]>([])
  const [showDates, setShowDates] = useState<ShowDate[]>([])
  const [reservations, setReservations] = useState<TicketReservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [savingStatusId, setSavingStatusId] = useState<number | null>(null)
  const [deletingReservationId, setDeletingReservationId] = useState<number | null>(null)
  const [savingSeatsId, setSavingSeatsId] = useState<number | null>(null)

  useEffect(() => {
    async function loadAll() {
      try {
        const [toursResp, showsResp, reservResp] = await Promise.all([
          adminFetch("/api/tours"),
          adminFetch("/api/show-dates"),
          adminFetch("/api/reservations"),
        ])

        const [toursJson, showsJson, reservJson] = await Promise.all([
          toursResp.json(),
          showsResp.json(),
          reservResp.json(),
        ])

        setTours(toursJson)
        setShowDates(showsJson)
        setReservations(reservJson)
        setError(null)
      } catch (err) {
        console.error("Error loading dashboard:", err)
        setError("There was an error loading the dashboard: Failed to fetch")
      } finally {
        setLoading(false)
      }
    }

    loadAll()
  }, [])

  const totalTours = tours.length
  const totalShowDates = showDates.length
  const totalReservations = reservations.length
  const totalSeatsRequested = reservations.reduce((sum, r) => sum + (r.seatsRequested || 0), 0)

  const upcomingShows = [...showDates]
    .filter((d) => !!d.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const latestReservations = [...reservations]
    .filter((r) => !!r.createdAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const pendingReservations = reservations.filter((r) => r.seatsConfirmed === null).length

  const openShows = showDates.filter((s) => s.status && s.status.toUpperCase() === "OPEN").length

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: `${pendingReservations} solicitudes de reserva sin asientos confirmados.`,
    },
    {
      id: 2,
      type: "info",
      message: `${openShows} shows actualmente abiertos para reservas.`,
    },
  ]

  if (loading) {
    return (
      <div className="pt-32 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-[#2fa79a] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[#243f4a] font-medium">Cargando dashboard…</p>
          </div>
        </div>
      </div>
    )
  }

  async function handleDeleteShowDate(id: number) {
    const ok = window.confirm("¿Estás seguro de eliminar esta fecha de show? Esta acción no se puede deshacer.")
    if (!ok) return

    try {
      setDeletingId(id)

      const resp = await adminFetch(`/api/show-dates/${id}`, { method: "DELETE" })

      if (!resp.ok) {
        throw new Error("Failed to delete show date")
      }

      setShowDates((prev) => prev.filter((s) => s.id !== id))
      setError(null)
    } catch (err) {
      console.error("Error deleting show date:", err)
      setError("Hubo un error al eliminar la fecha del show.")
    } finally {
      setDeletingId(null)
    }
  }

  async function handleChangeShowStatus(id: number, status: ShowStatus) {
    const prev = showDates

    setShowDates((current) => current.map((s) => (s.id === id ? { ...s, status } : s)))

    try {
      setSavingStatusId(id)

      const resp = await adminFetch(`/api/show-dates/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!resp.ok) {
        throw new Error("Failed to update status")
      }

      setError(null)
    } catch (err) {
      console.error("Error updating show status:", err)
      setError("Hubo un error al actualizar el estado del show.")
      setShowDates(prev)
    } finally {
      setSavingStatusId(null)
    }
  }

  async function handleDeleteReservation(id: number) {
    const ok = window.confirm("¿Eliminar esta reserva? Esta acción no se puede deshacer.")
    if (!ok) return

    try {
      setDeletingReservationId(id)

      const resp = await adminFetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })

      if (!resp.ok) {
        throw new Error("Failed to delete reservation")
      }

      setReservations((prev) => prev.filter((r) => r.id !== id))
      setError(null)
    } catch (err) {
      console.error("Error deleting reservation:", err)
      setError("Hubo un error al eliminar la reserva.")
    } finally {
      setDeletingReservationId(null)
    }
  }

  async function handleUpdateSeats(id: number) {
    const seatsRequestedStr = window.prompt("Nuevos asientos solicitados (dejar en blanco para mantener):")
    const seatsConfirmedStr = window.prompt("Nuevos asientos confirmados (dejar en blanco para mantener):")

    if (!seatsRequestedStr && !seatsConfirmedStr) return

    const seatsRequested = seatsRequestedStr ? Number(seatsRequestedStr) : undefined
    const seatsConfirmed = seatsConfirmedStr ? Number(seatsConfirmedStr) : undefined

    try {
      setSavingSeatsId(id)

      const resp = await adminFetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatsRequested,
          seatsConfirmed,
        }),
      })

      if (!resp.ok) {
        throw new Error("Failed to update seats")
      }

      const updated = await resp.json()

      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)))

      setError(null)
    } catch (err) {
      console.error("Error updating seats:", err)
      setError("Hubo un error al actualizar los asientos.")
    } finally {
      setSavingSeatsId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8fafa] to-[#f0f5f5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        {error && (
          <div className="bg-gradient-to-r from-[#df6a47]/10 to-[#f2a566]/10 border-2 border-[#df6a47]/30 text-[#243f4a] px-6 py-4 rounded-2xl text-sm shadow-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#df6a47]" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <header className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#243f4a] tracking-tight leading-tight">
                Panel de Administración
              </h1>
              <p className="text-[#243f4a]/60 text-lg font-medium max-w-2xl leading-relaxed">
                Gestion de tours, fechas de shows y reservas de tickets.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/posts/tour/admin"
                className="group px-5 py-3 rounded-2xl bg-gradient-to-br from-[#2fa79a] to-[#2fa79a]/80 text-white font-semibold text-sm shadow-lg shadow-[#2fa79a]/20 hover:shadow-xl hover:shadow-[#2fa79a]/30 transition-all duration-300 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Nuevo Tour
              </Link>
              <Link
                to="/posts/setDate/admin"
                className="px-5 py-3 rounded-2xl bg-white border-2 border-[#e8c76f] text-[#243f4a] font-semibold text-sm shadow-sm hover:shadow-md hover:bg-[#e8c76f]/10 transition-all duration-300 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Nueva Fecha
              </Link>
              <Link
                to="/posts/reserveTicket/admin"
                className="px-5 py-3 rounded-2xl bg-white border-2 border-[#f2a566] text-[#243f4a] font-semibold text-sm shadow-sm hover:shadow-md hover:bg-[#f2a566]/10 transition-all duration-300 flex items-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                Nueva Reserva
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Tours */}
          <NavLink to="/admin/tours" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-[#243f4a]/5 border-2 border-transparent hover:border-[#243f4a]/10 hover:shadow-2xl hover:shadow-[#243f4a]/10 transition-all duration-300 cursor-pointer space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#243f4a] to-[#243f4a]/80 flex items-center justify-center shadow-lg shadow-[#243f4a]/20">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <span className="text-[#243f4a]/40 text-xs font-bold uppercase tracking-wider">Tours</span>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-[#243f4a] tracking-tight">{totalTours}</p>
                <p className="text-[#243f4a]/60 text-sm font-medium">Tours activos y anteriores</p>
              </div>
            </div>
          </NavLink>

          {/* Card Show Dates */}
          <NavLink to="/admin/showdates" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-[#2fa79a]/5 border-2 border-transparent hover:border-[#2fa79a]/20 hover:shadow-2xl hover:shadow-[#2fa79a]/10 transition-all duration-300 cursor-pointer space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2fa79a]/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="flex items-center justify-between relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2fa79a] to-[#2fa79a]/80 flex items-center justify-center shadow-lg shadow-[#2fa79a]/20">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <span className="text-[#2fa79a]/60 text-xs font-bold uppercase tracking-wider">Fechas</span>
              </div>
              <div className="space-y-2 relative">
                <p className="text-5xl font-bold text-[#2fa79a] tracking-tight">{totalShowDates}</p>
                <p className="text-[#243f4a]/60 text-sm font-medium">Fechas de shows creadas</p>
              </div>
            </div>
          </NavLink>

          {/* Card Reservations */}
          <NavLink to="/admin/reservations" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-[#f2a566]/5 border-2 border-transparent hover:border-[#f2a566]/20 hover:shadow-2xl hover:shadow-[#f2a566]/10 transition-all duration-300 cursor-pointer space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f2a566] to-[#df6a47] flex items-center justify-center shadow-lg shadow-[#f2a566]/20">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <span className="text-[#f2a566]/80 text-xs font-bold uppercase tracking-wider">Reservas</span>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-[#f2a566] tracking-tight">{totalReservations}</p>
                <p className="text-[#243f4a]/60 text-sm font-medium">{totalSeatsRequested} asientos solicitados</p>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Tablas */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl shadow-[#243f4a]/5 border border-[#243f4a]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#243f4a] to-[#2fa79a] px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  Próximos Shows
                </h2>
              </div>

              <div className="p-8">
                {upcomingShows.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Calendar className="w-12 h-12 text-[#243f4a]/20 mx-auto" />
                    <p className="text-[#243f4a]/60 font-medium">No hay fechas de shows creadas aún.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-[#243f4a]/10">
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Ciudad
                          </th>
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Lugar
                          </th>
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="pb-4 text-right text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#243f4a]/5">
                        {upcomingShows.map((s) => (
                          <tr key={s.id} className="group hover:bg-[#2fa79a]/5 transition-colors">
                            <td className="py-4 text-sm font-medium text-[#243f4a]">
                              {s.date
                                ? new Date(s.date).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "-"}
                            </td>
                            <td className="py-4 text-sm font-medium text-[#243f4a]">
                              {s.city}, {s.state}
                            </td>
                            <td className="py-4 text-sm text-[#243f4a]/70">{s.schoolName}</td>
                            <td className="py-4">
                              <select
                                value={s.status ?? ""}
                                onChange={(e) => handleChangeShowStatus(s.id, e.target.value as ShowStatus)}
                                disabled={savingStatusId === s.id}
                                className={`text-xs font-bold rounded-xl border-2 px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
                                                                    ${
                                                                      (s.status || "").toUpperCase() === "OPEN"
                                                                        ? "border-[#2fa79a]/30 bg-[#2fa79a]/10 text-[#2fa79a] focus:ring-[#2fa79a]/30"
                                                                        : (s.status || "").toUpperCase() === "CANCELED"
                                                                          ? "border-[#df6a47]/30 bg-[#df6a47]/10 text-[#df6a47] focus:ring-[#df6a47]/30"
                                                                          : "border-[#e8c76f]/30 bg-[#e8c76f]/10 text-[#243f4a] focus:ring-[#e8c76f]/30"
                                                                    }
                                                                `}
                              >
                                <option value="">— Seleccionar —</option>
                                <option value="OPEN">ABIERTO</option>
                                <option value="CLOSED">CERRADO</option>
                                <option value="CANCELED">CANCELADO</option>
                              </select>
                            </td>
                            <td className="py-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteShowDate(s.id)}
                                disabled={deletingId === s.id}
                                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#df6a47]/30 bg-[#df6a47]/10 px-4 py-2 text-xs font-bold text-[#df6a47] hover:bg-[#df6a47] hover:text-white hover:border-[#df6a47] disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                {deletingId === s.id ? "Eliminando…" : "Eliminar"}
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

            <div className="bg-white rounded-3xl shadow-xl shadow-[#243f4a]/5 border border-[#243f4a]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#f2a566] to-[#df6a47] px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Ticket className="w-6 h-6" />
                  Últimas Reservas
                </h2>
              </div>

              <div className="p-8">
                {latestReservations.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Ticket className="w-12 h-12 text-[#243f4a]/20 mx-auto" />
                    <p className="text-[#243f4a]/60 font-medium">No hay reservas aún.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-[#243f4a]/10">
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Organización
                          </th>
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Show
                          </th>
                          <th className="pb-4 text-left text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Asientos
                          </th>
                          <th className="pb-4 text-right text-xs font-bold text-[#243f4a]/60 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#243f4a]/5">
                        {latestReservations.map((r) => (
                          <tr key={r.id} className="group hover:bg-[#f2a566]/5 transition-colors">
                            <td className="py-4 text-sm font-medium text-[#243f4a]">
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "-"}
                            </td>
                            <td className="py-4 text-sm font-medium text-[#243f4a]">
                              {r.organizationName || "(sin nombre)"}
                            </td>
                            <td className="py-4 text-sm text-[#243f4a]/70">
                              {r.showDate ? `${r.showDate.city}, ${r.showDate.state}` : "—"}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2fa79a]/10 text-[#2fa79a] font-bold text-sm">
                                  {r.seatsRequested}
                                </span>
                                {r.seatsConfirmed !== null && (
                                  <span className="text-xs text-[#243f4a]/60 font-medium">
                                    (confirmados: {r.seatsConfirmed})
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => handleUpdateSeats(r.id)}
                                disabled={savingSeatsId === r.id}
                                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2fa79a]/30 bg-[#2fa79a]/10 px-4 py-2 text-xs font-bold text-[#2fa79a] hover:bg-[#2fa79a] hover:text-white hover:border-[#2fa79a] disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                {savingSeatsId === r.id ? "Guardando…" : "Editar"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteReservation(r.id)}
                                disabled={deletingReservationId === r.id}
                                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#df6a47]/30 bg-[#df6a47]/10 px-4 py-2 text-xs font-bold text-[#df6a47] hover:bg-[#df6a47] hover:text-white hover:border-[#df6a47] disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                {deletingReservationId === r.id ? "Eliminando…" : "Eliminar"}
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
          </div>

          <div className="space-y-6">
            {/* Alertas */}
            <div className="bg-white rounded-3xl shadow-xl shadow-[#243f4a]/5 border border-[#243f4a]/5 p-8 space-y-6">
              <h2 className="text-lg font-bold text-[#243f4a] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#e8c76f]" />
                Alertas
              </h2>
              <div className="space-y-4">
                {alerts.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${
                      a.type === "warning"
                        ? "bg-gradient-to-br from-[#e8c76f]/10 to-[#f2a566]/10 border-[#e8c76f]/30"
                        : "bg-gradient-to-br from-[#2fa79a]/10 to-[#2fa79a]/5 border-[#2fa79a]/30"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        a.type === "warning" ? "bg-[#e8c76f]/20" : "bg-[#2fa79a]/20"
                      }`}
                    >
                      {a.type === "warning" ? (
                        <AlertCircle className="w-5 h-5 text-[#e8c76f]" />
                      ) : (
                        <Info className="w-5 h-5 text-[#2fa79a]" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-[#243f4a] leading-relaxed flex-1">{a.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-3xl shadow-xl shadow-[#243f4a]/20 p-8 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5" />
                Resumen General
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/90 font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#e8c76f] mt-2 flex-shrink-0" />
                  <span>{totalTours} tours registrados en el sistema.</span>
                </li>
                <li className="flex items-start gap-3 text-white/90 font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#e8c76f] mt-2 flex-shrink-0" />
                  <span>{totalShowDates} fechas de shows creadas.</span>
                </li>
                <li className="flex items-start gap-3 text-white/90 font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#e8c76f] mt-2 flex-shrink-0" />
                  <span>{totalReservations} solicitudes de reserva recibidas.</span>
                </li>
                <li className="flex items-start gap-3 text-white/90 font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#e8c76f] mt-2 flex-shrink-0" />
                  <span>{totalSeatsRequested} asientos solicitados en total.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
