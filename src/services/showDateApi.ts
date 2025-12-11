// src/services/showDateApi.ts
export async function createShowDate(data: {
  date: string;      // "2025-03-15"
  city: string;
  state: string;
  country: string;
  venueName: string;
  venueType: string;
  timeSlot: string;
  status: string;
}) {
  const res = await fetch("/api/show-dates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creando ShowDate");
  }

  return res.json(); // ShowDate guardado
}
