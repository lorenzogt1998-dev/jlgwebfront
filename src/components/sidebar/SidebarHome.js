import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("section", { className: "py-16", children: _jsxs("div", { className: "w-full px-4 text-center bg-gray-300 rounded-2xl py-16", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-800 uppercase", children: "Justo Lamas Group Experience" }), _jsx("p", { className: "mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto", children: "From unforgettable concerts to inspiring classrooms and cultural exchange, Justo Lamas Group brings the energy of music to every experience." }), _jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: cards.map((c) => (_jsxs("div", { className: "relative rounded-xl overflow-hidden shadow-md group", children: [_jsx("img", { src: c.img, alt: c.title, className: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" }), _jsx("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 text-left text-white", children: [_jsx("h3", { className: "text-lg font-semibold", children: c.title }), _jsx("p", { className: "text-sm opacity-90", children: c.text }), _jsx("a", { href: c.link, className: "mt-3 inline-block border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-black transition", children: c.button })] })] }, c.id))) })] }) }));
}
