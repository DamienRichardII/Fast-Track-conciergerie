import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { socials } from "@/lib/services";
import { site } from "@/lib/site";
import { SocialIcon } from "@/components/brand/SocialIcon";

/* Canaux affichés : Snapchat, WhatsApp, email (TikTok et Instagram retirés tant que les comptes n'existent pas). */
export function SocialLinks({ className = "" }: { className?: string }) {
  const snap = socials.find((s) => s.name === "Snapchat")?.href;
  const cls = "block opacity-90 transition hover:opacity-100";
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      <li><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={cls}><MessageCircle className="h-5 w-5" /></a></li>
      <li>
        {snap ? (
          <a href={snap} target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className={cls}><SocialIcon name="snapchat" className="h-5 w-5" /></a>
        ) : (
          <Link href="/contact" aria-label="Snapchat" className={cls}><SocialIcon name="snapchat" className="h-5 w-5" /></Link>
        )}
      </li>
      <li><a href={`mailto:${site.email}`} aria-label="Email" className={cls}><Mail className="h-5 w-5" /></a></li>
    </ul>
  );
}
