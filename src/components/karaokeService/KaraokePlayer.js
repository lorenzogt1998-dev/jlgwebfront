import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Play, Pause, Minimize2, Maximize2, } from "lucide-react";
function parseLRC(lrcText) {
    // Soporta: [mm:ss.xx]texto
    const lines = lrcText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    const out = [];
    for (const line of lines) {
        // Ignorar tags tipo [ar:], [ti:], etc.
        if (/^\[[a-z]{2,3}:/i.test(line))
            continue;
        const matches = [...line.matchAll(/\[(\d{2}):(\d{2})(?:\.(\d{1,2}))?\]/g)];
        if (!matches.length)
            continue;
        const text = line
            .replace(/\[(\d{2}):(\d{2})(?:\.(\d{1,2}))?\]/g, "")
            .trim();
        for (const m of matches) {
            const mm = Number(m[1]);
            const ss = Number(m[2]);
            const xx = m[3] ? Number(m[3].padEnd(2, "0")) : 0;
            const time = mm * 60 + ss + xx / 100;
            out.push({ time, text });
        }
    }
    return out.sort((a, b) => a.time - b.time);
}
function findActiveIndex(lines, t) {
    // último índice con time <= t
    let lo = 0;
    let hi = lines.length - 1;
    let ans = -1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (lines[mid].time <= t) {
            ans = mid;
            lo = mid + 1;
        }
        else {
            hi = mid - 1;
        }
    }
    return ans;
}
export default function KaraokePlayer({ title, artist = "Justo Lamas Group", audioSrc, lrcSrc, coverSrc, }) {
    const audioRef = useRef(null);
    const activeLineRef = useRef(null);
    const [lrcText, setLrcText] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    // Offset en ms para ajustar sync sin tocar el LRC
    const [offsetMs, setOffsetMs] = useState(0);
    useEffect(() => {
        (async () => {
            const resp = await fetch(lrcSrc);
            const txt = await resp.text();
            setLrcText(txt);
        })().catch(console.error);
    }, [lrcSrc]);
    const lines = useMemo(() => parseLRC(lrcText), [lrcText]);
    const tWithOffset = useMemo(() => {
        return Math.max(0, current + offsetMs / 1000);
    }, [current, offsetMs]);
    const activeIndex = useMemo(() => {
        if (!lines.length)
            return -1;
        return findActiveIndex(lines, tWithOffset);
    }, [lines, tWithOffset]);
    useEffect(() => {
        // auto-scroll a la línea activa
        if (activeLineRef.current) {
            activeLineRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [activeIndex]);
    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio)
            return;
        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            }
            catch (e) {
                console.error(e);
            }
        }
        else {
            audio.pause();
            setIsPlaying(false);
        }
    };
    const onTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio)
            return;
        setCurrent(audio.currentTime);
    };
    const onLoaded = () => {
        const audio = audioRef.current;
        if (!audio)
            return;
        setDuration(audio.duration || 0);
    };
    const seek = (v) => {
        const audio = audioRef.current;
        if (!audio)
            return;
        audio.currentTime = v;
        setCurrent(v);
    };
    const mmss = (sec) => {
        if (!sec || Number.isNaN(sec))
            return "0:00";
        const m = Math.floor(sec / 60);
        const s = String(Math.floor(sec % 60)).padStart(2, "0");
        return `${m}:${s}`;
    };
    const handleResetOffset = () => {
        // 1) reset del offset (para letras)
        setOffsetMs(0);
        // 2) reset del audio (para canción)
        const audio = audioRef.current;
        if (!audio)
            return;
        audio.pause();
        audio.currentTime = 0;
        // 3) reset de estados UI
        setIsPlaying(false);
        setCurrent(0);
        // opcional: volver a centrar scroll si querés
        requestAnimationFrame(() => {
            activeLineRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
    };
    const fullscreenRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const requestFullscreen = async () => {
        const el = fullscreenRef.current;
        if (!el)
            return;
        // Standard
        if (el.requestFullscreen)
            return el.requestFullscreen();
        // Safari (algunos)
        if (el.webkitRequestFullscreen)
            return el.webkitRequestFullscreen();
        // Old MS
        if (el.msRequestFullscreen)
            return el.msRequestFullscreen();
    };
    const exitFullscreen = async () => {
        const d = document;
        if (document.exitFullscreen)
            return document.exitFullscreen();
        if (d.webkitExitFullscreen)
            return d.webkitExitFullscreen();
        if (d.msExitFullscreen)
            return d.msExitFullscreen();
    };
    const toggleFullscreen = async () => {
        const fsEl = document.fullscreenElement ||
            document.webkitFullscreenElement;
        if (fsEl)
            await exitFullscreen();
        else
            await requestFullscreen();
    };
    useEffect(() => {
        const handler = () => {
            const fsEl = document.fullscreenElement ||
                document.webkitFullscreenElement;
            setIsFullscreen(Boolean(fsEl));
        };
        document.addEventListener("fullscreenchange", handler);
        document.addEventListener("webkitfullscreenchange", handler);
        return () => {
            document.removeEventListener("fullscreenchange", handler);
            document.removeEventListener("webkitfullscreenchange", handler);
        };
    }, []);
    return (
    // ✅ este wrapper es el que entra en fullscreen
    _jsx("div", { ref: fullscreenRef, className: isFullscreen ? "karaoke-fs" : "", children: _jsx("div", { className: "w-full", children: _jsx("div", { className: "rounded-3xl overflow-hidden border border-yellow-400/30 shadow-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950", children: _jsx("div", { className: [
                        "p-6 md:p-8",
                        isFullscreen ? "h-screen flex flex-col" : "",
                    ].join(" "), children: _jsxs("div", { className: [
                            "grid gap-6 md:gap-8 md:grid-cols-[240px_1fr] items-stretch",
                            isFullscreen ? "flex-1" : "",
                        ].join(" "), children: [_jsx("div", { className: "w-full md:w-[220px]", children: _jsxs("div", { className: "rounded-3xl border border-yellow-500/30 bg-black/40 p-4", children: [_jsx("div", { className: "aspect-square rounded-2xl overflow-hidden border border-yellow-500/30 shadow-[0_0_25px_rgba(0,0,0,0.85)]", children: coverSrc ? (_jsx("img", { src: coverSrc, alt: title, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-slate-900" })) }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.35em] text-yellow-400", children: "Karaoke" }), _jsx("h2", { className: "mt-2 text-xl md:text-2xl font-extrabold uppercase tracking-wide text-yellow-300", children: title }), _jsx("p", { className: "text-sm text-slate-300 mt-1", children: artist })] })] }) }), _jsxs("div", { className: [
                                    "flex-1 w-full",
                                    isFullscreen ? "min-h-0 flex flex-col" : "",
                                ].join(" "), children: [_jsx("div", { className: "rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-slate-900/70 via-slate-950/70 to-slate-900/70 p-4 md:p-5", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: togglePlay, className: "inline-flex items-center justify-center rounded-full bg-yellow-400 text-black p-3 shadow-[0_0_18px_rgba(250,204,21,0.55)] hover:bg-yellow-300 transition", children: isPlaying ? (_jsx(Pause, { className: "w-5 h-5" })) : (_jsx(Play, { className: "w-5 h-5" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("input", { type: "range", min: 0, max: duration || 0, value: current, onChange: (e) => seek(Number(e.target.value)), className: "w-full accent-yellow-400" }), _jsxs("div", { className: "mt-1 flex justify-between text-[11px] text-slate-300", children: [_jsx("span", { children: mmss(current) }), _jsx("span", { children: mmss(duration) })] })] }), _jsx("button", { type: "button", onClick: toggleFullscreen, className: "inline-flex items-center justify-center rounded-full border border-slate-600/60 p-2.5 text-slate-200 hover:bg-white/5 transition", title: isFullscreen ? "Exit full screen" : "Full screen", children: isFullscreen ? (_jsx(Minimize2, { className: "w-5 h-5" })) : (_jsx(Maximize2, { className: "w-5 h-5" })) })] }), _jsx("div", { className: "flex flex-wrap items-center gap-2", children: _jsxs("button", { type: "button", onClick: handleResetOffset, className: "inline-flex items-center gap-1 rounded-full border border-slate-600/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5 transition", title: "Reset offset", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), "Reset"] }) })] }) }), _jsxs("div", { className: [
                                            "mt-5 rounded-3xl border border-yellow-500/20 bg-black/35 p-4 md:p-6",
                                            isFullscreen ? "flex-1 min-h-0" : "",
                                        ].join(" "), children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.35em] text-yellow-400 mb-3", children: "Lyrics" }), _jsx("div", { className: [
                                                    "min-h-[220px] flex flex-col items-center justify-center text-center px-4",
                                                    isFullscreen ? "h-full" : "",
                                                ].join(" "), children: lines.length === 0 ? (_jsx("p", { className: "text-sm text-slate-300", children: "Loading lyrics\u2026" })) : activeIndex < 0 ? (_jsx("p", { className: "text-slate-400 text-lg md:text-xl", children: "\u2026" })) : (_jsxs("div", { className: "w-full max-w-3xl", children: [lines[activeIndex - 1]?.text && (_jsx("p", { className: "text-slate-400/60 text-lg md:text-xl mb-3", children: lines[activeIndex - 1].text })), _jsx("p", { className: [
                                                                "rounded-2xl px-6 py-5 md:px-8 md:py-6",
                                                                "bg-yellow-400/10 border border-yellow-400/40",
                                                                "shadow-[0_0_22px_rgba(250,204,21,0.18)]",
                                                                "text-slate-50 font-extrabold tracking-wide",
                                                                "text-2xl md:text-4xl leading-snug",
                                                                "transition-all duration-300 ease-out",
                                                            ].join(" "), children: lines[activeIndex].text || "…" }, activeIndex), lines[activeIndex + 1]?.text && (_jsx("p", { className: "text-slate-400/60 text-lg md:text-xl mt-3", children: lines[activeIndex + 1].text })), _jsx("p", { className: "mt-4 text-[11px] text-slate-500 tabular-nums", children: mmss(lines[activeIndex].time) })] })) })] }), _jsx("audio", { ref: audioRef, src: audioSrc, onLoadedMetadata: onLoaded, onTimeUpdate: onTimeUpdate, onEnded: () => setIsPlaying(false) })] })] }) }) }) }) }));
}
