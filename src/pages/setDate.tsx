import React from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      capacity: data.get("capacity") ? Number(data.get("capacity")) : null,
      preferredDate: data.get("preferredDate"),
      notes: data.get("notes"),
    };

    try {
      const resp = await fetch(`${API_BASE_URL}/api/leads/set-date`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("Error sending form");

      alert("Thanks! Your Set a Date request was sent.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("There was a problem sending the form. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#243f4a] mb-4">
            Set a Date for Your School
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Bring the Justo Lamas Group Concert to your school for an
            unforgettable musical and cultural experience. Complete this form
            and our team will contact you to coordinate dates, details, and
            availability.
          </p>
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-6"
        >
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
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="email"
                />
              </div>
              <div className="md:col-span-2 flex justify-center">
                <div className="w-full max-w-md">
                  <label className="block text-sm font-semibold text-[#243f4a] mb-1 text-center">
                    Cell Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                    name="cellphone"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* School Information */}
          <div>
            <h2 className="text-lg font-semibold text-[#243f4a] mb-3">
              School Information
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
                  Address *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="address"
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
                  name="schoolphone"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                  Estimated Capacity (seats)
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                  name="capacity"
                />
              </div>
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <h2 className="text-lg font-semibold text-[#243f4a] mb-3 text-center">
              Date
            </h2>

            <div className="grid md:grid-cols-2 gap-4 justify-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-semibold text-[#243f4a] mb-1 text-center">
                    Preferred Month
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                    placeholder="Example: April or Spring 2026 - 2027"
                    name="preferredDate"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-[#243f4a] mb-1">
              Comments
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
              placeholder="Tell us about your group, language levels, special needs, or questions."
              name="notes"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white text-sm font-semibold shadow hover:scale-[1.02] transition-all"
            >
              Submit Request
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
