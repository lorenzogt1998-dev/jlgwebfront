import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import KaraokePlayer from "@/components/karaokeService/KaraokePlayer";
import { useState } from "react";
const karaokeSongs = [
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
        title: "QUIERO ENCONTRARTE",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/QUIERO-ENCONTRARTE-MASTER.wav",
        cover: "/images/fue-un-error-portada-vacia.jpeg",
        lrcUrl: "/lrc/quiero_encontrarte.lrc",
    },
    {
        id: 4,
        title: "SIEMPRE POR SIEMPRE",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/siempre-por-siempre.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/siempre_por_Siempre.lrc",
    },
    {
        id: 5,
        title: "CICATRICES",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/cicatrices.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/cicatrices.lrc",
    },
    {
        id: 6,
        title: "CORAZÓN EN LA MALETA",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/corazon-en-la-maleta.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/corazon_en_la_Maleta.lrc",
    },
    {
        id: 7,
        title: "CUANDO NADIE VE",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/cuando-nadie-ve.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/cuando_Nadie_Ve.lrc",
    },
    {
        id: 8,
        title: "ERES TU",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/eres-tu.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/eres_Tu.lrc",
    },
    {
        id: 9,
        title: "MEJOR QUE AYER",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/mejor-que-ayer.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/mejor_Que_Ayer.lrc",
    },
    {
        id: 10,
        title: "SOY FELIZ",
        artist: "Justo Lamas Group",
        audioSrc: "/audios/SOY-FELIZ-MASTER.wav",
        cover: "/images/1.png",
        lrcUrl: "/lrc/soy-feliz.lrc",
    },
];
export default function Services() {
    const [selectedSong, setSelectedSong] = useState(null);
    return (_jsx("div", { className: "min-h-screen bg-white", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-12 pt-28", children: [_jsxs("header", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900", children: "A Legacy of Inspiring Students Through Music and Culture" }), _jsx("p", { className: "text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed", children: "Justo Lamas Group was founded with a simple mission: inspire, motivate, and connect students through the power of Spanish language and music." })] }), _jsx("section", { className: "max-w-4xl mx-auto text-center", children: _jsxs("div", { className: "space-y-4 text-slate-600 leading-relaxed", children: [_jsx("p", { children: "For more than two decades, schools across the United States have partnered with JLG to bring meaningful cultural experiences to their students. Through concerts, storytelling, workshops, and interactive activities, the program helps students engage with Spanish in an authentic, emotional, and unforgettable way." }), _jsx("p", { children: "Our vision is rooted in positivity, inclusion, and personal growth \u2014 values that have inspired hundreds of thousands of students across the country." })] }) }), _jsxs("section", { className: "mt-14", children: [_jsx("div", { className: "max-w-4xl mx-auto px-4 mb-8 text-center", children: _jsx("h2", { className: "text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900", children: "Karaoke Songs" }) }), _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: karaokeSongs.map((song) => (_jsxs("button", { onClick: () => setSelectedSong(song), className: "rounded-3xl p-4 text-left bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-yellow-400/30 hover:scale-[1.01] transition", children: [_jsx("p", { className: "text-xs tracking-[0.25em] uppercase text-yellow-400", children: "Karaoke" }), _jsx("h3", { className: "text-yellow-300 font-extrabold uppercase", children: song.title }), _jsx("p", { className: "text-slate-300 text-sm", children: song.artist })] }, song.id))) })] }), selectedSong && (_jsx("section", { className: "mt-10", children: _jsx(KaraokePlayer, { title: selectedSong.title, artist: selectedSong.artist, audioSrc: selectedSong.audioSrc, coverSrc: selectedSong.cover, lrcSrc: selectedSong.lrcUrl }) }))] }) }));
}
