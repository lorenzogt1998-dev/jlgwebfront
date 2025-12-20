import { HeroSlider } from "@/components/home/HeroSlider";
import OurMusic from "@/components/home/OurMusic";
import { PostList } from "@/components/home/PostList";
import SidebarHome from "@/components/sidebar/SidebarHome";
import { tickerPosts } from "@/mocks/home";
import OurHistory from "./OurHistory";
import VideoFeatured from "@/components/home/VideoFeatured";

export default function Home() {
  return (
    <div id="main" className="space-y-16">
      {/* space-y-16 ya agrega separación global entre bloques grandes */}

      {/* Slider */}
      <div className="mb-10">
        <HeroSlider />
      </div>

      {/* Content wrapper */}
      <div id="content-wrapper" className="w-full px-4 py-8 mb-10">
        <div id="home-main">
          <PostList posts={tickerPosts} />
        </div>

        {/* Sidebar de home */}
        <div className="mb-16">
          <SidebarHome />
        </div>

        {/* Our music and activities */}
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
    </div>
  );
}
