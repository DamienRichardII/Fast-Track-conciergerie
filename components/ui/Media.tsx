import Image from "next/image";
import { cn } from "@/lib/utils";
import { photos, type PhotoKey } from "@/lib/photos";

/**
 * Image de production si `src` fourni, sinon fond dégradé provisoire.
 * Aucune photo n'est inventée : les photographies réelles seront fournies par le client.
 */
export function Media({
  photo, src, alt, className, tone = "sunset", priority, sizes = "100vw",
}: { photo?: PhotoKey; src?: string; alt: string; className?: string; tone?: "sunset" | "night" | "sea" | "warm"; priority?: boolean; sizes?: string }) {
  const tones = {
    sunset: "from-[#2a3b57] via-[#c98b6a] to-[#f2c890]",
    night: "from-[#14202b] via-[#3b2a20] to-[#8a5a2b]",
    sea: "from-[#12344a] via-[#2f7f93] to-[#d9c9a3]",
    warm: "from-[#3b2212] via-[#a87848] to-[#e8d7c3]",
  };
  const p = photo ? photos[photo] : undefined;
  const url = p?.src ?? src;
  const pos = p && "pos" in p ? p.pos : undefined;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {url ? (
        <Image src={url} alt={alt || p?.alt || ""} fill priority={priority} sizes={sizes} className="object-cover" style={pos ? { objectPosition: pos } : undefined} />
      ) : (
        <div role="img" aria-label={alt} className={cn("absolute inset-0 bg-gradient-to-br", tones[tone])} />
      )}
    </div>
  );
}
