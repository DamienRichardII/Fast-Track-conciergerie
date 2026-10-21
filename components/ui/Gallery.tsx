"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery";

export function Gallery({ title, items }: { title: string; items: GalleryItem[] }) {
  const photos = items.filter((i): i is Extract<GalleryItem, { type: "image" }> => i.type === "image");
  const videos = items.filter((i): i is Extract<GalleryItem, { type: "video" }> => i.type === "video");
  const [open, setOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, photos.length]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8" aria-label={title}>
      <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">{title}</h2>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Agrandir : ${p.alt}`} className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>

      {videos.length > 0 && (
        <>
          <h3 className="mb-5 mt-12 text-center font-serif text-2xl font-bold">En vidéo</h3>
          <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {videos.map((v) => (
              <li key={v.src} className="relative overflow-hidden rounded-2xl bg-black shadow-soft" style={{ aspectRatio: `${v.w} / ${v.h}` }}>
                {playing === v.src ? (
                  <video src={v.src} poster={v.poster} controls autoPlay playsInline preload="metadata" aria-label={v.alt} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <button type="button" onClick={() => setPlaying(v.src)} aria-label={`Lire : ${v.alt}`} className="group absolute inset-0">
                    <Image src={v.poster} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                    <span className="absolute inset-0 grid place-items-center bg-black/20 transition group-hover:bg-black/30">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-chocolate-deep"><Play className="h-6 w-6 translate-x-0.5" /></span>
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={photos[open].alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(null)}>
          <button type="button" onClick={() => setOpen(null)} aria-label="Fermer" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="h-6 w-6" /></button>
          {photos.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }} aria-label="Photo précédente" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft className="h-6 w-6" /></button>
              <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }} aria-label="Photo suivante" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight className="h-6 w-6" /></button>
            </>
          )}
          <Image src={photos[open].src} alt={photos[open].alt} width={photos[open].w} height={photos[open].h} sizes="100vw" onClick={(e) => e.stopPropagation()} className="max-h-[90svh] w-auto max-w-full rounded-xl object-contain" />
        </div>
      )}
    </section>
  );
}
