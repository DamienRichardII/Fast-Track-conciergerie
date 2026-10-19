import { socialPaths } from "./social-paths";

export function SocialIcon({ name, className }: { name: "tiktok" | "snapchat" | "instagram"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d={socialPaths[name]} />
    </svg>
  );
}
