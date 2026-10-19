export type LegalSection = { title: string; body: string[] };

/** Les champs entre crochets « [À compléter] » doivent être renseignés par l'exploitant avant publication. */
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pt-40">
      <h1 className="font-serif text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-ink/60">Dernière mise à jour : {updated}</p>
      <p role="note" className="mt-6 rounded-xl border border-bronze/40 bg-champagne/30 p-4 text-sm">
        Version provisoire : les mentions « [À compléter] » doivent être renseignées par l&apos;exploitant, et le texte validé par un conseil juridique avant mise en ligne définitive.
      </p>
      {sections.map((s) => (
        <section key={s.title} className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-chocolate">{s.title}</h2>
          {s.body.map((p, i) => <p key={i} className="mt-3 leading-relaxed text-ink/80">{p}</p>)}
        </section>
      ))}
    </article>
  );
}
