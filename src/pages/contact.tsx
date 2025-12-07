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
    if (!firstname || firstname.trim().length < 2) e.name = "Invalid name (min 2 chars).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email address.";
    if (!enquiry || enquiry.trim().length === 0) e.enquiry = "Enquiry field is empty.";

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

      // opcional: limpiar formulario
      setFirstname("");
      setEmail("");
      setEnquiry("");

      // opcional: ir a pantalla de confirmación
      // nav("/contact/confirm", {
      //   state: { firstname, email_address: email, enquiry },
      // });

    } catch (err) {
      console.error(err);
      setServerError("There was a problem sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Fill out this form and we'll get back to you as soon as we can.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            name="firstname"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email_address"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Comments</label>
          <textarea
            className="mt-1 w-full border rounded px-3 py-2 h-40"
            value={enquiry}
            onChange={(e) => setEnquiry(e.target.value)}
            name="enquiry"
          />
          {errors.enquiry && <p className="text-red-600 text-sm mt-1">{errors.enquiry}</p>}
        </div>

        {serverError && (
          <p className="text-red-600 text-sm">{serverError}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm">{successMsg}</p>
        )}

        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Submit"}
        </button>
      </form>

      <SidebarGeneral />
    </div>
  );
}
