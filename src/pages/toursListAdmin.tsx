import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { MapPinned, Trash2, Pencil, X } from "lucide-react";

interface Tour {
  id: number;
  name: string;
  year: number;
}

export default function ToursListAdmin() {
  const [tours, setTours] = useState<Tour[]>([]);

  // Modal de edición
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [showMessage, setShowMessage] = useState<{ type: string; text: string } | null>(null);

  // Modal de eliminación
  const [deleteTourId, setDeleteTourId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        const resp = await adminFetch("http://localhost:8080/api/tours");
        if (!resp.ok) throw new Error("Error loading tours");

        const data = await resp.json();
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    }

    fetchTours();
  }, []);

  // --------------------------------------------------
  //  ELIMINAR TOUR (abre modal)
  // --------------------------------------------------
  function handleDelete(id: number) {
    setDeleteTourId(id); // Abrir modal
  }

  // Confirmar eliminación
  async function confirmDeleteTour() {
    if (deleteTourId === null) return;

    try {
      const resp = await adminFetch(`http://localhost:8080/api/tours/${deleteTourId}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("Error deleting tour");

      setTours((prev: Tour[]) => prev.filter((t: Tour) => t.id !== deleteTourId));
      setShowMessage({ type: "success", text: "Tour eliminado correctamente" });
      setTimeout(() => setShowMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting tour:", err);
    } finally {
      setDeleteTourId(null); // Cerrar modal
    }
  }

  function cancelDelete() {
    setDeleteTourId(null);
    setShowMessage({ type: "info", text: "Eliminación cancelada" });
    setTimeout(() => setShowMessage(null), 2500);
  }

  // --------------------------------------------------
  //  GUARDAR EDICIÓN
  // --------------------------------------------------
  async function handleSave() {
    if (!editingTour) return;

    try {
      const resp = await adminFetch(`http://localhost:8080/api/tours/${editingTour.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTour),
      });

      if (!resp.ok) throw new Error("Error updating tour");

      // Actualizar localmente
      setTours((prev: Tour[]) =>
        prev.map((t) => (t.id === editingTour.id ? editingTour : t))
      );

      setShowMessage({ type: "success", text: "Tour actualizado correctamente" });
      setEditingTour(null);

      setTimeout(() => setShowMessage(null), 3000);
    } catch (err) {
      console.error("Error updating tour:", err);
    }
  }

  // --------------------------------------------------
  //  CANCELAR EDICIÓN
  // --------------------------------------------------
  function handleCancel() {
    setEditingTour(null);
    setShowMessage({ type: "info", text: "Edición cancelada" });

    setTimeout(() => setShowMessage(null), 2500);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28">
      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center shadow-md">
            <MapPinned className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#243f4a]">Listado de Tours</h1>
            <p className="text-gray-500 text-sm mt-1">Administración general de tours</p>
          </div>
        </div>

        {/* mensajes */}
        {showMessage && (
          <div
            className={`
            mb-6 px-4 py-3 rounded-xl text-center text-sm shadow 
            ${
              showMessage.type === "success"
                ? "bg-[#2fa79a]/15 text-[#2fa79a]"
                : "bg-[#243f4a]/10 text-[#243f4a]"
            }
          `}
          >
            {showMessage.text}
          </div>
        )}

        {/* TABLA */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">ID</th>
                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Nombre</th>
                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a]">Año</th>
                <th className="py-3 px-4 text-sm font-semibold text-[#243f4a] text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {tours.map((tour, index) => (
                <tr
                  key={tour.id}
                  className={`transition-all ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  } hover:bg-[#2fa79a]/10`}
                >
                  <td className="py-3 px-4 text-sm text-gray-700">{tour.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{tour.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{tour.year}</td>

                  <td className="py-3 px-4 flex gap-2 justify-center">

                    {/* EDITAR */}
                    <button
                      onClick={() => setEditingTour(tour)}
                      className="px-3 py-2 rounded-lg bg-[#243f4a]/15 text-[#243f4a] hover:bg-[#243f4a]/25 transition-all flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="text-sm">Editar</span>
                    </button>

                    {/* ELIMINAR */}
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="px-3 py-2 rounded-lg bg-[#df6a47]/15 text-[#df6a47] hover:bg-[#df6a47]/25 transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">Sistema de administración</p>
      </div>

      {/* MODAL DE EDICIÓN */}
      {editingTour && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-100 relative">
            <button
              onClick={handleCancel}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-[#243f4a] mb-6">Editar Tour</h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-[#243f4a]">ID</label>
                <input
                  type="text"
                  disabled
                  value={editingTour.id}
                  className="w-full mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#243f4a]">Nombre</label>
                <input
                  type="text"
                  value={editingTour.name}
                  onChange={(e) => setEditingTour({ ...editingTour, name: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#243f4a]">Año</label>
                <input
                  type="number"
                  value={editingTour.year}
                  onChange={(e) => setEditingTour({ ...editingTour, year: Number(e.target.value) })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ELIMINACIÓN */}
      {deleteTourId !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative">
            <h2 className="text-xl font-bold text-[#243f4a] mb-4 text-center">
              Confirmar Eliminación
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              ¿Seguro que deseas eliminar este tour? Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteTour}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#df6a47] to-[#f58c6c] text-white font-semibold shadow hover:scale-[1.02] transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
