// src/services/api.ts
const ADMIN_USER = "jladmin";
const ADMIN_PASS = "55555"; // la misma que pusiste en SecurityConfig

const adminAuthHeader = "Basic " + btoa(`${ADMIN_USER}:${ADMIN_PASS}`);

export async function adminFetch(input: RequestInfo, init: RequestInit = {}) {
  const headers = {
    ...(init.headers || {}),
    Authorization: adminAuthHeader,
  };

  const resp = await fetch(input, { ...init, headers });
  if (!resp.ok) {
    console.error("Admin fetch error:", resp.status, await resp.text());
    throw new Error("Admin request failed");
  }
  return resp;
}
