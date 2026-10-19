import { socials } from "@/lib/services";
import { SocialIcon } from "@/components/brand/SocialIcon";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {socials.map((s) => {
        const icon = <SocialIcon name={s.name.toLowerCase() as "tiktok" | "snapchat" | "instagram"} className="h-5 w-5" />;
        return (
          <li key={s.name}>
            {s.href ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="block opacity-90 transition hover:opacity-100">{icon}</a>
            ) : (
              <span aria-label={`${s.name} (lien à renseigner)`} className="block opacity-60">{icon}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
