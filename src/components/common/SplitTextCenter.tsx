import React from "react";

type SplitTextCenterProps = {
  title: string;
  text: string | string[];
};

export default function SplitTextCenter({ title, text }: SplitTextCenterProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {title}
        </h2>

        <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
          {Array.isArray(text)
            ? text
                .filter((t) => t && t.trim() !== "")
                .map((t, i) => <p key={i}>{t}</p>)
            : <p>{text}</p>}
        </div>
      </div>
    </section>
  );
}
