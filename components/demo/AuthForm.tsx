"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { DemoBanner } from "./DemoBanner";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [sent, setSent] = useState(false);
  const login = mode === "login";
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 flex justify-center"><Logo tone="dark" size="md" /></div>
      <div className="rounded-card bg-white p-6 shadow-soft md:p-8">
        <h1 className="font-serif text-3xl font-bold">{login ? "Connexion" : "Créer un compte"}</h1>
        <DemoBanner>Démonstration : l&apos;authentification sera activée lors de la phase suivante.</DemoBanner>
        <form noValidate onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          {!login && <Input label="Nom complet" autoComplete="name" />}
          <Input label="Email" type="email" autoComplete="email" />
          <Input label="Mot de passe" type="password" autoComplete={login ? "current-password" : "new-password"} />
          <Button type="submit" className="w-full">{login ? "Se connecter" : "Créer mon compte"}</Button>
          {sent && <p role="status" className="text-center text-sm text-chocolate">Aperçu uniquement : rien n&apos;a été envoyé. <Link href="/compte" className="underline">Voir l&apos;espace client (démo)</Link></p>}
        </form>
        <p className="mt-6 text-center text-sm text-ink/70">
          {login ? <>Pas encore de compte ? <Link href="/inscription" className="font-semibold text-chocolate underline">S&apos;inscrire</Link></> : <>Déjà inscrit ? <Link href="/connexion" className="font-semibold text-chocolate underline">Se connecter</Link></>}
        </p>
      </div>
    </div>
  );
}
