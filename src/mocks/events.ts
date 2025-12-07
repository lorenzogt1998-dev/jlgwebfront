export type EventRow = {
  event_id: number;
  host_firstname: string;
  host_lastname: string;
  email_address: string;
  phone?: string;
  school: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  country: string;
  year: number;   // 2024 / 2025
  month: number;  // 1..12
  day: number;    // 1..31
  time: string;   // "7:00 PM"
  reservation_link?: string;
  type?: string;  // "christian" | ...
  active: boolean;
  status?: "open" | "half full" | "sold out" | string;
};

export type EventItem = {
  event_id: string;
  year: number;
  month: number; // 1-12
  day: number;
  city: string;
  state: string;
};

// Ejemplos (reemplazá por fetch a tu API Java luego)
export const events2024: EventRow[] = [
  { event_id: 1, host_firstname: "John", host_lastname: "Doe", email_address: "host@example.com",
    school: "Central HS", address: "123 Main St", city: "Miami", state: "FL", country: "USA",
    year: 2024, month: 10, day: 12, time: "7:00 PM", reservation_link: "https://reserva.example.com",
    type: "regular", active: true, status: "open" },
];

export const events2025: EventRow[] = [
  { event_id: 2, host_firstname: "Jane", host_lastname: "Smith", email_address: "host2@example.com",
    school: "West HS", address: "456 Elm St", city: "Dallas", state: "TX", country: "USA",
    year: 2025, month: 3, day: 5, time: "6:30 PM", reservation_link: "https://reserva.example.com",
    type: "christian", active: true, status: "half full" },
];

export const upcomingEvents: EventItem[] = [
  { event_id: "e1", year: 2024, month: 10, day: 12, city: "Miami", state: "FL" },
  { event_id: "e2", year: 2025, month: 3, day: 5, city: "Dallas", state: "TX" },
];