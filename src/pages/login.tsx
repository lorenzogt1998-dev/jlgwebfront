// src/pages/admin/login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_USER = "jladmin";            // mismo que SecurityConfig
  const ADMIN_PASS = "55555";    // mismo que SecurityConfig

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      navigate("/posts/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md border">

        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md font-semibold hover:bg-sky-700"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
