import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { site } from "@/config/site";
export function SocialBar() {
    const s = site.socials;
    const Item = ({ href, label, children }) => href ? (_jsx("a", { href: href, "aria-label": label, target: "_blank", rel: "noreferrer", className: "p-2 hover:opacity-80", children: children })) : null;
    return (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Item, { href: s.facebook ? `https://www.facebook.com/${s.facebook}` : "", label: "Facebook", children: "FB" }), _jsx(Item, { href: s.twitter ? `https://twitter.com/${s.twitter}` : "", label: "Twitter", children: "X" }), _jsx(Item, { href: s.instagram ? `https://instagram.com/${s.instagram}` : "", label: "Instagram", children: "IG" }), _jsx(Item, { href: s.pinterest ? `https://pinterest.com/${s.pinterest}` : "", label: "Pinterest", children: "P" }), _jsx(Item, { href: s.youtube ? `https://youtube.com/user/${s.youtube}` : "", label: "YouTube", children: "YT" }), _jsx(Item, { href: s.linkedin ? `https://www.linkedin.com/company/${s.linkedin}` : "", label: "LinkedIn", children: "in" }), _jsx(Item, { href: s.rss, label: "RSS", children: "RSS" })] }));
}
