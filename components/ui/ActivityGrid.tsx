import Link from "next/link";
import Image from "next/image";
import { ImageIcon, Play } from "lucide-react";
import { activities } from "@/lib/gallery";

export function ActivityGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8" aria-label="Nos activités">
      <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">Nos activités</h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => {
          const photos = a.items.filter((i) => i.type === "image").length;
          const videos = a.items.length - photos;
          return (
            <li key={a.slug}>
              <Link href={`/activites-touristiques/${a.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
                <Image src={a.cover} alt={a.coverAlt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                  <h3 className="font-serif text-2xl font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm text-ivory/85">{a.blurb}</p>
                  <p className="mt-3 flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-gold">
                    <span className="inline-flex items-center gap-1.5"><ImageIcon className="h-4 w-4" />{photos} photos</span>
                    {videos > 0 && <span className="inline-flex items-center gap-1.5"><Play className="h-4 w-4" />{videos} vidéos</span>}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
