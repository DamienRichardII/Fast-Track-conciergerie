export function DemoBanner({ children = "Maquette de démonstration : données fictives, aucune action réelle." }: { children?: React.ReactNode }) {
  return (
    <p role="note" className="mb-6 rounded-xl border border-bronze/40 bg-champagne/40 px-4 py-3 text-center text-sm font-medium text-chocolate">
      {children}
    </p>
  );
}
