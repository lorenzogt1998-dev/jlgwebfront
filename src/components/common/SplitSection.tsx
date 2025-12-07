import React from "react";

type SplitSectionProps = {
  title: string;
  text: string | string[];
  image: string;
  flip?: boolean; // si true, imagen a la derecha en desktop
};

export default function SplitSection({
  title,
  text,
  image,
  flip = false,
}: SplitSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div
        className={`max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 ${
          flip ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Imagen */}
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Texto */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {title}
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            {Array.isArray(text)
              ? text
                  .filter((t) => t && t.trim() !== "")
                  .map((t, i) => <p key={i}>{t}</p>)
              : <p>{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
