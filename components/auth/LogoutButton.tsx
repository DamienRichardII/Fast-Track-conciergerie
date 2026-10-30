"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/server/auth/actions";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  return <button type="button" className={className} onClick={async () => { await logout(); router.push("/"); router.refresh(); }}>Se déconnecter</button>;
}
