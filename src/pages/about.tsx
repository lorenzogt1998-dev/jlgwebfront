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
          "The Justo Lamas Group program promotes Spanish learning through live music and meaningful cultural experiences. Since 1998, the program has inspired thousands of students across the U.S., making Spanish exciting and accessible.",
          "",
          "• Students learn about Latin American culture and modern Spanish-speaking youth.",
          "• They gain useful vocabulary and language structures in a fun, engaging way.",
          "• The concert encourages empathy, inclusion, and motivation to pursue their dreams.",
          "• It also helps students view their own culture from a new perspective.",
          "",
          "Our shows last about 90 minutes and combine Latin pop, rock, and traditional music with strong student interaction.",
          "The performance is both entertaining and educational—an extension of the classroom.",
          "Lyrics, lessons, and karaoke are available online so students can learn songs beforehand and sing along.",
          "After the concert, students meet the artist, take photos, get autographs, and enjoy a personal cultural exchange.",
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

      {/* MANU – VIDEO */}
      <section className="py-12">
        {/* contenedor – mismo fondo que Home */}
        <div className="w-full px-4 bg-gradient-to-b from-black via-neutral-900 to-black rounded-2xl py-12 overflow-hidden">
          {/* título */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
              Meet Emanuel
            </h2>
            <p className="mt-2 text-sm md:text-base text-neutral-300">
              Exclusive interview – Justo Lamas Group
            </p>
          </div>

          {/* marco del video */}
          <div className="relative max-w-5xl mx-auto">
            {/* glow suave */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-80" />

            <div className="relative bg-black rounded-3xl border border-neutral-700 overflow-hidden shadow-2xl">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/yxYa86-feWo?rel=0&modestbranding=1"
                  title="Emanuel – Interview | Justo Lamas Group"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
