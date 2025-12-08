// HeroSlider.tsx
import React from "react";
import Carousel from "../ui/Carousel";

export function HeroSlider() {
  const slides = [
    { id: 1, img: "/images/222.png", alt: "Slide 1", link: "/tour" },
    { id: 2, img: "/images/yt.png", alt: "Slide 2", link: "https://www.youtube.com/@SILVER-oficial-1" },
    { id: 3, img: "/images/emanuel_carrusel_1600.jpg", alt: "Slide 3", link: "/media" },
    { id: 4, img: "/images/4.jpeg", alt: "Slide 4", link: "/posts/reserveTicket" },
  ];

  return (
    <section className="pt-[20px] mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
      <div className="aspect-[16/5]">
        <Carousel slides={slides} />
      </div> 
    </section>
  );
}
