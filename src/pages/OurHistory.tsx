import { PlayCircle } from "lucide-react";

export default function OurHistory() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl min-h-[320px] md:min-h-[420px]">
          {/* Imagen de fondo */}
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop"
            alt="Justo Lamas Group history"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay azul, tipo Hard Rock */}
          <div className="absolute inset-0 bg-slate-900/55" />

          {/* Contenido alineado a la derecha */}
          <div className="relative flex h-full flex-col md:flex-row">
            {/* lado izquierdo vacío para que el texto quede a la derecha */}
            <div className="hidden flex-1 md:block" />

            <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#ddad0d]"
              style={{ fontFamily: "'Cinzel', serif" }}>
                Our History
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-100">
                Justo Lamas Group comenzó llevando la música en español a las
                aulas de Estados Unidos. Conciertos, giras educativas y recursos
                para profesores han inspirado a miles de estudiantes a amar el
                idioma y la cultura.
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-100">
                Hoy seguimos creciendo, conectando escuelas, artistas y
                comunidades a través de experiencias que combinan música,
                idioma y valores.
              </p>

              <div className="justify-center flex flex-wrap gap-4">
                <a
                  href="about"
                  className="mt-6 inline-block bg-[#8d8553] hover:bg-[#68602e] px-6 py-3 text-sm font-semibold tracking-wide rounded"
              >
               Discover our History
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
