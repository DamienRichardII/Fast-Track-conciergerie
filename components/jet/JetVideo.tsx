"use client";
import { useRef, useState } from "react";

type V = { src: string; poster: string };

/* Vidéo décorative en boucle, sans son. Sous « réduire les animations », seule l'image fixe est affichée. */
export function LoopVideo({ v, className = "" }: { v: V; className?: string }) {
  return (
    <>
      <video autoPlay muted loop playsInline preload="metadata" poster={v.poster} className={`${className} motion-reduce:hidden`}>
        <source src={v.src} type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.poster} alt="" className={`${className} hidden motion-reduce:block`} />
    </>
  );
}

/* Fond du hero : deux vidéos côte à côte dès md ; sur mobile, une seule à l'écran, la seconde prend le relais à la fin de la première. */
export function HeroVideos({ videos }: { videos: V[] }) {
  const [cur, setCur] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const next = (k: number) => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const target = wide ? k : (k + 1) % videos.length;
    if (!wide) setCur(target);
    const el = refs.current[target];
    if (el) { el.currentTime = 0; void el.play().catch(() => {}); }
  };
  return (
    <div aria-hidden className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
      {videos.map((v, k) => (
        <div key={v.src} className={`relative h-full overflow-hidden ${k === cur ? "block" : "hidden"} md:block`}>
          <video ref={(el) => { refs.current[k] = el; }} autoPlay={k === 0} muted playsInline preload={k === 0 ? "auto" : "metadata"} poster={v.poster}
            onEnded={() => next(k)} className="h-full w-full object-cover motion-reduce:hidden">
            <source src={v.src} type="video/mp4" />
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={v.poster} alt="" className="hidden h-full w-full object-cover motion-reduce:block" />
        </div>
      ))}
    </div>
  );
}
