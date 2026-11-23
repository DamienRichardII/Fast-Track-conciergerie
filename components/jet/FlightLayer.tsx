import { arc, planePath } from "@/lib/flights";

/* Calque SVG de trajets animés : trait pointillé qui défile + avion qui suit la courbe.
   L'animation s'arrête si l'utilisateur a réduit les animations (voir globals.css). */
export function FlightLayer({ routes, planes = true, idPrefix = "fl", scale = 1 }: { routes: readonly (readonly [string, string])[]; planes?: boolean; idPrefix?: string; scale?: number }) {
  return (
    <g aria-hidden>
      {routes.map(([a, b], i) => {
        const id = `${idPrefix}-${a}-${b}`;
        const d = arc(a, b);
        const dur = 7 + (i % 4) * 1.5;
        return (
          <g key={id}>
            <path id={id} d={d} fill="none" className="flight-trail stroke-gold/60" strokeWidth={1.1 * scale} strokeDasharray={`${3 * scale} ${5 * scale}`} strokeLinecap="round" />
            {planes && (
              <g className="flight-plane">
                <path d={planePath(scale)} className="fill-gold" stroke="#3b2212" strokeWidth={0.5}>
                  <animateMotion dur={`${dur}s`} begin={`-${(i * 1.7) % dur}s`} repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href={`#${id}`} />
                  </animateMotion>
                </path>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}
