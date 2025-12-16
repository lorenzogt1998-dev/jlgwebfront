import React, { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import {
  CalendarDays,
  MapPin,
  Clock,
  Trash2,
  RefreshCcw,
  Info,
  Search,
} from "lucide-react";

interface ShowDate {
  id: number;
  city: string;
  country: string;
  date: string;
  state: string;
  status: string;
  startTime: string; // "10:00:00"
  endTime: string; // "11:00:00"
  schoolName: string;
  tour: {
    id: number;
    name: string;
    year: number;
    status: string;
  };
}

const ShowDatesAdmin: React.FC = () => {
  const [showDates, setShowDates] = useState<ShowDate[]>([]);
  const [filteredDates, setFilteredDates] = useState<ShowDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const token = localStorage.getItem("token");

  const formatTime = (time: string) => {
    if (!time) return "--:--";
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}hs`;
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const dateToNumber = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).getTime(); // fecha local, sin UTC shift
  };

  const fetchShowDates = async () => {
    try {
      const res = await adminFetch("/api/show-dates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const rawData: ShowDate[] = await res.json();

      const normalizedData: ShowDate[] = rawData.map((show) => ({
        ...show,
        city: show.city ?? "",
        schoolName: show.schoolName ?? "",
        country: show.country ?? "",
        startTime: show.startTime ?? "",
        endTime: show.endTime ?? "",
      }));

      /*se ordenan cronologicamente - priorizar los shows que están OPEN, 
            y dentro de cada grupo (OPEN o CLOSED) se ordenan cronológicamente.*/

      const sorted = [...normalizedData].sort((a, b) => {
        if (a.status === "OPEN" && b.status !== "OPEN") return -1;
        if (a.status != "OPEN" && b.status === "OPEN") return 1;

        return dateToNumber(a.date) - dateToNumber(b.date);
      });
      setShowDates(sorted);
      setFilteredDates(sorted);
    } catch (error) {
      console.error("Error fetching show dates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDates();
  }, []);

  // FILTRADO EN EL FRONTEND
  useEffect(() => {
    const term = (searchTerm).toLowerCase();
    const filtered = showDates.filter(
      (show) =>
        show.city.toLowerCase().includes(term) ||
        show.schoolName.toLowerCase().includes(term) ||
        formatDate(show.date).includes(term)
    );
    setFilteredDates(filtered);
  }, [searchTerm, showDates]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this show date?"))
      return;
    try {
      await adminFetch(`/api/show-dates/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setShowDates(showDates.filter((show) => show.id !== id));
    } catch (error) {
      console.error("Error deleting show date:", error);
    }
  };

  const handleEditStatus = async (id: number) => {
    const currentShow = showDates.find((show) => show.id === id);
    if (!currentShow) return;
    const newStatus = currentShow.status === "OPEN" ? "CLOSED" : "OPEN";
    try {
      const res = await adminFetch(`/api/show-dates/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updatedShow: ShowDate = await res.json();
      setShowDates(
        showDates.map((show) => (show.id === id ? updatedShow : show))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#243f4a] text-lg pt-28">
        <p className="animate-pulse">Cargando fechas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28">
      <div className="w-full max-w-7xl">
        {/* HEADER + SEARCH */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center shadow-md">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#243f4a]">
                Fechas de Shows
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Administración general de fechas de shows
              </p>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar por ciudad, fecha o escuela..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <a
            href="http://localhost:5173/posts/setDate/admin"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all"
          >
            Nuevo Show
          </a>
        </div>

        {/* RESUMEN DE TOTAL */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow p-6 mb-10">
          <h3 className="text-sm text-gray-500 font-semibold tracking-wide uppercase">
            Total de Fechas
          </h3>
          <p className="text-4xl font-bold text-[#2fa79a] mt-2">
            {filteredDates.length}
          </p>
        </div>

        {/* GRID DE SHOWS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDates.map((show) => (
            <div
              key={show.id}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              {/* PRIMERA LÍNEA */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#2fa79a]" />
                  <h4 className="font-bold text-lg text-[#243f4a]">
                    {show.city.charAt(0).toUpperCase() + show.city.slice(1)}, {show.country}
                  </h4>
                </div>

                {/* STATUS en la misma línea */}
                <p
                  className={`px-3 py-1 rounded-xl text-xs font-semibold
            ${
              show.status === "OPEN"
                ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                : "bg-[#df6a47]/15 text-[#df6a47]"
            }
        `}
                >
                  {show.status}
                </p>
              </div>

              {/* CONTENIDO CENTRADO */}
              <div className="text-center">
                <div className="flex flex-col mt-4 text-sm text-gray-700 items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#243f4a]/70" />
                    <span className="font-semibold text-[#243f4a]">Fecha:</span>
                    <span>{formatDate(show.date)}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-[#243f4a]/70" />
                    <span className="font-semibold text-[#243f4a]">Time:</span>
                    <span>{formatTime(show.startTime)} - {formatTime(show.endTime)}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  {show.schoolName.charAt(0).toUpperCase() + show.schoolName.slice(1)}
                </p>

                {show.tour.status && (
                  <p
                    className={`mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold
                            ${
                              show.tour.status === "ACTIVE"
                                ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                                : "bg-[#243f4a]/10 text-[#243f4a]"
                            }
                        `}
                  >
                    <Info className="w-3 h-3" />
                    Tour: {show.tour.status}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-3">
                  Tour: {show.tour.name} ({show.tour.year})
                </p>
              </div>

              {/* ACCIONES */}
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => handleEditStatus(show.id)}
                  className="px-4 py-2 rounded-xl bg-[#243f4a]/15 text-[#243f4a] hover:bg-[#243f4a]/25 transition-all flex items-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  {show.status === "OPEN" ? "Cerrar" : "Abrir"}
                </button>

                <button
                  onClick={() => handleDelete(show.id)}
                  className="px-4 py-2 rounded-xl bg-[#df6a47]/15 text-[#df6a47] hover:bg-[#df6a47]/25 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-10">
          Sistema de administración
        </p>
      </div>
    </div>
  );
};

export default ShowDatesAdmin;
