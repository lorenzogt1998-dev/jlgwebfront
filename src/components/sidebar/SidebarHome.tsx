
export default function SidebarHome() {
  const cards = [
    {
      id: 1,
      title: "KARAOKE",
      text: "Stay in style worldwide.",
      img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Microphone_on_a_karaoke_night_%28Unsplash%29.jpg",
      button: "Karaoke",
      link: "/services",
    },
    {
      id: 2,
      title: "TOURS",
      text: "Legendary dining, local flavors.",
      img: "/images/Guitar-tabs.jpg",
      button: "Tour Dates",
      link: "/tour",
    },
    {
      id: 3,
      title: "CONTACT US",
      text: "Experience the excitement of music and learning.",
      img: "/images/smartphone_mobile_phone_social_media_icon_phone_button_communication_cellular_technology_screen_company-1086716.jpg",
      button: "Contact",
      link: "/contact",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center bg-gray-300 rounded-2xl py-16">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase">
          Justo Lamas Group Experience
        </h2>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          From unforgettable concerts to inspiring classrooms and cultural exchange,
          Justo Lamas Group brings the energy of music to every experience.
        </p>

        {/* Tarjetas */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.id}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-sm opacity-90">{c.text}</p>
                <a
                  href={c.link}
                  className="mt-3 inline-block border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-black transition"
                >
                  {c.button}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}