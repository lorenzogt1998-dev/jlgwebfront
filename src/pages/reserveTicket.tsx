// src/pages/reserveTicket.tsx
import React, { useEffect, useState } from "react";

export default function ReserveTicket() {
  const [showDates, setShowDates] = useState([]);

  // ───────────────────────────────
  // 1) Cargar fechas desde backend
  // ───────────────────────────────
useEffect(() => {
  async function loadDates() {
    try {
      const resp = await fetch("http://localhost:8080/api/show-dates/open");
      if (!resp.ok) throw new Error("Error loading open show dates");

      const data = await resp.json();
      setShowDates(data);
    } catch (err) {
      console.error("Error loading available show dates:", err);
      alert("There was a problem loading available show dates.");
    }
  }
  loadDates();
}, []);


  // ───────────────────────────────
  // 2) Enviar reserva
  // ───────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      showDateId: Number(data.get("showDateId")),  // <--- IMPORTANTÍSIMO
      contactName: data.get("contactName"),
      role: data.get("role"),
      email: data.get("email"),
      phone: data.get("phone"),
      school: data.get("school"),
      schoolAddress: data.get("schoolAddress"),
      students: Number(data.get("students")),
      grades: data.get("grades"),
      notes: data.get("notes"),
    };

    try {
      const resp = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("Error sending form");

      alert("Thanks! Your ticket reservation request was sent.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("There was a problem sending the reservation. Please try again.");
    }
  }

  // ───────────────────────────────
  // 3) Render del formulario
  // ───────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-4">
          Ticket Reservation
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Choose an available concert location to reserve seats for your school.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border"
      >
        {/* Tour Date */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Concert Location</h2>
          <label className="block text-sm font-medium mb-1">
            Select a Date / City *
          </label>

          <select
            required
            name="showDateId"
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select one option…</option>

            {showDates.map((d: any) => (
              <option key={d.id} value={d.id}>
                {new Date(d.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {" — "}
                {d.city}, {d.state}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="contactName"        // ⬅️ fullName
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Cell Phone
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="role"       // ⬅️ roleTitle
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="email"           // ⬅️ email
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Phone
              </label>
              <input
                type="tel"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="phone"           // ⬅️ phone
              />
            </div>
          </div>
        </div>

        {/* School Reservation */}
        <div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                School Name *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="school"      // ⬅️ schoolName
              />
            </div>


            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                School Address *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="schoolAddress"      // ⬅️ School Address
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
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="students" // ⬅️ numberOfStudents
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="grades"     // ⬅️ gradeLevels
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Commets
          </label>
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm min-h-[120px]"
            name="notes"              // ⬅️ notes
            placeholder="Transportation details, accessibility needs, comments…"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Submit Reservation
          </button>
        </div>
      </form>
    </div>
  );
}
