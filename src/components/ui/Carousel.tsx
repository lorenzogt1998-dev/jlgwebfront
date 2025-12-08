import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Slide = {
  id: string | number;
  img: string;
  link?: string; // 💥 AÑADIDO
  title?: string;
  subtitle?: string;
  description?: string;
};

export default function HardRockCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000 })]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", update);
    update();
  }, [emblaApi]);

  return (
    <section className="relative w-full">
      {/* CARRUSEL */}
      <div ref={emblaRef} className="overflow-hidden h-[600px] w-full">
        <div className="flex h-full">
          {slides.map((s) => (
            <div
              key={s.id}
              className="relative flex-[0_0_100%] h-full w-full"
            >
              <a
                href={s.link ?? "#"}
                target={s.link?.startsWith("http") ? "_blank" : "_self"}
                className="block h-full w-full"
              >
                {/* IMAGEN FULLSCREEN */}
                <img
                  src={s.img}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* TEXTO OVERLAY */}
                <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 text-white max-w-xl">
                  <h3 className="text-xl tracking-wide uppercase opacity-90">
                    {s.subtitle}
                  </h3>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    {s.title}
                  </h1>
                  <p className="mt-4 text-sm md:text-base opacity-90">
                    {s.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FLECHAS HARD ROCK */}
      <button
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition text-4xl z-20"
        onClick={() => emblaApi?.scrollPrev()}
      >
        ❮
      </button>

      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition text-4xl z-20"
        onClick={() => emblaApi?.scrollNext()}
      >
        ❯
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
