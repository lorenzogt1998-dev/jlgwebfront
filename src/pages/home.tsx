import { HeroSlider } from "@/components/home/HeroSlider";
import OurMusic from "@/components/home/OurMusic";
import { PostList } from "@/components/home/PostList";
import { SidebarSmall } from "@/components/home/SidebarSmall";
import { Ticker } from "@/components/home/Ticker";
import SidebarHome from "@/components/sidebar/SidebarHome";
import { tickerPosts, latestPosts } from "@/mocks/home";
import { useState } from "react";
import OurHistory from "./OurHistory";
import VideoFeatured from "@/components/home/VideoFeatured";

export default function Home() {
  const [mode] = useState<"widgets" | "list">("list");

  return (
    <div id="main" className="space-y-16">
      {/* 👈 space-y-16 ya agrega separación global entre bloques grandes */}

      {/* Slider */}
      <div className="mb-10">
        <HeroSlider />
      </div>

      {/* Ticker */}
      <div className="mb-10">
        <Ticker items={tickerPosts} />
      </div>

      {/* Content wrapper */}
      <div
        id="content-wrapper"
        className="max-w-6xl mx-auto px-4 py-8 mb-10"
      >
        <div id="home-main">
          {mode === "widgets" ? (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <ul className="space-y-4">
                  <li className="p-4 border rounded-xl">
                    Homepage Widget Area – widget placeholder
                  </li>
                  <li className="p-4 border rounded-xl">
                    Otro widget placeholder
                  </li>
                </ul>
              </div>
              <SidebarSmall />
            </div>
          ) : (
            <>
              <PostList posts={latestPosts} />
            </>
          )}
        </div>
      </div>

      {/* Sidebar de home */}
      <div className="mb-16">
        <SidebarHome />
      </div>

      <div className="mb-16">
        <Ticker items={[]} />
      </div>

      <div className="mb-16">
        <OurMusic />
      </div>

      {/* NUEVO VIDEO DESTACADO */}
      <div className="mb-16">
        <VideoFeatured />
      </div>

      {/* NUEVA SECCIÓN OUR HISTORY */}
      <div className="mb-16">
        <OurHistory />
      </div>
    </div>
  );
}
