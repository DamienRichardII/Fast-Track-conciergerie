import type { Metadata } from "next";
import { ClientArea } from "@/components/demo/ClientArea";

export const metadata: Metadata = { title: "Espace client", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 font-serif text-4xl font-bold">Espace client</h1>
        <ClientArea />
      </div>
    </section>
  );
}
