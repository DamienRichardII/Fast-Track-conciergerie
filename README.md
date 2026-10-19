# Fast Track Conciergerie — Abidjan

Next.js 16 (App Router) · TypeScript strict · Tailwind 4 · Motion.

## État (Phases 1 à 4 — mode demande sur devis)
- Fait : design system (tokens, Button, Media, Logo, Header/Footer), accueil, 8 pages service (gabarit), build OK.
- Fait aussi : parcours de réservation (prestation → dates souhaitées → infos → récapitulatif → confirmation avec référence), calendrier, Destinations, À propos, Contact, pages légales provisoires (noindex), sitemap/robots.
- Les demandes sont enregistrées (JSON local en dev) et/ou envoyées par email (Resend). Sans stockage ni email configuré en production, le formulaire affiche une erreur au lieu d'une fausse confirmation.
- Le calendrier collecte des dates SOUHAITÉES ; aucune disponibilité n'est affichée tant que le back-office ne les configure pas.
- À faire : comptes (Supabase Auth), paiement (couche abstraite + acompte manuel), admin, emails, tests, déploiement.
- Visuels : placeholders « VISUEL DÉMO » — photos réelles à fournir.
- Logo : monogramme vectorisé V0 depuis la maquette (public/brand/monogram.svg) — à valider/remplacer par le fichier source.

## Lancer
npm install && npm run dev   # puis http://localhost:3000
npm run build

## Tests
npm test   # 16 tests Vitest (validation, calendrier, référence, stockage, anti-abus, email)

## Déploiement sur Vercel
1. `git remote add origin <url-du-dépôt>` puis `git push -u origin main`.
2. Vercel > Add New > Project > importer le dépôt (Next.js détecté).
3. Variables : `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO_EMAIL`.
Sans Resend ni base de données, les formulaires affichent un message d'indisponibilité (jamais de fausse confirmation).
Les écrans Espace client, Back-office, Connexion et Paiement sont des aperçus (données fictives, noindex).

## Photographies

Les visuels de `public/images/` sont des photos libres de droits provenant d'Unsplash (licence Unsplash), utilisées en attendant les photos du client. Les images de destinations en Côte d'Ivoire (Assinie, Îles Ehotilé, Yamoussoukro, Taï) sont illustratives et ne représentent pas forcément le lieu nommé : à remplacer par de vraies photos (déclarées dans `lib/photos.ts`).
