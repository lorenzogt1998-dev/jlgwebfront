import { useMemo, useState } from "react";
import { events2024, events2025, EventRow } from "@/mocks/events";
import { Link } from "react-router-dom";

function monthName(m: number) {
  return new Date(2000, m - 1, 1).toLocaleString("en-US", { month: "long" });
}

function dateHuman(e: EventRow) {
  return `${monthName(e.month)} ${e.day}, ${e.year}`;
}

function mapLink(e: EventRow) {
  const q = `${e.address}, ${e.city}, ${e.state}`.replace(/\s+/g, "+");
  return `https://maps.google.com/maps?hl=en&q=${q}&t=m&z=12`;
}

function StatusButton({ e }: { e: EventRow }) {
  if (!e.reservation_link) return <p>&nbsp;</p>;
  switch (e.status) {
    case "open":
      return (
        <>
          <a className="button" href={`${e.reservation_link}?event_id=${e.event_id}`}>Reserve Seats</a>
          <p>&nbsp;</p>
        </>
      );
    case "half full":
      return (
        <>
          <a className="button" href={`${e.reservation_link}?event_id=${e.event_id}`}>Reserve Seats</a>
          <p><i>a few tickets left!</i></p>
        </>
      );
    case "sold out":
      return (
        <>
          <a className="button" href={`${e.reservation_link}?event_id=${e.event_id}&referral=waiting_list`}>Waiting List</a>
          <p><i>this concert is sold out</i></p>
        </>
      );
    default:
      return <p>&nbsp;</p>;
  }
}

function Accordion({ title, items }: { title: string; items: EventRow[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => items.slice().sort((a,b) =>
    a.year - b.year || a.month - b.month || a.day - b.day
  ), [items]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h4 className="text-center text-xl font-semibold mb-4">{title}</h4>
      <ul className="divide-y">
        {list.map((e, idx) => {
          const isOpen = open === idx;
          const bg = e.type === "christian" ? "bg-green-50" : "";
          return (
            <li key={e.event_id} className={bg}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50"
              >
                <h5 className="text-sm font-semibold flex justify-between items-center">
                  <span>{monthName(e.month)}, {e.day} - {e.city}, {e.state}</span>
                  <small className="text-amber-700">more info</small>
                </h5>
              </button>

              {isOpen && (
                <div className="px-4 pb-5">
                  <div className="grid md:grid-cols-3 gap-6 pt-2">
                    <div className="md:col-span-2 text-sm leading-6">
                      <strong>Hosting Teacher:</strong> {e.host_firstname} {e.host_lastname}<br />
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:concerts@justolamasgroup.com?subject=Justo Lamas Concert in ${e.city}, ${e.state}`}
                      >
                        concerts@justolamasgroup.com
                      </a><br />
                      <strong>Date:</strong> {dateHuman(e)}<br />
                      <strong>Time:</strong> {e.time} plus 30 minutes for autographs<br />
                      <strong>School:</strong> {e.school}<br />
                      <strong>Address:</strong>{" "}
                      <a href={mapLink(e)} target="_blank" rel="noreferrer">
                        {e.address} {e.city} {e.state}, {e.country}
                      </a>
                      {/* El viejo form a send_mail.php lo omitimos;
                          más adelante lo reemplazás por tu endpoint Java */}
                    </div>

                    <div className="text-center pt-5">
                      <StatusButton e={e} />
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

export default function Tour() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tour Dates</h1>
      </div>

      <div className="mb-6">
        <p>
          The <strong>Justo Lamas Group Concerts</strong> are an educational program with the primary
          objective of promoting the study of the Spanish language thru music.
        </p>
        <p className="mt-2">
          During the 18 years we have been taking the Concerts to Schools all around the USA,
          we have heard hundreds of Teachers say how our program has created in their students
          interest and enthusiasm for the Spanish language.
        </p>
        <p className="mt-2">
          <strong><em>The JLG Concerts program is much more than a concert. It is an inspiring educational activity.</em></strong>
        </p>
      </div>

      <div className="mb-8">
        <a href="/book_a_date.php">
          <img
            src="/images/222.png"
            alt="Set a Date"
          />
        </a>
      </div>

      {/* Secciones como en el PHP original */}
      <Accordion title="Legado Tour 2026-2027" items={events2025} />

      {/* En el futuro, si querés detalle por slug: */}
      <div className="mt-12 text-sm">
        <Link to="/booking" className="underline">Go to booking</Link>
      </div>
    </div>
  );
}
