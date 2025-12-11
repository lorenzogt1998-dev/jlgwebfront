// src/pages/reserveTicketAdmin.tsx
import React, { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";   // ⬅️ IMPORTANTE

type ShowDate = {
  id: number;
  date: string;
  city: string;
  state: string;
  country: string;
  venueName: string;
};

function formatShowDateLocal(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReserveTicketAdmin() {
  const [showDates, setShowDates] = useState<ShowDate[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);

  useEffect(() => {
    async function loadShowDates() {
      try {
        setLoadingDates(true);

        // ⬇️ AHORA CON adminFetch (lleva Authorization)
        const resp = await adminFetch("/api/show-dates");
        if (!resp.ok) throw new Error("Error loading show dates");

        const data = await resp.json();
        setShowDates(data);
      } catch (err) {
        console.error(err);
        alert("Error loading show dates from backend");
      } finally {
        setLoadingDates(false);
      }
    }
    loadShowDates();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      showDateId: Number(data.get("showDateId")),
      contactName: data.get("contactName"),
      role: data.get("role"),
      email: data.get("email"),
      phone: data.get("phone"),
      school: data.get("school"),
      city: data.get("city"),
      state: data.get("state"),
      students: Number(data.get("students")),
      grades: data.get("grades"),
      notes: data.get("notes"),
    };

    try {
      // ⬇️ TAMBIÉN adminFetch PARA EL POST
      const resp = await adminFetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("Error creating reservation");

      const saved = await resp.json();
      alert(`Reservation created! ID: ${saved.id}`);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("There was a problem creating the reservation.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-2">
          Admin · Ticket Reservation
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Use this screen to create the official reservation for a school
          on an existing Show Date.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border"
      >
        {/* ShowDate selection */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Show Date</h2>
          <label className="block text-sm font-medium mb-1">
            Select Date / City *
          </label>

          <select
            required
            name="showDateId"
            disabled={loadingDates}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select one option…</option>
            {showDates.map((d) => (
              <option key={d.id} value={d.id}>
                {formatShowDateLocal(d.date)} — {d.city}, {d.state} · {d.venueName}
              </option>
            ))}
          </select>
        </div>

        {/* Contact + school info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">School / Contact</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                required
                name="contactName"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Role / Title
              </label>
              <input
                type="text"
                name="role"
                placeholder="Spanish teacher, Activities director, etc."
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                name="email"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone *
              </label>
              <input
                type="tel"
                required
                name="phone"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                School Name *
              </label>
              <input
                type="text"
                required
                name="school"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                required
                name="city"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State *</label>
              <input
                type="text"
                required
                name="state"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Students *
              </label>
              <input
                type="number"
                required
                min={1}
                name="students"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Grades / Notes
              </label>
              <input
                type="text"
                name="grades"
                placeholder="7th–12th, ZIP code, etc."
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Extra notes */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Internal Notes
          </label>
          <textarea
            name="notes"
            className="w-full border rounded-md px-3 py-2 text-sm min-h-[120px]"
            placeholder="Transportation details, accessibility needs, comments…"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Create Reservation
          </button>
        </div>
      </form>
    </div>
  );
}
