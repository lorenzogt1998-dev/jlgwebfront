// src/components/home/VideoFeatured.tsx
export default function VideoFeatured() {
  return (
    <section className="py-12">
    {/* contenedor */}
      <div className="max-w-6xl mx-auto px-4 bg-gradient-to-b from-black via-neutral-900 to-black rounded-2xl py-12 overflow-hidden">
       {/* título */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Last videoclip from Justo Lamas Group
          </h2>
          <p className="mt-2 text-sm md:text-base text-neutral-300">
            "Fue un error" – official music video
          </p>
        </div>

        {/* marco del video */}
        <div className="relative">
          {/* glow suave */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-80" />
          
          <div className="relative bg-black rounded-3xl border border-neutral-700 overflow-hidden shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/l7pD8r3R34Q?rel=0"
                title="Justo Lamas Group - Fue Un Error (videoclip oficial)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
