// src/pages/media.tsx
import React, { useRef, useState, useEffect } from "react";
import { PlayCircle, PauseCircle, Download, FileText, BookOpen } from "lucide-react";

type Song = {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "PERDER EL CONTROL",
    artist: "Justo Lamas Group",
    src: "/audios/perder-el-control-master.wav",          // 👈 ajustá nombre de archivo
    cover: "/images/fue-un-error-portada.jpeg",
  },
  {
    id: 2,
    title: "FUE UN ERROR",
    artist: "Justo Lamas Group",
    src: "/audios/fue-un-error.mp4",          // 👈 ajustá nombre de archivo
    cover: "/images/fue-un-error-portada.jpeg",
  },
];

// 🔹 Data para los PDFs (después cambiás los href a los PDF reales)
const lyricsItems = [
  {
    id: 1,
    songNumber: "Song 01",
    title: "PERDER EL CONTROL",
    level: "Intermediate · B1",
    lyricsHref: "/Docs/Perder-el-control.pdf",      // <-- acá luego va el PDF de la letra
    activitiesHref: "/Docs/Perder-el-control-Activities.pdf", // <-- acá luego va el PDF de actividades
  },
  {
    id: 2,
    songNumber: "Song 02",
    title: "FUE UN ERROR",
    level: "Intermediate · B1",
    lyricsHref: "/Docs/Fue-un-error.pdf",
    activitiesHref: "/Docs/Fue-un-error-Activities.pdf",
  },
];


type SongCardProps = Song & {
  isActive: boolean;
  onActivate: () => void;
};

function SongCard({
  id,
  title,
  artist,
  src,
  cover,
  isActive,
  onActivate,
}: SongCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isActive && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  const formatTime = (sec: number) => {
    if (!sec || Number.isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      onActivate();
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const isActiveGlow = isActive ? "ring-2 ring-yellow-400/70" : "";

  return (
    <article
      className={[
        "mb-6 rounded-3xl overflow-hidden",
        "bg-gradient-to-r from-neutral-900 via-black to-neutral-900",
        "border border-yellow-500/30 shadow-2xl",
        "transition-transform duration-300",
        isActive ? "scale-[1.01]" : "hover:scale-[1.01]",
        isActiveGlow,
      ].join(" ")}
    >
      <div className="flex flex-col md:flex-row">
        {/* Portada */}
        <div className="md:w-1/3 bg-black/80">
          <div className="h-full w-full flex items-center justify-center p-3">
            <img
              src={cover}
              alt={title}
              className="h-40 w-40 md:h-44 md:w-44 object-cover rounded-2xl border border-yellow-500/40 shadow-[0_0_25px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="md:w-2/3 p-5 md:p-6 flex flex-col justify-between text-slate-100">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-400 mb-1">
              Song {id.toString().padStart(2, "0")}
            </p>
            <h3 className="text-xl font-extrabold uppercase tracking-wide text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-4">{artist}</p>

            {/* Barra de progreso + controles */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className={[
                    "inline-flex items-center justify-center rounded-full",
                    "bg-yellow-400 text-black p-2.5",
                    "shadow-[0_0_15px_rgba(250,204,21,0.7)]",
                    "hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.9)]",
                    "transition",
                  ].join(" ")}
                >
                  {isPlaying ? (
                    <PauseCircle className="w-7 h-7" />
                  ) : (
                    <PlayCircle className="w-7 h-7" />
                  )}
                </button>

                {/* Slider */}
                <div className="flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full accent-yellow-400"
                  />
                  <div className="flex justify-between text-[11px] text-slate-300 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Download */}
                <a
                  href={src}
                  download
                  className="inline-flex items-center justify-center rounded-full border border-yellow-400 text-yellow-300 p-2 hover:bg-yellow-400/10 transition shadow-sm"
                  title="Download song"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Audio oculto */}
          <audio
            ref={audioRef}
            src={src}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
          />
        </div>
      </div>
    </article>
  );
}


export default function MediaPage() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      {/* HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Our Music</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Enjoy the songs that inspire students across the country. Listen online
          or download materials to use in your classroom.
        </p>
      </header>

      {/* GRID: izquierda player / derecha PDFs */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start">
        {/* 🎵 COLUMNA IZQUIERDA: PLAYLIST */}
        <section id="playlist">
          

          {songs.map((song) => (
            <SongCard
              key={song.id}
              {...song}
              isActive={activeId === song.id}
              onActivate={() => setActiveId(song.id)}
            />
          ))}
        </section>

        {/* 📄 COLUMNA DERECHA: LYRICS & ACTIVITIES (estilo Hard Rock) */}
        <aside
          aria-label="Lyrics & Classroom Activities"
          className="rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-yellow-500/40 shadow-2xl text-slate-100 px-6 py-7 lg:px-7 lg:py-8"
        >
          {/* Título + subtítulo */}
          <div className="mb-6 text-center lg:text-left">
            <p className="text-xs font-semibold tracking-[0.35em] uppercase text-yellow-400 mb-2">
              LYRICS & ACTIVITIES
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Classroom Rock Zone
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Download printable lyrics and classroom activities for each song.
              Perfect to turn every concert into a full Spanish learning
              experience.
            </p>
          </div>

          <div className="space-y-4">
            {lyricsItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-neutral-900/80 via-black/90 to-neutral-900/80 px-4 py-4 shadow-lg"
              >
                {/* Encabezado de cada canción */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-400">
                      {item.songNumber}
                    </p>
                    <h3 className="text-lg font-bold uppercase tracking-wide text-yellow-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">{item.level}</p>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <a
                    href={item.lyricsHref}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-black shadow-md hover:bg-yellow-300 hover:shadow-lg transition"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Lyrics (PDF)
                  </a>

                  <a
                    href={item.activitiesHref}
                    className="inline-flex items-center justify-center rounded-full border border-yellow-400 px-4 py-2 text-xs font-semibold text-yellow-300 hover:bg-yellow-400/10 transition"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Classroom Activities
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Nota al pie */}
          <p className="mt-5 text-[11px] text-slate-400 text-center lg:text-left">
            * PDFs coming soon. You&apos;ll be able to download the complete
            lyric sheets and activities for each song on the Legado Tour.
          </p>
        </aside>
      </div>
    </div>
  );
}
