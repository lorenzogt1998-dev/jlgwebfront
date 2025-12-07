// src/pages/setDateAdmin.tsx
import React, { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";

type Tour = {
  id: number;
  name: string;
  year: number;
};

export default function SetDateAdmin() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | "">("");

  useEffect(() => {
    async function loadTours() {
      try {
        setLoadingTours(true);

        // ACÁ EL CAMBIO IMPORTANTE
        const resp = await adminFetch("http://localhost:8080/api/tours");
        if (!resp.ok) throw new Error("Error loading tours");

        const data = await resp.json();
        setTours(data);
      } catch (err) {
        console.error(err);
        alert("Error loading tours from backend");
      } finally {
        setLoadingTours(false);
      }
    }
    loadTours();
  }, []);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTourId) {
      alert("Please select a tour first.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      date: data.get("date"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      venueName: data.get("venueName"),
      venueType: data.get("venueType"),
      timeSlot: data.get("timeSlot"),
      status: data.get("status"),
    };

    try {
      const resp = await adminFetch(
        `http://localhost:8080/api/show-dates/${selectedTourId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!resp.ok) throw new Error("Error creating show date");

      const saved = await resp.json();
      alert(`ShowDate created! ID: ${saved.id}`);
      form.reset();
      setSelectedTourId("");
    } catch (err) {
      console.error(err);
      alert("There was a problem creating the show date.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-2">
          Admin · Create Show Date
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Use this screen to create an official Show Date in the database
          after reviewing the <strong>Set a Date</strong> email.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border"
      >
        {/* TOUR */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Tour</h2>
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
            className="w-full border rounded-md px-3 py-2 text-sm"
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
          <h2 className="text-lg font-semibold mb-3">Show Date Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date (yyyy-mm-dd) *
              </label>
              <input
                type="date"
                required
                name="date"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Time Slot
              </label>
              <input
                type="text"
                name="timeSlot"
                placeholder="10:00 AM, Evening, etc."
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                City *
              </label>
              <input
                type="text"
                required
                name="city"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                State *
              </label>
              <input
                type="text"
                required
                name="state"
                className="w-full border rounded-md px-3 py-2 text-sm"
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
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Venue Name *
              </label>
              <input
                type="text"
                required
                name="venueName"
                placeholder="High School, Theater, etc."
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Venue Type
              </label>
              <input
                type="text"
                name="venueType"
                placeholder="SCHOOL, THEATER, OTHER…"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue="OPEN"
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            Create Show Date
          </button>
        </div>
      </form>
    </div>
  );
}
