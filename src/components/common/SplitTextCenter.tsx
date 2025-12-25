import React from "react";

type Props = {
  title?: string;
  text: string[];
  className?: string; // opcional por si querés ajustar desde afuera
};

export default function SplitTextCenter({ title, text, className = "" }: Props) {
  const hasTitle = Boolean(title && title.trim().length > 0);

  return (
    <section className={["py-10", className].join(" ")}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        {hasTitle && (
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
            {title}
          </h2>
        )}

        <div className="space-y-4 text-slate-600 leading-relaxed">
          {text
            .filter((t) => t && t.trim() !== "")
            .map((t, i) => (
              <p key={i}>{t}</p>
            ))}
        </div>
      </div>
    </section>
  );
}
