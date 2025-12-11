import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarGeneral from "@/components/sidebar/SidebarGeneral";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const CONTACT_ENDPOINT = `${API_BASE_URL}/api/leads/contact`;

export default function Contact() {
  const nav = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [enquiry, setEnquiry] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    enquiry?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validate = () => {
    const e: typeof errors = {};
    if (!firstname || firstname.trim().length < 2)
      e.name = "Invalid name (min 2 chars).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Invalid email address.";
    if (!enquiry || enquiry.trim().length === 0)
      e.enquiry = "Enquiry field is empty.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    setSuccessMsg(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const resp = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstname,
          email,
          enquiry,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(text || `Server error (${resp.status})`);
      }

      setSuccessMsg("Your message has been sent. We'll get back to you soon.");

      setFirstname("");
      setEmail("");
      setEnquiry("");

      // nav("/contact/confirm", { state: { firstname, email_address: email, enquiry } });
    } catch (err) {
      console.error(err);
      setServerError(
        "There was a problem sending your message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center pt-28">
        <div className="w-full max-w-3xl">
          {/* HEADER */}
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#243f4a] mb-4">
              Contact Us
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Fill out this form and we'll get back to you as soon as we can.
            </p>
          </header>

          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                Full Name
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                name="firstname"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                Email Address
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email_address"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#243f4a] mb-1">
                Comments
              </label>
              <textarea
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[140px] focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a]"
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
                name="enquiry"
              />
              {errors.enquiry && (
                <p className="text-red-600 text-sm mt-1">{errors.enquiry}</p>
              )}
            </div>

            {serverError && (
              <p className="text-red-600 text-sm">{serverError}</p>
            )}
            {successMsg && (
              <p className="text-green-600 text-sm">{successMsg}</p>
            )}

            <div className="pt-2">
              <button
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white text-sm font-semibold shadow hover:scale-[1.02] transition-all disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-400 text-center mt-8">
            Sistema de administración
          </p>
        </div>
      </div>

      {/* Sidebar la dejo como la tenías, por si la usás para info extra */}
      <SidebarGeneral />
    </>
  );
}
