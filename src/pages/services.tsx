// src/pages/services.tsx
import HeroBanner from "@/components/common/HeroBanner";
import SplitTextCenter from "@/components/common/SplitTextCenter";
import SplitSection from "@/components/common/SplitSection";

export default function Services() {
  return (
    <div className="w-full">
      {/* HERO */}
      <HeroBanner
        image="https://upload.wikimedia.org/wikipedia/commons/8/8a/Microphone_on_a_karaoke_night_%28Unsplash%29.jpg"
        title="Karaoke "
        subtitle="Coming soon..."
      />

      {/* LEGACY BLOCK */}
      <SplitTextCenter
        title="A Legacy of Inspiring Students Through Music and Culture"
        text={[
          "Justo Lamas Group was founded with a simple mission: inspire, motivate, and connect students through the power of Spanish language and music.",
          "For more than two decades, schools across the United States have partnered with JLG to bring meaningful cultural experiences to their students. Through concerts, storytelling, workshops, and interactive activities, the program helps students engage with Spanish in an authentic, emotional, and unforgettable way.",
          "Our vision is rooted in positivity, inclusion, and personal growth — values that have inspired hundreds of thousands of students across the country.",
        ]}
      />
    </div>
  );
}
