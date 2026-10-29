import { redirect } from "next/navigation";

/* Ancienne adresse de la rubrique, conservée pour les liens déjà partagés. */
export default function OldGroupPage() {
  redirect("/conciergerie-privee");
}
