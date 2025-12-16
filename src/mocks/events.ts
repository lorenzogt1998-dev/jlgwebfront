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
