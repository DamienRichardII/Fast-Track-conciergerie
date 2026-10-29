import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  /** "light" = logo ivoire (fond foncé/photo), "dark" = logo bronze (fond clair) */
  tone?: "light" | "dark";
  /** "stacked" = monogramme + signature, "mark" = monogramme seul */
  variant?: "stacked" | "mark";
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
};

const sizes = {
  sm: { mark: "h-9 w-8", title: "text-[0.62rem]", sub: "hidden" },
  md: { mark: "h-14 w-12", title: "text-sm", sub: "text-[0.5rem]" },
  lg: { mark: "h-32 w-28 md:h-40 md:w-36", title: "text-3xl md:text-5xl", sub: "text-xs md:text-sm" },
};

/* Monogramme : vectorisation V0 extraite de la maquette (à valider / remplacer par le fichier source). */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        WebkitMask: "url(/brand/monogram.svg) center / contain no-repeat",
        mask: "url(/brand/monogram.svg) center / contain no-repeat",
      }}
    />
  );
}

export function Logo({ tone = "dark", variant = "stacked", size = "md", href = "/", className }: Props) {
  const s = sizes[size];
  const color = tone === "light" ? "text-ivory" : "text-bronze";
  const inner = (
    <span className={cn("inline-flex flex-col items-center leading-none", color, className)}>
      <Monogram className={s.mark} />
      {variant === "stacked" && (
        <>
          <span className={cn("mt-2 font-serif tracking-[0.12em]", s.title)}>FAST TRACK</span>
          <span className={cn("mt-1 tracking-[0.35em]", s.sub)}>CONCIERGERIE</span>
        </>
      )}
      <span className="sr-only">Fast Track Conciergerie</span>
    </span>
  );
  return href ? <Link href={href} aria-label="Fast Track Conciergerie — Accueil">{inner}</Link> : inner;
}
