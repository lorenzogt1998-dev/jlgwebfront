import { useMemo, useState } from "react";

const YOUTUBE_ID = "vurDqNlaggI";

export default function HeroYoutube() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);

  const thumbnailCandidates = useMemo(
    () => [
      `https://i.ytimg.com/vi_webp/${YOUTUBE_ID}/maxresdefault.webp`,
      `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi_webp/${YOUTUBE_ID}/sddefault.webp`,
      `https://i.ytimg.com/vi/${YOUTUBE_ID}/sddefault.jpg`,
      `https://i.ytimg.com/vi_webp/${YOUTUBE_ID}/hqdefault.webp`,
      `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
    ],
    [],
  );

  const thumbnailUrl = thumbnailCandidates[Math.min(thumbIndex, thumbnailCandidates.length - 1)];

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      iv_load_policy: "3",
    });
    return `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?${params.toString()}`;
  }, []);

  return (
    <section className="pt-[20px] w-full px-3 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-80" />

        <div className="relative overflow-hidden rounded-3xl border border-neutral-700 bg-black shadow-2xl">
          <div className="relative aspect-[16/6] sm:aspect-[16/5] w-full">
            {isPlaying ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedUrl}
                title="Justo Lamas Group - Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full text-left"
                aria-label="Reproducir video"
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src={thumbnailUrl}
                  alt="Miniatura del video"
                  loading="eager"
                  decoding="async"
                  onError={() => {
                    setThumbIndex((current) =>
                      current < thumbnailCandidates.length - 1 ? current + 1 : current,
                    );
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />

                <div className="relative flex h-full w-full items-end justify-between p-5 sm:p-7">
                  <div className="max-w-[70%]">
                    <div className="text-xs sm:text-sm font-semibold tracking-widest text-white/80">
                      JUSTO LAMAS GROUP
                    </div>
                    <h1 className="mt-1 text-xl sm:text-3xl font-bold text-white">
                      Video destacado
                    </h1>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/10 px-3 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur">
                      Reproducir
                    </div>
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur">
                      <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white" />
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
