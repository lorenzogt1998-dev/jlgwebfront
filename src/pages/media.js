import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/media.tsx
import { useRef, useState, useEffect } from "react";
import { PlayCircle, PauseCircle, Download, FileText, BookOpen, } from "lucide-react";
const songs = [
    {
        id: 1,
        title: "PERDER EL CONTROL",
        artist: "Justo Lamas Group",
        src: "/audios/perder-el-control-master.wav",
        cover: "/images/fue-un-error-portada-vacia.jpeg",
    },
    {
        id: 2,
        title: "FUE UN ERROR",
        artist: "Justo Lamas Group",
        src: "/audios/fue-un-error.mp4",
        cover: "/images/fue-un-error-portada-vacia.jpeg",
    },
    {
        id: 3,
        title: "QUIERO ENCONTRARTE",
        artist: "Justo Lamas Group",
        src: "/audios/QUIERO-ENCONTRARTE-MASTER.wav",
        cover: "/images/fue-un-error-portada-vacia.jpeg",
    },
    {
        id: 4,
        title: "SIEMPRE POR SIEMPRE",
        artist: "Justo Lamas Group",
        src: "/audios/siempre-por-siempre.wav",
        cover: "/images/1.png",
    },
    {
        id: 5,
        title: "CICATRICES",
        artist: "Justo Lamas Group",
        src: "/audios/cicatrices.wav",
        cover: "/images/1.png",
    },
    {
        id: 6,
        title: "CORAZÓN EN LA MALETA",
        artist: "Justo Lamas Group",
        src: "/audios/corazon-en-la-maleta.wav",
        cover: "/images/1.png",
    },
    {
        id: 7,
        title: "CUANDO NADIE VE",
        artist: "Justo Lamas Group",
        src: "/audios/cuando-nadie-ve.wav",
        cover: "/images/1.png",
    },
    {
        id: 8,
        title: "ERES TU",
        artist: "Justo Lamas Group",
        src: "/audios/eres-tu.wav",
        cover: "/images/1.png",
    },
    {
        id: 9,
        title: "MEJOR QUE AYER",
        artist: "Justo Lamas Group",
        src: "/audios/mejor-que-ayer.wav",
        cover: "/images/1.png",
    },
    {
        id: 10,
        title: "SOY FELIZ",
        artist: "Justo Lamas Group",
        src: "/audios/SOY-FELIZ-MASTER.wav",
        cover: "/images/1.png",
    },
];
const lyricsItems = [
    {
        id: 1,
        songNumber: "Song 01",
        title: "PERDER EL CONTROL",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Perder-el-control.pdf", // <-- acá va el PDF de la letra
        activitiesHref: "/Docs/Perder-el-control-Activities.pdf", // <-- acá va el PDF de actividades
    },
    {
        id: 2,
        songNumber: "Song 02",
        title: "FUE UN ERROR",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Fue-un-error.pdf",
        activitiesHref: "/Docs/Fue-un-error-Activities.pdf",
    },
    {
        id: 3,
        songNumber: "Song 03",
        title: "QUIERO ENCONTRARTE",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Quiero_Encontrarte_Letra_CORREGIDA.pdf",
        activitiesHref: "/Docs/Quiero_Encontrarte_Activities_CORREGIDAS.pdf",
    },
    {
        id: 4,
        songNumber: "Song 04",
        title: "SIEMPRE POR SIEMPRE",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Siempre_por_Siempre.pdf",
        activitiesHref: "/Docs/Siempre_por_Siempre_Activities.pdf",
    },
    {
        id: 5,
        songNumber: "Song 05",
        title: "CICATRICES",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Cicatrices.pdf",
        activitiesHref: "/Docs/Cicatrices_Activities.pdf",
    },
    {
        id: 6,
        songNumber: "Song 06",
        title: "CORAZÓN EN LA MALETA",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Corazon_en_la_Maletaaaaaa_Letra.pdf",
        activitiesHref: "/Docs/Corazon_en_la_Maleta_Activities.pdf",
    },
    {
        id: 7,
        songNumber: "Song 07",
        title: "CUANDO NADIE VE",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Cuando_Nadie_Ve.pdf",
        activitiesHref: "/Docs/Cuando_Nadie_Ve_Activities.pdf",
    },
    {
        id: 8,
        songNumber: "Song 08",
        title: "ERES TU",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Eres_Tu.pdf",
        activitiesHref: "/Docs/Eres_Tu_Activities.pdf",
    },
    {
        id: 9,
        songNumber: "Song 09",
        title: "MEJOR QUE AYER",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Mejor_Que_Ayer.pdf",
        activitiesHref: "/Docs/Mejor_Que_Ayer_Activities.pdf",
    },
    {
        id: 10,
        songNumber: "Song 10",
        title: "SOY FELIZ",
        level: "Intermediate · B1",
        lyricsHref: "/Docs/Soy-Feliz.pdf",
        activitiesHref: "/Docs/Soy-Feliz-Activities.pdf",
    },
];
function SongCard({ id, title, artist, src, cover, isActive, onActivate, }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        if (!isActive && isPlaying && audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive, isPlaying]);
    const formatTime = (sec) => {
        if (!sec || Number.isNaN(sec))
            return "0:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio)
            return;
        if (!isPlaying) {
            onActivate();
            audio.play();
            setIsPlaying(true);
        }
        else {
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
    const handleSeek = (e) => {
        const newTime = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };
    const isActiveGlow = isActive ? "ring-2 ring-yellow-400/70" : "";
    return (_jsx("article", { className: [
            "mb-6 rounded-3xl overflow-hidden",
            "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900",
            "border border-yellow-400/30 shadow-xl",
            "transition-transform duration-300",
            isActive ? "scale-[1.01]" : "hover:scale-[1.01]",
            isActiveGlow,
        ].join(" "), children: _jsxs("div", { className: "flex flex-col md:flex-row", children: [_jsx("div", { className: "md:w-1/3 bg-blue", children: _jsx("div", { className: "h-full w-full flex items-center justify-center p-3", children: _jsx("img", { src: cover, alt: title, className: "h-40 w-40 md:h-44 md:w-44 object-cover rounded-2xl border border-yellow-500/40 shadow-[0_0_25px_rgba(0,0,0,0.9)]" }) }) }), _jsxs("div", { className: "md:w-2/3 p-5 md:p-6 flex flex-col justify-between text-slate-100", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-400 mb-1", children: ["Song ", id.toString().padStart(2, "0")] }), _jsx("h3", { className: "text-lg md:text-xl font-bold uppercase tracking-wide text-yellow-400", children: title }), _jsx("p", { className: "text-xs text-slate-300 mt-1 mb-4", children: artist }), _jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", onClick: handlePlayPause, className: [
                                                    "inline-flex items-center justify-center rounded-full",
                                                    "bg-yellow-400 text-black p-2.5",
                                                    "shadow-[0_0_15px_rgba(250,204,21,0.7)]",
                                                    "hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.9)]",
                                                    "transition",
                                                ].join(" "), children: isPlaying ? (_jsx(PauseCircle, { className: "w-7 h-7" })) : (_jsx(PlayCircle, { className: "w-7 h-7" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("input", { type: "range", min: 0, max: duration || 0, value: currentTime, onChange: handleSeek, className: "w-full accent-yellow-400" }), _jsxs("div", { className: "flex justify-between text-[11px] text-slate-300 mt-1", children: [_jsx("span", { children: formatTime(currentTime) }), _jsx("span", { children: formatTime(duration) })] })] }), _jsx("a", { href: src, download: true, className: "inline-flex items-center justify-center rounded-full border border-yellow-400 text-yellow-300 p-2 hover:bg-yellow-400/10 transition shadow-sm", title: "Download song", children: _jsx(Download, { className: "w-5 h-5" }) })] }) })] }), _jsx("audio", { ref: audioRef, src: src, onLoadedMetadata: handleLoadedMetadata, onTimeUpdate: handleTimeUpdate, onEnded: () => {
                                setIsPlaying(false);
                                setCurrentTime(0);
                            } })] })] }) }));
}
export default function MediaPage() {
    const [activeId, setActiveId] = useState(null);
    return (_jsxs("div", { className: "w-full px-4 py-12 pt-28", children: [_jsxs("header", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl md:text-4xl font-extrabold tracking-wide text-slate-900 mb-4", children: "Our Music" }), _jsx("p", { className: "text-slate-600 max-w-2xl mx-auto leading-relaxed", children: "Enjoy the songs that inspire students across the country. Listen online or download materials to use in your classroom." })] }), _jsxs("div", { className: "grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start", children: [_jsx("section", { id: "playlist", children: songs.map((song) => (_jsx(SongCard, { ...song, isActive: activeId === song.id, onActivate: () => setActiveId(song.id) }, song.id))) }), _jsxs("aside", { "aria-label": "Lyrics & Classroom Activities", className: "rounded-3xl bg-gradient-to-r from-[#0a1730] via-[#0b2342] to-[#0a1730] to-black border border-yellow-400/30 shadow-xl text-slate-100\r\n px-6 py-7\r\n", children: [_jsxs("div", { className: "mb-6 text-center lg:text-left", children: [_jsx("p", { className: "text-xs font-semibold tracking-[0.35em] uppercase text-yellow-400 mb-2", children: "LYRICS & ACTIVITIES" }), _jsx("h2", { className: "text-2xl font-extrabold tracking-tight text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]", children: "Classroom Rock Zone" }), _jsx("p", { className: "mt-3 text-sm text-slate-300", children: "Download printable lyrics and classroom activities for each song. Perfect to turn every concert into a full Spanish learning experience." })] }), _jsx("div", { className: "space-y-4", children: lyricsItems.map((item) => (_jsxs("div", { className: "rounded-2xl border border-yellow-500/30 bg-gradient-to-l from-blue-900/20 via-black/60 to-black-900/20 px-4 py-4 shadow-lg", children: [_jsx("div", { className: "flex items-start justify-between gap-3 mb-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-400", children: item.songNumber }), _jsx("h3", { className: "text-lg font-bold uppercase tracking-wide text-yellow-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]", children: item.title }), _jsx("p", { className: "text-xs text-slate-300 mt-1", children: item.level })] }) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mt-2", children: [_jsxs("a", { href: item.lyricsHref, className: "inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-black shadow-md hover:bg-yellow-300 hover:shadow-lg transition", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "View Lyrics (PDF)"] }), _jsxs("a", { href: item.activitiesHref, className: "inline-flex items-center justify-center rounded-full border border-yellow-400 px-4 py-2 text-xs font-semibold text-yellow-300 hover:bg-yellow-400/10 transition", children: [_jsx(BookOpen, { className: "w-4 h-4 mr-2" }), "Classroom Activities"] })] })] }, item.id))) }), _jsx("p", { className: "mt-5 text-[11px] text-slate-400 text-center lg:text-left" }), _jsx("div", { className: "mb-8", children: _jsxs("div", { className: "rounded-2xl border border-yellow-500/30 bg-gradient-to-l from-blue-900/20 via-black/60 to-black-900/20 px-4 py-5 shadow-lg", children: [_jsx("div", { className: "flex items-start justify-between gap-3 mb-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-400", children: "VIDEO ACTIVITY" }), _jsx("h3", { className: "text-lg font-bold uppercase tracking-wide text-yellow-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]", children: "Getting to Know Emanuel" }), _jsx("p", { className: "text-xs text-slate-300 mt-1", children: "Watch the interview and answer in Spanish using complete sentences." })] }) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mt-2", children: [_jsxs("a", { href: "/Docs/Actividad_Conociendo_a_Emanuel.pdf", target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-black shadow-md hover:bg-yellow-300 hover:shadow-lg transition", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "Open Activity (PDF)"] }), _jsxs("a", { href: "https://www.youtube.com/watch?v=yxYa86-feWo", target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center rounded-full border border-yellow-400 px-4 py-2 text-xs font-semibold text-yellow-300 hover:bg-yellow-400/10 transition", children: [_jsx(BookOpen, { className: "w-4 h-4 mr-2" }), "Watch Video"] })] }), _jsx("p", { className: "mt-3 text-[11px] text-slate-400", children: "Teacher tip: Collect responses as a short paragraph or 12 numbered answers." })] }) }), _jsx("div", { className: "mt-16 max-w-xl mx-auto", children: _jsxs("div", { className: "rounded-3xl bg-gradient-to-r from-blue-900/20 via-neutral-950 to-black border border-yellow-500/40 shadow-xl px-6 py-8 text-center", children: [_jsx("h3", { className: "text-xl font-extrabold text-yellow-300 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]", children: "More Music & Activities Coming Soon" }), _jsx("p", { className: "text-sm text-slate-300 mt-3 leading-relaxed", children: "We\u2019re preparing new songs, lyric sheets, and exciting classroom activities to continue supporting Spanish learning through music. Stay tuned!" }), _jsx("div", { className: "mt-6", children: _jsx("span", { className: "inline-block px-5 py-2 rounded-full bg-yellow-400 text-black text-xs font-semibold shadow-md", children: "Season update" }) })] }) })] })] })] }));
}
