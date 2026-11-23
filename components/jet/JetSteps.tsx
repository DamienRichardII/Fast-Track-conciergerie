import { Reveal } from "@/components/ui/Reveal";
import { jetSteps } from "@/lib/jet";

/* Les 3 encadrés numérotés de la rubrique Jet privé. */
export function JetSteps() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {jetSteps.map((s, i) => (
        <li key={s.n}>
          <Reveal delay={i * 0.08} className="h-full rounded-xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <p className="font-serif text-2xl text-gold">{s.n}</p>
            <h3 className="mt-5 font-serif text-xl font-bold text-ivory">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/75">{s.text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
