import React, { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";

interface ShowDate {
  id: number;
  city: string;
  country: string;
  date: string;
  state: string;
  status: string;
  timeSlot: string;
  venueName: string;
  venueType?: string;
  tour: {
    id: number;
    name: string;
    year: number;
  };
}

const ShowDatesAdmin: React.FC = () => {
  const [showDates, setShowDates] = useState<ShowDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");

  // Obtener todas las fechas
  const fetchShowDates = async () => {
    try {
      const res = await adminFetch("http://localhost:8080/api/show-dates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ShowDate[] = await res.json();
      setShowDates(data);
    } catch (error) {
      console.error("Error fetching show dates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDates();
  }, []);

  // Borrar un show
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this show date?")) return;

    try {
      await adminFetch(`http://localhost:8080/api/show-dates/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualizamos la lista en el frontend
      setShowDates(showDates.filter((show) => show.id !== id));
    } catch (error) {
      console.error("Error deleting show date:", error);
    }
  };

  // Editar status de un show
  const handleEditStatus = async (id: number) => {
    const currentShow = showDates.find((show) => show.id === id);
    if (!currentShow) return;

    const newStatus = currentShow.status === "OPEN" ? "CLOSED" : "OPEN";

    try {
      const res = await adminFetch(`http://localhost:8080/api/show-dates/${id}/status`, {
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
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading show dates...</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-28">
      {/* Total de fechas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 mb-6">
        <h3 className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">
          Show Dates
        </h3>
        <p className="text-4xl font-bold text-blue-600">{showDates.length}</p>
      </div>

      {/* Lista de fechas con acciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showDates.map((show) => (
          <div
            key={show.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-lg text-blue-600">
              {show.city}, {show.country}
            </h4>

            <p className="text-sm text-gray-500">Venue: {show.venueName}</p>
            <p className="text-sm text-gray-500">Type: {show.venueType}</p>

            <p className="text-sm text-gray-500">Date: {show.date}</p>
            <p className="text-sm text-gray-500">Time: {show.timeSlot}</p>
            <p className="text-sm text-gray-500">Status: {show.status}</p>

            <p className="text-xs text-gray-400 mt-1">
              Tour: {show.tour.name} ({show.tour.year})
            </p>

            {/* Botones de acción */}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => handleEditStatus(show.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                {show.status === "OPEN" ? "Close" : "Open"}
              </button>
              <button
                onClick={() => handleDelete(show.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDatesAdmin;