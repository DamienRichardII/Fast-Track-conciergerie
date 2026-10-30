import { Reveal } from "@/components/ui/Reveal";

const faq = [
  { q: "Dans quelles villes pouvez-vous réserver ?", a: "Partout dans le monde. Les destinations présentées ici sont celles où nous réservons le plus souvent, mais vous pouvez nous en demander n'importe quelle autre." },
  { q: "Que dois-je vous indiquer ?", a: "Votre destination ou l'hôtel souhaité, vos dates, le nombre de voyageurs et, si vous le souhaitez, le niveau de confort attendu." },
  { q: "Le prix annoncé comprend-il votre commission ?", a: "Oui. Le prix que nous vous annonçons est le prix total que vous payez, sans frais ajoutés après coup." },
  { q: "Suis-je engagé en faisant une demande ?", a: "Non. La demande et la proposition sont gratuites. Rien n'est réservé tant que vous ne l'avez pas validé." },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-t" className="mx-auto max-w-3xl px-4 py-20 md:px-8">
      <Reveal><h2 id="faq-t" className="text-center font-serif text-3xl font-bold md:text-4xl">Questions fréquentes</h2></Reveal>
      <div className="mt-10 divide-y divide-champagne border-y border-champagne">
        {faq.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-chocolate [&::-webkit-details-marker]:hidden">
              {f.q}<span aria-hidden className="text-xl text-bronze transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-ink/75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
