import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function ContactConfirm() {
    const nav = useNavigate();
    const loc = useLocation();
    const state = (loc.state || {});
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
        }
        catch (e) {
            alert("Error submitting the form.");
        }
    };
    return (_jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Confirm and submit" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("strong", { children: "Full Name:" }), _jsx("div", { children: state.firstname })] }), _jsxs("div", { children: [_jsx("strong", { children: "E-Mail:" }), _jsx("div", { children: state.email_address })] }), _jsxs("div", { children: [_jsx("strong", { children: "Consulta / Enquiry:" }), _jsx("div", { className: "whitespace-pre-wrap", children: state.enquiry })] })] }), _jsxs("div", { className: "mt-8 flex gap-4", children: [_jsx("button", { className: "px-4 py-2 rounded border", onClick: () => nav(-1), children: "\u2190 Go back" }), _jsx("button", { className: "px-4 py-2 rounded bg-black text-white", onClick: submit, children: "Submit" })] })] }));
}
