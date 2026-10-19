import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/destinations", "/a-propos", "/contact", "/reserver", ...services.map((s) => s.path)];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
