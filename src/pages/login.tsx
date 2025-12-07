// src/pages/admin/login.tsx
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, User } from "lucide-react"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const ADMIN_USER = "jladmin" // mismo que SecurityConfig
  const ADMIN_PASS = "55555" // mismo que SecurityConfig

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true")
      navigate("/posts/admin/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#243f4a] to-[#2fa79a] rounded-2xl flex items-center justify-center mb-4 shadow-md">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#243f4a] text-center">Acceso Admin</h1>
          <p className="text-gray-500 text-sm mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        {error && (
          <div className="bg-[#df6a47]/10 border border-[#df6a47]/30 text-[#df6a47] px-4 py-3 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#243f4a]">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a] transition-all"
                placeholder="Ingresa tu usuario"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[#243f4a]">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2fa79a]/30 focus:border-[#2fa79a] transition-all"
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#243f4a] to-[#2fa79a] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-8"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">Sistema de administración</p>
        </div>
      </div>
    </div>
  )
}
