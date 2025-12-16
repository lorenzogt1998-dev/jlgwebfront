import React, { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";
import { X } from "lucide-react";

type Tour = {
  id: number;
  name: string;
  year: number;
};

export default function SetDateAdmin() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | "">("");
  const [showMessage, setShowMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadTours() {
      try {
        setLoadingTours(true);
        const resp = await adminFetch("/api/tours");
        if (!resp.ok) throw new Error("Error loading tours");
        const data = await resp.json();
        setTours(data);
      } catch (err) {
        console.error(err);
        setShowMessage({ type: "error", text: "Error loading tours from backend" });
      } finally {
        setLoadingTours(false);
      }
    }
    loadTours();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTourId) {
      setShowMessage({ type: "error", text: "Please select a tour first." });
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      date: data.get("date"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      schoolName: data.get("schoolName"),
      startTime: data.get("startTime"),
      endTime: data.get("endTime"),
      status: data.get("status"),
    };

    try {
      const resp = await adminFetch(`/api/show-dates/${selectedTourId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!resp.ok) throw new Error("Error creating show date");

      const saved = await resp.json();
      setShowMessage({ type: "success", text: `ShowDate created! ID: ${saved.id}` });
      form.reset();
      setSelectedTourId("");
    } catch (err) {
      console.error(err);
      setShowMessage({ type: "error", text: "There was a problem creating the show date." });
    }
  }

  function handleCancel() {
    setShowMessage({ type: "info", text: "Accion cancelada!" });
    setTimeout(() => {
      setShowMessage(null);
      window.location.href = "/posts/admin/dashboard";
    }, 2000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-2 text-[#243f4a]">
          Create Show Date
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Use this screen to create an official Show Date in the database
          after reviewing the <strong>Set a Date</strong> email.
        </p>
      </header>

      {/* Pop-up message */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm border border-gray-100 relative text-center">
            <button
              onClick={() => setShowMessage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-[#243f4a] mb-4">
              {showMessage.type === "success"
                ? "¡Éxito!"
                : showMessage.type === "error"
                ? "Error"
                : "Información"}
            </h2>
            <p className="text-gray-700 text-sm mb-6">{showMessage.text}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-3xl p-6 md:p-8 space-y-6 border border-gray-100"
      >
        {/* TOUR */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-[#243f4a]">Tour</h2>
          <label className="block text-sm font-medium mb-1">
            Select Tour *
          </label>
          <select
            required
            disabled={loadingTours}
            value={selectedTourId}
            onChange={(e) =>
              setSelectedTourId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
          >
            <option value="">Select a tour…</option>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>
                {t.year} — {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* SHOWDATE */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-[#243f4a]">
            Show Date Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* DATE */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date (yyyy-mm-dd) *
              </label>
              <input
                type="date"
                required
                name="date"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              />
            </div>

            {/* START / END TIME */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  required
                  name="startTime"
                  defaultValue="10:00"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time *
                </label>
                <input
                  type="time"
                  required
                  name="endTime"
                  defaultValue="11:30"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                required
                name="city"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State *</label>
              <input
                type="text"
                required
                name="state"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Country *
              </label>
              <input
                type="text"
                required
                defaultValue="USA"
                name="country"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                School Name *
              </label>
              <input
                type="text"
                required
                name="schoolName"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              />
            </div>


            <div>
              <label className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue="OPEN"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
                {/* 👇 con una sola L para que matchee "CANCELED" */}
                <option value="CANCELED">CANCELED</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white font-semibold shadow hover:scale-[1.02] transition-all"
          >
            Create Show Date
          </button>
        </div>
      </form>
    </div>
  );
}
