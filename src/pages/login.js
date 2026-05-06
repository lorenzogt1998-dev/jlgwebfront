import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const ADMIN_USER = "jladmin"; // mismo que SecurityConfig
    const ADMIN_PASS = "55555"; // mismo que SecurityConfig
    function handleLogin(e) {
        e.preventDefault();
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            localStorage.setItem("isAdmin", "true");
            navigate("/posts/admin/dashboard");
        }
        else {
            setError("Invalid credentials");
        }
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12", children: _jsxs("div", { className: "w-full max-w-md bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-gray-100", children: [_jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center mb-4 shadow-md", children: _jsx(Lock, { className: "w-8 h-8 text-white" }) }), _jsx("h1", { className: "text-3xl font-bold text-[#243f4a] text-center", children: "Acceso Admin" }), _jsx("p", { className: "text-gray-500 text-sm mt-2", children: "Ingresa tus credenciales para continuar" })] }), error && (_jsx("div", { className: "bg-[#df6a47]/10 border border-[#df6a47]/30 text-[#df6a47] px-4 py-3 rounded-xl text-sm mb-6 text-center", children: error })), _jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-2 text-[#243f4a]", children: "Usuario" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a] transition-all", placeholder: "Ingresa tu usuario" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-2 text-[#243f4a]", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a] transition-all", placeholder: "Ingresa tu contrase\u00F1a" })] })] }), _jsx("button", { type: "submit", className: "w-full bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-8", children: "Iniciar Sesi\u00F3n" })] }), _jsx("div", { className: "mt-8 pt-6 border-t border-gray-100", children: _jsx("p", { className: "text-xs text-gray-400 text-center", children: "Sistema de administraci\u00F3n" }) })] }) }));
}
