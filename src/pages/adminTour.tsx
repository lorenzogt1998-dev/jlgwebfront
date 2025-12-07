import { adminFetch } from "@/services/api";
import React from "react";

export default function AdminTour() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),                     // nombre del tour
      year: Number(data.get("year")),            // año del tour
      status: data.get("status") || "ACTIVE",    // opcional: ACTIVE / LEGACY
    };

    try {
      const resp = await adminFetch("http://localhost:8080/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error("Error creating tour");
      }

      alert("Tour created successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("There was a problem creating the tour. Please try again.");
    }
  }
  
  return (
    <div className="max-w-xl mx-auto px-4 py-12 pt-28">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">
          Create Tour
        </h1>
        <p className="text-sm text-slate-600">
          Register a new tour so you can later add show dates and reservations.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border"
      >
        {/* Tour basic info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tour Name *
            </label>
            <input
              type="text"
              required
              name="name"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Example: LEGADO 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Year *
            </label>
            <input
              type="number"
              required
              name="year"
              min={2000}
              max={2100}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              defaultValue="ACTIVE"
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="ACTIVE">Active</option>
              <option value="LEGACY">Legacy / Past tour</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Save Tour
          </button>
        </div>
      </form>
    </div>
  );
}
