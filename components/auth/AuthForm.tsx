"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { login, signup } from "@/server/auth/actions";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const isLogin = mode === "login";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      const res = isLogin
        ? await login({ email: f.get("email"), password: f.get("password") })
        : await signup({ name: f.get("name"), email: f.get("email"), password: f.get("password") });
      if (!res.ok) return setError(res.error);
      router.push(res.role === "admin" ? "/admin" : "/compte");
      router.refresh();
    });
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 flex justify-center"><Logo tone="dark" size="md" /></div>
      <div className="rounded-card bg-white p-6 shadow-soft md:p-8">
        <h1 className="mb-5 font-serif text-3xl font-bold">{isLogin ? "Connexion" : "Créer un compte"}</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && <Input name="name" label="Nom complet" autoComplete="name" required />}
          <Input name="email" label="Email" type="email" autoComplete="email" required />
          <Input name="password" label="Mot de passe" type="password" autoComplete={isLogin ? "current-password" : "new-password"} required minLength={isLogin ? undefined : 10} hint={isLogin ? undefined : "10 caractères minimum."} />
          <Button type="submit" className="w-full" disabled={pending}>{pending ? "Patientez…" : isLogin ? "Se connecter" : "Créer mon compte"}</Button>
          {error && <p role="alert" className="text-center text-sm font-medium text-red-700">{error}</p>}
        </form>
        <p className="mt-6 text-center text-sm text-ink/70">
          {isLogin ? <>Pas encore de compte ? <Link href="/inscription" className="font-semibold text-chocolate underline">S&apos;inscrire</Link></> : <>Déjà inscrit ? <Link href="/connexion" className="font-semibold text-chocolate underline">Se connecter</Link></>}
        </p>
      </div>
    </div>
  );
}
