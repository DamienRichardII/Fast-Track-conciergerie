import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Image de production si `src` fourni, sinon visuel de démonstration (dégradé) clairement étiqueté.
 * Aucune photo n'est inventée : les photographies réelles seront fournies par le client.
 */
export function Media({
  src, alt, className, tone = "sunset", priority, sizes = "100vw", label = true,
}: { label?: boolean; src?: string; alt: string; className?: string; tone?: "sunset" | "night" | "sea" | "warm"; priority?: boolean; sizes?: string }) {
  const tones = {
    sunset: "from-[#2a3b57] via-[#c98b6a] to-[#f2c890]",
    night: "from-[#14202b] via-[#3b2a20] to-[#8a5a2b]",
    sea: "from-[#12344a] via-[#2f7f93] to-[#d9c9a3]",
    warm: "from-[#3b2212] via-[#a87848] to-[#e8d7c3]",
  };
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className={cn("absolute inset-0 bg-gradient-to-br", tones[tone])}>
          {label && <span className="absolute right-3 top-2 rounded bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/80">
            Visuel démo
          </span>}
        </div>
      )}
    </div>
  );
}
