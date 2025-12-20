"use client"

import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Slide = {
  id: string | number
  img: string
  link?: string
  title?: string
  subtitle?: string
  description?: string
}

export default function Carousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000 })]
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const update = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", update)
    update()
  }, [emblaApi])

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* CAROUSEL */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] h-full"
            >
              <a
                href={slide.link ?? "#"}
                target={slide.link?.startsWith("http") ? "_blank" : "_self"}
                className="block h-full w-full"
              >
                {/* IMAGE */}
                <img
                  src={slide.img}
                  alt={slide.title ?? "Hero Slide"}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50" />

                {/* CONTENT */}
                {(slide.title || slide.subtitle || slide.description) && (
                  <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl text-white animate-fade-in">
                      {slide.subtitle && (
                        <p className="text-lg md:text-xl opacity-90 mb-2">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.title && (
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                          {slide.title}
                        </h1>
                      )}
                      {slide.description && (
                        <p className="text-lg md:text-xl opacity-90">
                          {slide.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* PREV */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* NEXT */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-3 rounded-full transition-all ${
              index === i ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
