import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HeroYoutube from "@/components/home/HeroYoutube";
import OurMusic from "@/components/home/OurMusic";
import { PostList } from "@/components/home/PostList";
import SidebarHome from "@/components/sidebar/SidebarHome";
import { tickerPosts } from "@/mocks/home";
import OurHistory from "./OurHistory";
import VideoFeatured from "@/components/home/VideoFeatured";
import VideoEmanuel from "@/components/home/VideoEmanuel";
export default function Home() {
    return (_jsxs("div", { id: "main", className: "space-y-16", children: [_jsx("div", { className: "mb-10", children: _jsx(HeroYoutube, {}) }), _jsxs("div", { id: "content-wrapper", className: "w-full px-4 py-8 mb-10", children: [_jsx("div", { id: "home-main", children: _jsx(PostList, { posts: tickerPosts }) }), _jsx("div", { className: "mb-16", children: _jsx(SidebarHome, {}) }), _jsx("div", { className: "mb-16", children: _jsx(VideoEmanuel, {}) }), _jsx("div", { className: "mb-16", children: _jsx(OurMusic, {}) }), _jsx("div", { className: "mb-16", children: _jsx(VideoFeatured, {}) }), _jsx("div", { className: "mb-16", children: _jsx(OurHistory, {}) })] })] }));
}
