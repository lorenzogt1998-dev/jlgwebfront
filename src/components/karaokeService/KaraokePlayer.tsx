import React, { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, Play, Pause } from "lucide-react";

type LrcLine = { time: number; text: string };

function parseLRC(lrcText: string): LrcLine[] {
    // Soporta: [mm:ss.xx]texto
    const lines = lrcText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

    const out: LrcLine[] = [];

    for (const line of lines) {
        // Ignorar tags tipo [ar:], [ti:], etc.
        if (/^\[[a-z]{2,3}:/i.test(line)) continue;

        const matches = [...line.matchAll(/\[(\d{2}):(\d{2})(?:\.(\d{1,2}))?\]/g)];
        if (!matches.length) continue;

        const text = line.replace(/\[(\d{2}):(\d{2})(?:\.(\d{1,2}))?\]/g, "").trim();

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

function findActiveIndex(lines: LrcLine[], t: number): number {
    // último índice con time <= t
    let lo = 0;
    let hi = lines.length - 1;
    let ans = -1;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (lines[mid].time <= t) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}

type Props = {
    title: string;
    artist?: string;
    audioSrc: string; // ej: "/audios/fue-un-error.mp4"
    lrcSrc: string;   // ej: "/lrc/fue-un-error.lrc"
    coverSrc?: string;
};

export default function KaraokePlayer({
    title,
    artist = "Justo Lamas Group",
    audioSrc,
    lrcSrc,
    coverSrc,
}: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const activeLineRef = useRef<HTMLDivElement | null>(null);

    const [lrcText, setLrcText] = useState<string>("");
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
        if (!lines.length) return -1;
        return findActiveIndex(lines, tWithOffset);
    }, [lines, tWithOffset]);


    useEffect(() => {
        // auto-scroll a la línea activa
        if (activeLineRef.current) {
            activeLineRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeIndex]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (e) {
                console.error(e);
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };


    const onTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;
        setCurrent(audio.currentTime);
    };

    const onLoaded = () => {
        const audio = audioRef.current;
        if (!audio) return;
        setDuration(audio.duration || 0);
    };

    const seek = (v: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = v;
        setCurrent(v);
    };

    const mmss = (sec: number) => {
        if (!sec || Number.isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = String(Math.floor(sec % 60)).padStart(2, "0");
        return `${m}:${s}`;
    };



    return (
        <div className="w-full">
            {/* Card estilo Tour (navy + gold) */}
            <div className="rounded-3xl overflow-hidden border border-yellow-400/30 shadow-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        {/* Cover */}
                        <div className="w-full md:w-[220px]">
                            <div className="rounded-3xl border border-yellow-500/30 bg-black/40 p-4">
                                <div className="aspect-square rounded-2xl overflow-hidden border border-yellow-500/30 shadow-[0_0_25px_rgba(0,0,0,0.85)]">
                                    {coverSrc ? (
                                        <img src={coverSrc} alt={title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-900" />
                                    )}
                                </div>

                                <div className="mt-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-yellow-400">
                                        Karaoke
                                    </p>
                                    <h2 className="mt-2 text-xl md:text-2xl font-extrabold uppercase tracking-wide text-yellow-300">
                                        {title}
                                    </h2>
                                    <p className="text-sm text-slate-300 mt-1">{artist}</p>
                                </div>
                            </div>
                        </div>

                        {/* Player + Lyrics */}
                        <div className="flex-1 w-full">
                            {/* Controls */}
                            <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-slate-900/70 via-slate-950/70 to-slate-900/70 p-4 md:p-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={togglePlay}
                                            className="inline-flex items-center justify-center rounded-full bg-yellow-400 text-black p-3 shadow-[0_0_18px_rgba(250,204,21,0.55)] hover:bg-yellow-300 transition"
                                        >
                                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                        </button>

                                        <div className="flex-1">
                                            <input
                                                type="range"
                                                min={0}
                                                max={duration || 0}
                                                value={current}
                                                onChange={(e) => seek(Number(e.target.value))}
                                                className="w-full accent-yellow-400"
                                            />
                                            <div className="mt-1 flex justify-between text-[11px] text-slate-300">
                                                <span>{mmss(current)}</span>
                                                <span>{mmss(duration)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Offset */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                                            Sync Offset
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setOffsetMs((v) => v - 250)}
                                            className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 px-3 py-1.5 text-xs text-yellow-200 hover:bg-yellow-400/10 transition"
                                            title="Back -250ms"
                                        >
                                            <Minus className="w-4 h-4" />
                                            250ms
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setOffsetMs((v) => v + 250)}
                                            className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 px-3 py-1.5 text-xs text-yellow-200 hover:bg-yellow-400/10 transition"
                                            title="Forward +250ms"
                                        >
                                            <Plus className="w-4 h-4" />
                                            250ms
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setOffsetMs(0)}
                                            className="inline-flex items-center gap-1 rounded-full border border-slate-600/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5 transition"
                                            title="Reset offset"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Reset
                                        </button>

                                        <span className="ml-auto text-xs text-slate-300">
                                            Offset: <span className="text-yellow-300 font-semibold">{offsetMs}ms</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Lyrics box */}
                            <div className="mt-5 rounded-3xl border border-yellow-500/20 bg-black/35 p-4 md:p-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-yellow-400 mb-3">
                                    Lyrics
                                </p>

                                <div className="min-h-[220px] flex flex-col items-center justify-center text-center px-4">
                                    {lines.length === 0 ? (
                                        <p className="text-sm text-slate-300">Loading lyrics…</p>
                                    ) : activeIndex < 0 ? (
                                        <p className="text-slate-400 text-lg md:text-xl">…</p>
                                    ) : (
                                        <div className="w-full max-w-3xl">
                                            {/* línea anterior (opcional) */}
                                            {lines[activeIndex - 1]?.text && (
                                                <p className="text-slate-400/60 text-lg md:text-xl mb-3">
                                                    {lines[activeIndex - 1].text}
                                                </p>
                                            )}

                                            {/* línea ACTIVA */}
                                            <p
                                                key={activeIndex}
                                                className={[
                                                    "rounded-2xl px-6 py-5 md:px-8 md:py-6",
                                                    "bg-yellow-400/10 border border-yellow-400/40",
                                                    "shadow-[0_0_22px_rgba(250,204,21,0.18)]",
                                                    "text-slate-50 font-extrabold tracking-wide",
                                                    "text-2xl md:text-4xl leading-snug",
                                                    "transition-all duration-300 ease-out",
                                                ].join(" ")}
                                            >
                                                {lines[activeIndex].text || "…"}
                                            </p>

                                            {/* línea siguiente (opcional) */}
                                            {lines[activeIndex + 1]?.text && (
                                                <p className="text-slate-400/60 text-lg md:text-xl mt-3">
                                                    {lines[activeIndex + 1].text}
                                                </p>
                                            )}

                                            {/* timestamp chiquito opcional */}
                                            <p className="mt-4 text-[11px] text-slate-500 tabular-nums">
                                                {mmss(lines[activeIndex].time)}
                                            </p>
                                        </div>
                                    )}
                                </div>


                                <p className="mt-3 text-[11px] text-slate-400">
                                    Tip: si la letra va tarde o temprano, ajustá <span className="text-yellow-300">Sync Offset</span>.
                                </p>
                            </div>

                            <audio
                                ref={audioRef}
                                src={audioSrc}
                                onLoadedMetadata={onLoaded}
                                onTimeUpdate={onTimeUpdate}
                                onEnded={() => setIsPlaying(false)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
