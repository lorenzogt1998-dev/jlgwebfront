// src/pages/services.tsx
import HeroBanner from "@/components/common/HeroBanner";
import SplitTextCenter from "@/components/common/SplitTextCenter";
import KaraokePlayer from "@/components/karaokeService/KaraokePlayer";
import { useState } from "react";

type KaraokeSong = {
  id: number;
  title: string;
  artist: string;
  audioSrc: string;
  cover: string;
  lrcUrl: string;
};

const karaokeSongs: KaraokeSong[] = [
  {
    id: 1,
    title: "PERDER EL CONTROL",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/perder-el-control-master.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/perder-el-control.lrc",
  },
  {
    id: 2,
    title: "FUE UN ERROR",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/fue-un-error.mp4",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/fue-un-error.lrc",
  },
    {
    id: 3,
    title: "CICATRICES",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/cicatrices.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/cicatrices.lrc",
  },
    {
    id: 4,
    title: "CORAZÓN EN LA MALETA",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/corazon-en-la-maleta.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/corazon_en_la_Maleta.lrc",
  },
    {
    id: 5,
    title: "CUANDO NADIE VE",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/cuando-nadie-ve.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/cuando_Nadie_Ve.lrc",
  },
    {
    id: 6,
    title: "ERES TU",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/eres-tu.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/eres_Tu.lrc",
  },
    {
    id: 7,
    title: "MEJOR QUE AYER",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/mejor-que-ayer.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/mejor_Que_Ayer.lrc",
  },
      {
    id: 8,
    title: "SIEMPRE POR SIEMPRE",
    artist: "Justo Lamas Group",
    audioSrc: "/audios/siempre-por-siempre.wav",
    cover: "/images/fue-un-error-portada-vacia.jpeg",
    lrcUrl: "/lrc/siempre_por_Siempre.lrc",
  },
  

];export default function Services() {
  const [selectedSong, setSelectedSong] = useState<KaraokeSong | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ MISMO CONTENEDOR que Tour / Media */}
      <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
        {/* ✅ HEADER tipo Tour */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            A Legacy of Inspiring Students Through Music and Culture
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Justo Lamas Group was founded with a simple mission: inspire, motivate,
            and connect students through the power of Spanish language and music.
          </p>
        </header>

        {/* ✅ TEXTO (sin “sección” rara, sin bg gris, sin padding gigante) */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              For more than two decades, schools across the United States have partnered
              with JLG to bring meaningful cultural experiences to their students. Through
              concerts, storytelling, workshops, and interactive activities, the program
              helps students engage with Spanish in an authentic, emotional, and unforgettable way.
            </p>
            <p>
              Our vision is rooted in positivity, inclusion, and personal growth — values
              that have inspired hundreds of thousands of students across the country.
            </p>
          </div>
        </section>

        {/* ✅ Karaoke Songs (podés dejarlo igual, pero el título también lo “tourizo”) */}
        <section className="mt-14">
          <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Karaoke Songs
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {karaokeSongs.map((song) => (
              <button
                key={song.id}
                onClick={() => setSelectedSong(song)}
                className="rounded-3xl p-4 text-left bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-yellow-400/30 hover:scale-[1.01] transition"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-yellow-400">
                  Karaoke
                </p>
                <h3 className="text-yellow-300 font-extrabold uppercase">
                  {song.title}
                </h3>
                <p className="text-slate-300 text-sm">{song.artist}</p>
              </button>
            ))}
          </div>
        </section>

        {/* PLAYER */}
        {selectedSong && (
          <section className="mt-10">
            <KaraokePlayer
              title={selectedSong.title}
              artist={selectedSong.artist}
              audioSrc={selectedSong.audioSrc}
              coverSrc={selectedSong.cover}
              lrcSrc={selectedSong.lrcUrl}
            />
          </section>
        )}
      </div>
    </div>
  );
}
