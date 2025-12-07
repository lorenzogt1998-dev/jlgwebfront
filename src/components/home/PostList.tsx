import { Link } from "react-router-dom";
import type { PostCard } from "@/mocks/home";

export function PostList({ posts }: { posts: PostCard[] }) {
  return (
    <div id="archive-wrapper">
      <ul className="grid gap-8 md:grid-cols-2">
        {posts.map((p) => {
          const description =
            p.title === "SET A DATE"
              ? "Schedule a concert date for your school and bring the JLG experience to your students."
              : p.title === "RESERVE TICKET"
                ? "Reserve your seat for the Legado Tour and enjoy an unforgettable educational concert."
                : p.excerpt;

          return (
            <li
              key={p.id}
              className="
                group relative overflow-hidden rounded-3xl
                bg-gradient-to-b from-neutral-900 to-black
                border border-neutral-800 
                shadow-[0_18px_40px_rgba(0,0,0,0.65)]
                transition-transform duration-300
                hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.9)]
              "
            >
              {/* Imagen con efecto zoom */}
              {p.image && (
                <Link to={p.href} className="block relative">
                  <div className="overflow-hidden rounded-t-3xl">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="
                        w-full aspect-[16/9] object-cover
                        transform transition-transform duration-700
                        group-hover:scale-105
                      "
                    />
                  </div>


                </Link>
              )}

              {/* Contenido */}
              <div className="px-6 pt-4 pb-6 text-center border-t border-white/10">
                {/* Línea decorativa */}
                <div className="mx-auto mb-3 h-[2px] w-12 bg-[#ddad0d]" />

                {/* Título rockero */}
                <h2
                  className="text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em]
                             text-[#ddad0d]
                             drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <Link
                    to={p.href}
                    className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase"
                  >
                    {p.title}
                  </Link>
                </h2>

                {/* Descripción específica */}
                <p className="mt-3 text-sm text-slate-200/90 leading-relaxed">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
