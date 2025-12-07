import { useEffect, useState } from "react";
import { adminFetch } from "@/services/api";

export default function ToursListAdmin() {
    console.log("ToursListAdmin mounted!");
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function fetchTours() {
      try {
        const resp = await adminFetch("http://localhost:8080/api/tours");
        if (!resp.ok) throw new Error("Error loading tours");

        const data = await resp.json();
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    }

    fetchTours();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tours List</h1>

      <div className="bg-white border rounded-xl shadow p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3 text-sm font-semibold text-slate-600">ID</th>
              <th className="py-2 px-3 text-sm font-semibold text-slate-600">Name</th>
              <th className="py-2 px-3 text-sm font-semibold text-slate-600">Year</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour: any) => (
              <tr key={tour.id} className="border-b hover:bg-slate-50">
                <td className="py-2 px-3">{tour.id}</td>
                <td className="py-2 px-3">{tour.name}</td>
                <td className="py-2 px-3">{tour.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}