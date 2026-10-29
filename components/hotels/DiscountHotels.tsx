import { MessageCircle, Mail, Ghost, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site, } from "@/lib/site";
import { socials } from "@/lib/services";

const steps = [
  { n: "01", title: "Envoyez-nous votre hôtel", text: "Le lien Booking (ou autre), le nom de l'hôtel, vos dates et le nombre de voyageurs." },
  { n: "02", title: "Nous cherchons le meilleur prix", text: "Notre équipe compare et vous répond avec une proposition, sans engagement." },
  { n: "03", title: "Vous validez, nous réservons", text: "Une fois d'accord, nous nous occupons de la réservation à votre place." },
];

const waText = encodeURIComponent("Bonjour Fast Track Conciergerie, j'ai trouvé un hôtel et je souhaite connaître votre meilleur prix : ");

/* Section « Hôtels à prix réduits » : sobre, sans tarifs inventés. Les canaux (WhatsApp, Snapchat, mail) sont présentés à égalité. */
export function DiscountHotels() {
  const snap = socials.find((s) => s.name === "Snapchat")?.href;
  const channels = [
    { label: "WhatsApp", href: `${site.whatsappHref}?text=${waText}`, icon: MessageCircle },
    { label: "Snapchat", href: snap || "/contact", icon: Ghost },
    { label: "Email", href: `mailto:${site.email}?subject=${encodeURIComponent("Hôtel à prix réduit")}`, icon: Mail },
  ];
  return (
    <section aria-labelledby="hotels-prix" className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
      <div className="relative overflow-hidden rounded-card bg-chocolate-deep px-6 py-14 text-ivory shadow-soft md:px-14 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Hôtels à prix réduits, partout dans le monde</p>
          <h2 id="hotels-prix" className="mt-4 font-serif text-3xl font-bold md:text-5xl">Le même hôtel, moins cher</h2>
          <p className="mt-5 text-ivory/75">Vous avez trouvé un hôtel sur Booking ou ailleurs ? Envoyez-le-nous. Vous gardez le même hôtel, la même chambre, les mêmes dates : nous cherchons un meilleur prix.</p>
          <p className="mt-3 text-ivory/75">Vous n&apos;avez pas encore trouvé d&apos;hôtel ? Dites-nous la ville et vos dates : nous vous en trouvons un à prix réduit, du 5 étoiles et plus à toutes les catégories d&apos;hôtels, partout dans le monde.</p>
        </Reveal>

        <ol id="comment-ca-marche" className="relative mt-12 grid scroll-mt-28 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08} className="h-full border-t border-gold/30 pt-5">
                <span className="font-serif text-3xl text-gold">{s.n}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-ivory/70">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="relative mt-12 text-center">
          <p className="text-sm text-ivory/70">Comment nous contacter : écrivez-nous là où vous êtes le plus à l&apos;aise.</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-chocolate-deep">
                  <c.icon className="h-4 w-4" />{c.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`${site.whatsappHref}?text=${waText}`} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-chocolate-deep transition hover:brightness-105">
            Demander mon prix <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
