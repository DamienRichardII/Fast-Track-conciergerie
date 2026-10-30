import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Inscription", robots: { index: false, follow: false } };

export default function Page() {
  return <section className="bg-ivory px-4 pb-20 pt-36"><AuthForm mode="signup" /></section>;
}
