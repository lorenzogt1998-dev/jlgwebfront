export const site = {
    name: "Justo Lamas Group",
    logoUrl: "/logo.png",
    socials: {
        facebook: "justolamasgroup",
        instagram: "justolamasgroup",
        youtube: "justolamasgroup",
        twitter: "justolamasgroup",
        pinterest: "",
        linkedin: "",
        rss: "/feed.xml",
    },
    menus: {
        secondary: [
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Tour", to: "/tour" },
            { label: "Contact", to: "/contact" },
        ],
        primary: [
            { label: "About Us", to: "/about" },
            { label: "Artists", to: "/artists" },
            { label: "Services", to: "/services" },
            { label: "Testimonials", to: "/testimonials" },
            { label: "Tour", to: "/tour" },
            { label: "Downloads", to: "/downloads" },
            { label: "Media", to: "/media" },
            { label: "Albums", to: "/albums" },
            { label: "Contact", to: "/contact" },
        ],
        footer: [
            { label: "Privacy", to: "/privacy" },
            { label: "Press", to: "/press" },
            { label: "Contact", to: "/contact" },
        ],
    },
    copyright: `© ${new Date().getFullYear()} Justo Lamas Group. All rights reserved.`,
};
