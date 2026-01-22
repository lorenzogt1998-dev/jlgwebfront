export default function VideoEmanuel() {
  return (
    <section className="py-12">
      {/* contenedor */}
      <div className="w-full px-4 bg-gradient-to-b from-black via-neutral-900 to-black rounded-2xl py-12 overflow-hidden">
        
        {/* título */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Meet Emanuel
          </h2>
          <p className="mt-2 text-sm md:text-base text-neutral-300">
            Exclusive interview – Justo Lamas Group
          </p>
        </div>

        {/* marco del video */}
        <div className="relative max-w-5xl mx-auto">
          {/* glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-80" />

          <div className="relative bg-black rounded-3xl border border-neutral-700 overflow-hidden shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/yxYa86-feWo?rel=0&modestbranding=1"
                title="Emanuel – Interview | Justo Lamas Group"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
