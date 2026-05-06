"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Carousel({ slides }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (!emblaApi)
            return;
        const update = () => setIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", update);
        update();
    }, [emblaApi]);
    return (_jsxs("section", { className: "relative h-[70vh] md:h-[80vh] overflow-hidden", children: [_jsx("div", { ref: emblaRef, className: "h-full overflow-hidden", children: _jsx("div", { className: "flex h-full", children: slides.map((slide) => (_jsx("div", { className: "relative flex-[0_0_100%] h-full", children: _jsxs("a", { href: slide.link ?? "#", target: slide.link?.startsWith("http") ? "_blank" : "_self", className: "block h-full w-full", children: [_jsx("img", { src: slide.img, alt: slide.title ?? "Hero Slide", className: "absolute inset-0 w-full h-full object-cover" }), (slide.title || slide.subtitle || slide.description) && (_jsx("div", { className: "relative z-10 h-full flex items-center justify-center text-center px-4", children: _jsxs("div", { className: "max-w-4xl text-white animate-fade-in", children: [slide.subtitle && (_jsx("p", { className: "text-lg md:text-xl opacity-90 mb-2", children: slide.subtitle })), slide.title && (_jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-bold mb-4", children: slide.title })), slide.description && (_jsx("p", { className: "text-lg md:text-xl opacity-90", children: slide.description }))] }) }))] }) }, slide.id))) }) }), _jsx("button", { onClick: () => emblaApi?.scrollPrev(), className: "absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition", "aria-label": "Previous slide", children: _jsx(ChevronLeft, { className: "w-6 h-6" }) }), _jsx("button", { onClick: () => emblaApi?.scrollNext(), className: "absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition", "aria-label": "Next slide", children: _jsx(ChevronRight, { className: "w-6 h-6" }) }), _jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2", children: slides.map((_, i) => (_jsx("button", { onClick: () => emblaApi?.scrollTo(i), className: `h-3 rounded-full transition-all ${index === i ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/70"}`, "aria-label": `Go to slide ${i + 1}` }, i))) })] }));
}
