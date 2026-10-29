import { Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { socials } from "@/lib/services";
import { site } from "@/lib/site";

/* « Comment nous contacter » : trois canaux à égalité (WhatsApp, Snapchat, email). Pas de compte Instagram/TikTok pour l'instant. */
export function ContactChannels() {
  const snap = socials.find((s) => s.name === "Snapchat")?.href;
  const channels = [
    { title: "WhatsApp", text: site.phone, cta: "Écrire sur WhatsApp", href: site.whatsappHref, icon: <MessageCircle className="h-6 w-6" />, ext: true },
    { title: "Snapchat", text: "Ajoutez Fast Track Conciergerie", cta: "Nous ajouter", href: snap || "/contact", icon: <SocialIcon name="snapchat" className="h-6 w-6" />, ext: !!snap },
    { title: "Email", text: site.email, cta: "Envoyer un email", href: `mailto:${site.email}`, icon: <Mail className="h-6 w-6" />, ext: false },
  ];
  return (
    <section aria-labelledby="contact-t" className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
      <Reveal className="text-center">
        <h2 id="contact-t" className="font-serif text-3xl font-bold md:text-5xl">Comment nous contacter</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink/70">Écrivez-nous là où vous êtes le plus à l&apos;aise : nous vous répondons avec une proposition claire.</p>
      </Reveal>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {channels.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 0.08} className="h-full">
              <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col items-center rounded-card border border-champagne bg-white p-7 text-center shadow-soft transition hover:-translate-y-1 hover:border-bronze/50">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-champagne/50 text-bronze">{c.icon}</span>
                <h3 className="mt-4 font-serif text-xl font-bold">{c.title}</h3>
                <p className="mt-1 break-all text-sm text-ink/70">{c.text}</p>
                <span className="mt-4 text-sm font-semibold text-bronze group-hover:underline">{c.cta} →</span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
