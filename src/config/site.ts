// src/config/site.ts
export type MenuItem = { label: string; to: string };

export interface SiteConfig {
  name: string;
  logoUrl: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    pinterest: string;
    linkedin: string;
    rss: string;
  };
  menus: {
    secondary: MenuItem[];
    primary: MenuItem[];
    footer: MenuItem[];   // <── footer acá
  };
  copyright: string;
}

export const site: SiteConfig = {
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
