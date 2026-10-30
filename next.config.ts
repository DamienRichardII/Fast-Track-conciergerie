import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/shopping-montres-barber", destination: "/conciergerie-privee", permanent: true },
      { source: "/evenements", destination: "/conciergerie-privee", permanent: true },
      { source: "/activites-touristiques/:slug", destination: "/activites-touristiques", permanent: true },
    ];
  },
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
