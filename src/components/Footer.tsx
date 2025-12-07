// src/components/Footer.tsx
import { NavLink } from "react-router-dom";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <section>
            <h3 className="text-base font-semibold text-slate-900">About</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Breve descripción del programa o links destacados.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-slate-900">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><NavLink className="text-slate-600 hover:text-sky-700" to="/downloads">Downloads</NavLink></li>
              <li><NavLink className="text-slate-600 hover:text-sky-700" to="/media">Media</NavLink></li>
              <li><NavLink className="text-slate-600 hover:text-sky-700" to="/teachers">For Teachers</NavLink></li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-slate-900">Contact</h3>
            <p className="mt-3 text-sm text-slate-600">
              concerts@justolamasgroup.com<br/>USA
            </p>
          </section>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <p className="text-xs text-slate-500">{site.copyright}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {site.menus.footer.map((i) => (
              <li key={i.to}>
                <NavLink className="text-slate-600 hover:text-sky-700" to={i.to}>{i.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
