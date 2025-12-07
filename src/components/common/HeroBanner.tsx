interface HeroBannerProps {
  image: string;
  title?: string;
  subtitle?: string;
  height?: string;
}

export default function HeroBanner({
  image,
  title,
  subtitle,
  height = "70vh",
}: HeroBannerProps) {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{
        height,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="relative z-10 text-center text-white px-4">
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
