// src/pages/about.tsx
import HeroBanner from "@/components/common/HeroBanner";
import SplitTextCenter from "@/components/common/SplitTextCenter";
import SplitSection from "@/components/common/SplitSection";

export default function About() {
  return (
    <div className="w-full">
      {/* HERO */}
      <HeroBanner
        image="/images/DSC0679.jpg"
       /* image="/images/about/hero.jpg"*/
        title="Justo Lamas Group"
        subtitle="Empowering students through culture, music and education."
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

      {/* ABOUT PROGRAM */}
      <SplitSection
        title="About the Program"
        text={[
          "The Justo Lamas educational program brings the Spanish classroom to life through music, culture, and real human connection.",
          "",
          "• How long is the presentation? — Typically 60 to 75 minutes.",
          "• Who is it for? — Middle school, high school, and Spanish learners of all levels.",
          "• What is the goal? — To inspire students to continue learning the language.",
          "• What makes it unique? — Live music, emotional storytelling, student participation, and messages of empathy and inclusion.",
        ]}
        image="/images/12J.LAMAS-WEB.jpg"
        flip={false}
      />

      {/* MANU */}
      <SplitSection
        title="EMANUEL — Artist"
        text={[
          "Emanuel brings passion, authenticity, and a modern musical style to the Justo Lamas program.",
          "Born in Argentina and raised between cultures, he grew up surrounded by music, storytelling, and the desire to connect with people.",
          "As the lead performer of JLG, Manu blends interactive music, personal stories, and messages of hope that resonate powerfully with students.",
          "His mission is to continue the legacy of inspiring young people to believe in themselves and embrace the Spanish language.",
        ]}
        image="/images/DSC06753.jpg"
        flip={true}
      />

      {/* JUSTO LAMAS */}
      <SplitSection
        title="Justo Lamas — Founder"
        text={[
          "Justo Lamas is an Argentine singer, educator, and motivational speaker who transformed the way Spanish is taught across the United States.",
          "For more than 20 years, his concerts touched the hearts of millions of students, inspiring them through messages of hope, respect, and personal growth.",
          "Justo’s legacy lives on through the program that carries his name, continuing to impact new generations with the same mission: inspire students through love, music, and language.",
        ]}
        image="/images/WhatsApp Image 2025-11-19 at 11.54.45.jpeg"
        flip={false}
      />
    </div>
  );
}
