/* Vidéo de fond d'un hero : version recadrée large sur ordinateur, verticale sur mobile.
   Image fixe si l'utilisateur a réduit les animations. */
export function HeroVideo({ className = "absolute inset-0" }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <video autoPlay muted loop playsInline preload="auto" poster="/media/hero/poster-wide.jpg" className="h-full w-full object-cover motion-reduce:hidden">
        <source src="/media/hero/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/media/hero/hero-wide.mp4" type="video/mp4" />
      </video>
      <div className="hidden h-full w-full bg-cover bg-center motion-reduce:block" style={{ backgroundImage: "url(/media/hero/poster-wide.jpg)" }} />
    </div>
  );
}
