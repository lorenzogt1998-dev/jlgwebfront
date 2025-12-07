// HeroSlider.tsx
import React from "react";
import Carousel from "../ui/Carousel";

export function HeroSlider() {
  const slides = [
    { id: 1, img: "/images/222.png", alt: "Slide 1" },
    { id: 2, img: "/images/1.png", alt: "Slide 2" },
    { id: 3, img: "/images/emanuel_carrusel_1600.jpg", alt: "Slide 3" },
  ];

  return (
    <section className="pt-[20px] mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
      <div className="aspect-[16/5]">
        <Carousel slides={slides}  />
      </div> 
    </section>
  );
}
