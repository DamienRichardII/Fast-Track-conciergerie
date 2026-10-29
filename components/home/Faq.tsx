import { Reveal } from "@/components/ui/Reveal";

const faq = [
  { q: "Dans quelles villes pouvez-vous réserver ?", a: "Partout dans le monde : Paris, Dubaï, Marrakech, Londres, New York, Bangkok… Envoyez-nous la ville et l'hôtel qui vous intéresse, nous vous disons ce que nous pouvons faire." },
  { q: "Je n'ai pas trouvé d'hôtel, pouvez-vous m'en proposer un ?", a: "Oui. Donnez-nous la ville, vos dates et le nombre de voyageurs : nous vous trouvons un hôtel à prix réduit, 5 étoiles et plus, et dans toutes les catégories d'hôtels." },
  { q: "Qu'est-ce que je dois vous envoyer ?", a: "Le nom de l'hôtel ou le lien de l'annonce, vos dates, le nombre de voyageurs et le prix que vous avez trouvé." },
  { q: "Le prix annoncé comprend-il votre commission ?", a: "Oui : le prix que nous vous annonçons est le prix que vous payez, notre commission est déjà comprise." },
  { q: "Comment vais-je recevoir la réponse ?", a: "Par WhatsApp, Snapchat ou email, selon le canal que vous avez choisi pour nous écrire." },
  { q: "Suis-je engagé en faisant une demande ?", a: "Non. Rien n'est réservé sans votre accord." },
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
