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
