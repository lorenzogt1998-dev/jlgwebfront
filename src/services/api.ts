// src/services/api.ts

// 1) URL base dinámica (local → localhost / prod → Render)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// 2) Credenciales admin (para el dashboard)
const ADMIN_USER = "jladmin";
const ADMIN_PASS = "55555";
const adminAuthHeader = "Basic " + btoa(`${ADMIN_USER}:${ADMIN_PASS}`);

// 3) AdminFetch: agrega auth + headers + arma URLs automáticamente
export async function adminFetch(
  path: string,
  init: RequestInit = {}
) {
  // Si el path NO empieza con http, entonces lo pegamos a la API base.
  const url = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: adminAuthHeader,
    ...(init.headers || {}),
  };

  const resp = await fetch(url, { ...init, headers });

  if (!resp.ok) {
    const errText = await resp.text();
    console.error("Admin fetch error:", resp.status, errText);
    throw new Error(`Admin request failed: ${resp.status}`);
  }

  return resp;
}

// 4) Public fetch para formularios sin auth (Contact, Set Date, etc.)
export async function publicFetch(
  path: string,
  init: RequestInit = {}
) {
  const url = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(init.headers || {}),
  };

  return fetch(url, { ...init, headers });
}
