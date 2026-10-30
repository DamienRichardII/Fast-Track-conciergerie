import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "1", title: "Vous faites votre demande", text: "Par le formulaire, sur WhatsApp ou sur Snapchat. Pour un hôtel, indiquez votre destination ou l'hôtel souhaité, vos dates et le nombre de voyageurs." },
  { n: "2", title: "On vous envoie notre prix", text: "Nous vérifions les disponibilités et revenons vers vous avec une proposition et un tarif clair, par WhatsApp ou par email." },
  { n: "3", title: "Vous confirmez", text: "Rien n'est réservé sans votre accord. Une fois validé, nous nous occupons de tout." },
];

export function HowItWorks({ id = "comment-ca-marche", tone = "light", title = "Comment ça marche" }: { id?: string; tone?: "light" | "dark"; title?: string }) {
  const dark = tone === "dark";
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="mx-auto max-w-5xl scroll-mt-28 px-4 py-20 md:px-8">
      <Reveal className="text-center">
        <h2 id={`${id}-t`} className={`font-serif text-3xl font-bold md:text-5xl ${dark ? "text-ivory" : ""}`}>{title}</h2>
        <p className={`mt-3 text-sm ${dark ? "text-ivory/70" : "text-ink/70"}`}>Trois étapes, sans engagement.</p>
      </Reveal>
      <ol className="mt-12 grid gap-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 0.08} className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full btn-gradient font-serif text-lg text-ivory shadow-soft">{s.n}</span>
              <h3 className={`mt-4 font-serif text-xl font-bold ${dark ? "text-ivory" : ""}`}>{s.title}</h3>
              <p className={`mt-2 text-sm ${dark ? "text-ivory/70" : "text-ink/70"}`}>{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
