import type { MetadataRoute } from "next";
import { services, sharedGroup } from "@/lib/services";
import { activities } from "@/lib/gallery";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/destinations", "/evenements", "/a-propos", "/contact", "/reserver", ...services.map((s) => s.path), sharedGroup.path, ...activities.map((a) => `/activites-touristiques/${a.slug}`)];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
