// src/pages/setDate.tsx
import React from "react";

export default function SetDate() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const data = new FormData(form);

    const payload = {
      contactName: data.get("contactName"),
      role: data.get("role"),
      email: data.get("email"),
      cellphone: data.get("cellphone"),
      schoolphone: data.get("schoolphone"),
      school: data.get("school"),
      address: data.get("address"),
      capacity: data.get("capacity")
        ? Number(data.get("capacity"))
        : null,
      preferredDate: data.get("preferredDate"),
      notes: data.get("notes"),
    };

    try {
      const resp = await fetch("http://localhost:8080/api/leads/set-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error("Error sending form");
      }

      alert("Thanks! Your Set a Date request was sent.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("There was a problem sending the form. Please try again.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-4">
          Set a Date for Your School
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Bring the Justo Lamas Group Concert to your school for an unforgettable musical and cultural experience. Complete this form and our team will contact you to coordinate dates, details and availability..
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border"
      >
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
                name="contactName"          // ⬅️ SetDateLeadRequest.fullName
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Role / Title
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Spanish teacher, Activities director, etc."
                name="role"         // ⬅️ roleTitle
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
                name="email"             // ⬅️ email
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Cell Phone *
              </label>
              <input
                type="tel"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="cellphone"             // ⬅️ phone
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Phone *
              </label>
              <input
                type="tel"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="schoolphone"             // ⬅️ phone
              />
            </div>
          </div>
        </div>

        {/* School Information */}
        <div>
          <h2 className="text-lg font-semibold mb-3">School Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                School Name *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="school"        // ⬅️ schoolName
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Address *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="address"        // ⬅️ Address
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Capacity (seats)
              </label>
              <input
                type="number"
                min={0}
                className="w-full border rounded-md px-3 py-2 text-sm"
                name="capacity" // ⬅️ estimatedCapacity
              />
            </div>
          </div>
        </div>

        {/* Preferred Date & Time */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Date</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Preferred Month
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Example: April or Spring 2026 - 2027"
                name="preferredDate"     // ⬅️ preferredDate
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <label className="block text-sm font-medium mb-1">
            comments
          </label>
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm min-h-[120px]"
            placeholder="Tell us about your group, language levels, special needs, or questions."
            name="notes"             // ⬅️ notes
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
