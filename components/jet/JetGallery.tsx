import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { jetPhotos } from "@/lib/jet";

/* Galerie photo de la page Jet privé : photos du client, en grille sur ordinateur, défilement horizontal sur mobile. */
export function JetGallery() {
  return (
    <section aria-labelledby="jet-photos" className="bg-navy pb-6 text-ivory">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="mb-8 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">En images</p>
          <h2 id="jet-photos" className="mt-3 font-serif text-3xl font-bold md:text-4xl">Du tarmac à la cabine</h2>
        </Reveal>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {jetPhotos.map((p, i) => (
            <li key={p.src} className="w-[72%] shrink-0 snap-center sm:w-[44%] md:w-auto">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 25vw, 72vw" loading={i < 2 ? "eager" : "lazy"} className="object-cover transition duration-700 hover:scale-105" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
