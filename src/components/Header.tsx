// Header.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Instagram, Youtube, Music, LogIn } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-neutral-900 text-white border-b border-slate-800">
      {/* Top bar */}
      <div className="bg-neutral-950 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 h-9 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-4">
            <a
              href="https://open.spotify.com/artist/3DMJaHcIkPnM4J6KtwJow3"
              aria-label="Spotify"
              className="hover:text-sky-400"
            >
              <Music size={16} />
            </a>
            <a href="https://www.youtube.com/@SILVER-oficial-1" aria-label="YouTube" className="hover:text-sky-400"><Youtube size={16} /></a>
            <a href="https://www.instagram.com/silver.oficial_/" aria-label="Instagram" className="hover:text-sky-400"><Instagram size={16} /></a>

          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo + nombre (link al home) */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="/images/logo_textwhite_final_300x58.png"   // 👈 ahora usamos el nuevo icono
              alt="Justo Lamas Group"
              className="h-8 w-auto object-contain"
            />
            <span className="text-white font-semibold text-lg tracking-wide">

            </span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <NavLink to="/about" className="hover:text-sky-400">About Us</NavLink>
            <NavLink to="/services" className="hover:text-sky-400">Services</NavLink>
            <NavLink to="/tour" className="hover:text-sky-400">Tour</NavLink>
            <NavLink to="/media" className="hover:text-sky-400">Music</NavLink>
            <NavLink to="/contact" className="hover:text-sky-400">Contact Us</NavLink>
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href="/admin/login"
              className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:text-sky-600 transition"
            >
              <LogIn size={30} />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md hover:bg-neutral-800"
              aria-label="Toggle Menu"
            >☰</button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-neutral-900 border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-3 flex flex-col gap-3 text-sm">
            <NavLink to="/about" className="hover:text-sky-400">About Us</NavLink>
            <NavLink to="/services" className="hover:text-sky-400">Services</NavLink>
            <NavLink to="/tour" className="hover:text-sky-400">Tour</NavLink>
            <NavLink to="/media" className="hover:text-sky-400">Music</NavLink>
            <NavLink to="/contact" className="hover:text-sky-400">Contact Us</NavLink>
            <a href="/tour" className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 font-semibold hover:bg-sky-600">
              .
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
