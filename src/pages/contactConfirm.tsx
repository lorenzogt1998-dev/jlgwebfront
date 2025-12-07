import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type FormState = {
  firstname: string;
  email_address: string;
  enquiry: string;
  captchaToken: string;
};

export default function ContactConfirm() {
  const nav = useNavigate();
  const loc = useLocation();
  const state = (loc.state || {}) as Partial<FormState>;

  // Si entran directo sin state, volver al form
  useEffect(() => {
    if (!state.firstname || !state.email_address || !state.enquiry) {
      nav("/contact", { replace: true });
    }
  }, [state, nav]);

  const submit = async () => {
    try {
      // TODO: reemplazar por tu endpoint real (equivalente a send_mail.php)
      // Ejemplo:
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     firstname: state.firstname,
      //     email_address: state.email_address,
      //     enquiry: state.enquiry,
      //     referral: "contact_page",
      //     subject: "Enquiry from JustoLamasGroup.com",
      //     recipient: "concerts@justolamasgroup.com",
      //     captchaToken: state.captchaToken
      //   }),
      // });
      alert("Submitted! (stub)");
      nav("/thank-you"); // crea esta ruta si querés replicar thank_you.php
    } catch (e) {
      alert("Error submitting the form.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Confirm and submit</h1>

      <div className="space-y-4">
        <div>
          <strong>Full Name:</strong>
          <div>{state.firstname}</div>
        </div>
        <div>
          <strong>E-Mail:</strong>
          <div>{state.email_address}</div>
        </div>
        <div>
          <strong>Consulta / Enquiry:</strong>
          <div className="whitespace-pre-wrap">{state.enquiry}</div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="px-4 py-2 rounded border" onClick={() => nav(-1)}>
          ← Go back
        </button>
        <button className="px-4 py-2 rounded bg-black text-white" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}
