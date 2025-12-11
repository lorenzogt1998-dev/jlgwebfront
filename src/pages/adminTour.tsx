import { adminFetch } from "@/services/api";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AdminTour() {
  const [showMessage, setShowMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
    showButton?: boolean;
  } | null>(null);

  // Cierra automáticamente los mensajes de éxito/error
  useEffect(() => {
    if (showMessage && (showMessage.type === "success" || showMessage.type === "error")) {
      const timer = setTimeout(() => setShowMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      year: Number(data.get("year")),
      status: data.get("status") || "ACTIVE",
    };

    try {
      const resp = await adminFetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("Error creating tour");

      setShowMessage({ type: "success", text: "Tour creado correctamente!", showButton: true });
      form.reset();
    } catch (err) {
      console.error(err);
      setShowMessage({ type: "error", text: "Hubo un problema al crear el tour." });
    }
  }

  function handleCancel() {
    setShowMessage({ type: "info", text: "Acción cancelada exitosamente!" });
    setTimeout(() => {
      setShowMessage(null);
      window.location.href = "posts/admin/dashboard";
    }, 2000);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 pt-28">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-2 text-[#243f4a]">
          Create Tour
        </h1>
        <p className="text-sm text-gray-500">
          Register a new tour so you can later add show dates and reservations.
        </p>
      </header>

      {showMessage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative text-center">
            <button
              onClick={() => setShowMessage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-[#243f4a] mb-4">{showMessage.type === "success" ? "¡Éxito!" : showMessage.type === "error" ? "Error" : "Información"}</h2>
            <p className="text-gray-700 text-sm mb-6">{showMessage.text}</p>

            {(showMessage.showButton || showMessage.type === "info") && (
              <div className="flex justify-center gap-4">
                {showMessage.showButton && (
                  <button
                    onClick={() => (window.location.href = "/posts/tour/admin")}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all"
                  >
                    Ir al listado de tours
                  </button>
                )}
                {showMessage.type === "info" && (
                  <button
                    onClick={() => {
                      setShowMessage(null);
                      window.location.href = "/dashboard";
                    }}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    Cerrar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-3xl p-6 md:p-8 space-y-6 border border-gray-100"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#243f4a] mb-1">
              Tour Name *
            </label>
            <input
              type="text"
              required
              name="name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              placeholder="Example: LEGADO 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#243f4a] mb-1">
              Year *
            </label>
            <input
              type="number"
              required
              name="year"
              min={2000}
              max={2100}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              placeholder="2026"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#243f4a] mb-1">
              Status
            </label>
            <select
              name="status"
              defaultValue="ACTIVE"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
            >
              <option value="ACTIVE">Active</option>
              <option value="LEGACY">Legacy / Past tour</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all"
          >
            Guardar Tour
          </button>
        </div>
      </form>
    </div>
  );
}
