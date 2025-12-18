// src/pages/reserveTicket.tsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL, publicFetch } from "@/services/api";

type ShowDate = {
  id: number;
  date: string;
  address: string;
  city: string;
  state: string;
};

export default function ReserveTicket() {
  const [showDates, setShowDates] = useState<ShowDate[]>([]);

  // ───────────────────────────────
  // 1) Cargar fechas desde backend
  // ───────────────────────────────
  useEffect(() => {
    async function loadDates() {
      try {
        const resp = await publicFetch("/api/show-dates/open");
        if (!resp.ok) throw new Error("Error loading open show dates");

        const data: ShowDate[] = await resp.json();
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
      showDateId: Number(data.get("showDateId")),
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
      const resp = await fetch(`${API_BASE_URL}/api/reservations`, {
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
  // 3) Render del formulario (mismo estilo que SetDate)
  // ───────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#243f4a] mb-4">
            Reserve Tickets for Your Students
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose an available concert date and reserve seats for your school.
            Our team will confirm your reservation and send you all the details
            for the Legado Tour concert in your area.
          </p>
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-6"
        >
          {/* Concert Location */}
          <div>
            <h2 className="text-lg font-semibold text-[#243f4a] mb-3">
              Concert Location
            </h2>
            <label className="block text-sm font-semibold text-[#243f4a] mb-1">
              Select a Date / City *
            </label>

            <select
              required
              name="showDateId"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
            >
              <option value="">Select one option…</option>

              {showDates.map((d) => (
                <option key={d.id} value={d.id}>
                  {new Date(d.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" — "}
                  {d.address}
                  {/*{d.city}, {d.state}*/}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold text-[#243f4a] mb-3">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="contactName"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  placeholder="Spanish teacher, Activities director, etc."
                  name="role"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  School Phone *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="phone"
                />
              </div>
            </div>
          </div>

          {/* School Reservation */}
          <div>
            <h2 className="text-lg font-semibold text-[#243f4a] mb-3">
              School Reservation
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="school"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  School Address *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="schoolAddress"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  Number of Students *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="students"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  Grade Levels / ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="grades"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-[#243f4a] mb-1">
              Comments
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              name="notes"
              placeholder="Transportation details, accessibility needs, comments…"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white text-sm font-semibold shadow hover:scale-[1.02] transition-all"
            >
              Submit Reservation
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center mt-8">
          Sistema de administración
        </p>
      </div>
    </div>
  );
}
