// src/pages/Tour.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type ShowStatus = "OPEN" | "CLOSED" | "CANCELED" | "";

type ShowDate = {
  id: number;
  date: string;       // ISO string desde el backend
  city: string;
  state: string;
  country: string;
  venueName: string;
  venueType: string;
  startTime: string;    // viene como "10:00:00"
  endTime: string;      // viene como "11:30:00"
  status: ShowStatus;
  // si después tu backend manda más cosas (tour, etc.) las podés agregar acá
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

// ------- helpers -------

function parseLocalDate(dateStr: string) {
  // dateStr = "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d); // LOCAL, sin UTC shift
}

function monthNameFromDate(d: Date) {
  return d.toLocaleString("en-US", { month: "long" });
}

function formatDateHuman(dateStr: string) {
  const d = parseLocalDate(dateStr); // 🔴 ACÁ está el fix
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${monthNameFromDate(d)} ${d.getDate()}, ${d.getFullYear()}`;
}

function StatusButton({ show }: { show: ShowDate }) {
  const baseBtn =
    "inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition transform hover:-translate-y-0.5";

  if (show.status === "OPEN") {
    // Podés cambiar la ruta cuando tengas tu flujo de reservas definido
    return (
      <div className="space-y-1">
        <Link
          to={`/posts/reserveTicket`}
          className={`${baseBtn} bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 hover:brightness-110`}
        >
          Reserve Seats
        </Link>
        <p className="text-xs text-amber-500 italic">
          tickets available
        </p>
      </div>
    );
  }

  if (show.status === "CANCELED") {
    return (
      <p className="text-xs text-red-400 italic">
        This show was canceled.
      </p>
    );
  }

  if (show.status === "CLOSED") {
    return (
      <p className="text-xs text-slate-400 italic">
        Reservations are closed.
      </p>
    );
  }

  return <p className="text-xs text-slate-400">&nbsp;</p>;
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  return `${h}:${m}`;
}

function Accordion({ title, items }: { title: string; items: ShowDate[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(
  () =>
    items
      .slice()
      .sort(
        (a, b) =>
          parseLocalDate(a.date).getTime() -
          parseLocalDate(b.date).getTime()
      ),
  [items]
);

  if (!list.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h4 className="text-center text-xl font-semibold mb-6 tracking-wide text-slate-900">
        {title}
      </h4>

      <ul className="space-y-4">
        {list.map((show, idx) => {
          const isOpen = open === idx;
          const showDate = new Date(show.date);

          return (
            <li
              key={show.id}
              className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 shadow-2xl border border-slate-700/70 overflow-hidden"
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/70 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-sm font-semibold text-amber-300">
                    {formatDateHuman(show.date)}
                  </span>
                  <span className="text-sm text-slate-200">
                    {show.city}, {show.state}
                  </span>
                  <span className="text-xs text-slate-400">
                    {show.venueName}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatTime(show.startTime)} — {formatTime(show.endTime)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {show.status && (
                    <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-amber-400/60 text-amber-200">
                      {show.status}
                    </span>
                  )}
                  <span className="text-xs text-amber-300">
                    {isOpen ? "hide details" : "more info"}
                  </span>
                </div>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-700/70">
                  <div className="grid md:grid-cols-3 gap-6 pt-3">
                    {/* Info */}
                    <div className="md:col-span-2 text-sm leading-6 space-y-1">
                      <p>
                        <strong className="text-slate-100">Date:</strong>{" "}
                        {formatDateHuman(show.date)}
                      </p>
                      <p>
                        <strong className="text-slate-100">Time:</strong>{" "}
                        {formatTime(show.startTime)} — {formatTime(show.endTime)}

                      </p>
                      <p>
                        <strong className="text-slate-100">Venue:</strong>{" "}
                        {show.venueName} ({show.venueType})
                      </p>
                      <p>
                        <strong className="text-slate-100">City:</strong>{" "}
                        {show.city}, {show.state}, {show.country}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <StatusButton show={show} />
                      <p className="text-[11px] text-slate-400 max-w-[14rem]">
                        Need help? Write us and we’ll assist you with the
                        booking process.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// --------- PAGE ----------

export default function Tour() {
  const [shows, setShows] = useState<ShowDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/show-dates`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: ShowDate[] = await res.json();
        setShows(data);
      } catch (err: any) {
        console.error(err);
        setError("Could not load tour dates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="pt-28 pb-16">
      {/* Cabecera tipo “Our Music” */}
      <div className="max-w-4xl mx-auto px-4 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Tour Dates
        </h1>
        <p className="mt-3 text-slate-600 text-sm md:text-base">
          The{" "}
          <strong className="text-amber-600">
            Justo Lamas Group Concerts
          </strong>{" "}
          are an educational program with the primary objective of promoting
          the study of the Spanish language through music.
        </p>
        <p className="mt-2 text-slate-600 text-sm md:text-base">
          During the last years we have taken concerts to schools all across the
          USA, creating enthusiasm and motivation for Spanish in thousands of
          students.
        </p>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          <strong>
            <em>
              The JLG Concerts program is much more than a concert – it is an
              inspiring educational experience.
            </em>
          </strong>
        </p>
      </div>

      {/* Banner “Set a date now” */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <a href="/book_a_date.php" className="block">
          <img
            src="/images/222.png"
            alt="Set a Date"
            className="w-full rounded-3xl shadow-xl border border-slate-200"
          />
        </a>
      </div>

      {/* Errores / loading */}
      {loading && (
        <p className="text-center text-sm text-slate-500">
          Loading tour dates...
        </p>
      )}
      {error && (
        <p className="text-center text-sm text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* Acordeón con todos los shows */}
      {!loading && !error && (
        <Accordion title="Legado Tour 2026-2027" items={shows} />
      )}

      <div className="max-w-4xl mx-auto px-4 mt-10 text-right text-xs text-slate-500">
        <Link to="/booking" className="underline hover:text-amber-600">
          Go to booking
        </Link>
      </div>
    </div>
  );
}
