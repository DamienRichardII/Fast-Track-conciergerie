import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Fast Track Conciergerie — Abidjan", template: "%s | Fast Track Conciergerie" },
  description: "Conciergerie de luxe à Abidjan : jet privé, villas, hôtels, voitures, restaurants, activités, shopping et montres de luxe.",
  openGraph: { type: "website", locale: "fr_FR", siteName: "Fast Track Conciergerie" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:p-3">Aller au contenu</a>
        <Header />
        <main id="contenu" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
