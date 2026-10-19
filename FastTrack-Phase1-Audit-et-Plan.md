# FAST TRACK CONCIERGERIE — Phase 1 : Audit et plan technique

Date : 19/10/2026 — Statut : à valider avant implémentation (Phases 2 à 8)

## 1. État du projet existant

- Dossier connecté « Fast Track - Conciergerie » : **uniquement `Assets/` avec 16 PNG de maquettes** (00 à 15). Aucun code, aucun dépôt Git, aucun `CLAUDE.md`.
- Conséquence : projet à créer de zéro (pas de risque d'écrasement). Le code sera généré dans un dossier `fast-track-conciergerie/` à côté d'`Assets/`, sans toucher aux maquettes.

## 2. Analyse des maquettes (16 fichiers)

| # | Maquette | Contenu clé à reproduire |
|---|---|---|
| 00 | Logo | Monogramme FT serif, « FAST TRACK / CONCIERGERIE / ABIDJAN », bronze sur mur ivoire éclairé |
| 01 | Accueil | Header transparent (logo, 5 liens, TikTok/Snapchat/Instagram, bouton Réserver doré), hero villa + skyline, logo centré, 2 CTA, barre 8 icônes, grille 8 cartes, bannière « Une expérience sur mesure », CTA destinations |
| 02 | Jet privé | Hero, onglets Vol privé / groupe / sur mesure, 4 atouts, galerie 3 images, « Une liberté sans limites », CTA devis |
| 03 | Villas | Hero, 4 atouts (piscine, vue mer, personnel, sécurité 24/7), galerie 4 vignettes, CTA « Voir les villas » |
| 04 | Hôtels | Hero, formulaire (destination, dates, voyageurs, Rechercher), 4 atouts, 3 vignettes, CTA |
| 05 | Location voiture | Onglets SUV/Berline/4x4/Sportive/Van, 4 véhicules, 4 atouts, CTA |
| 06 | Restaurants | Formulaire (ville, date, personnes), 4 cartes restaurants, 4 atouts |
| 07 | Activités | 4 vignettes lieux, 4 atouts, CTA |
| 08 | Shopping Europe | Onglets Paris/Dubaï/Milan/Londres, 4 atouts, CTA « Demander un service » |
| 09 | Montres | Onglets marques, 4 atouts, CTA « Nous contacter » |
| 10 | Récap réservation | Stepper 5 étapes, carte service, sous-total/frais/total FCFA |
| 11 | Paiement | Carte bancaire VISA/MC, récap, bouton Payer |
| 12 | Confirmation | Coche, message, « Voir mes réservations » |
| 13 | Espace client | Sidebar (6 entrées), onglets À venir/Passées, liste avec badges de statut |
| 14 | Back-office | Sidebar sombre, 3 KPI, graphique barres 30 j, top services en % |
| 15 | Calendrier | Stepper 4 étapes, calendrier mensuel, créneaux horaires, bouton Continuer |

Tokens de design observés : fond ivoire, cartes blanches arrondies (~20–24 px), titres serif type Playfair/Cormorant, UI sans-serif type Inter/Manrope, boutons chocolat→bronze en dégradé, CTA header champagne doré, icônes ligne fine bronze/chocolat, back-office en navy/noir profond.

### Points d'attention détectés dans les maquettes

1. **Textes dégradés / fautes** (maquettes générées par IA) : « Abiljan », « Abdijan », « Kena », « Gastronomique » flou, libellés illisibles (« Destinations d'Abidjan » sur Jet privé, « Location courte ou longue durée »). Je corrige avec des libellés propres, à valider.
2. **Dates « Mai 2025 »** : dépassées. Le calendrier sera dynamique (mois courant).
3. **Chiffres fictifs** (128 réservations, 47 clients, 12 500 000 FCFA, 20 %/22 %…) : le back-office affichera uniquement des données réelles ; les démos seront étiquetées « Données de démonstration ».
4. **Marques et propriétés tierces** : sacs Chanel/Louis Vuitton, montres Patek/AP/Richard Mille, voitures Mercedes/BMW/Land Cruiser. Usage de marques à cadrer (nominatif factuel, pas de promesse d'authenticité ou de disponibilité non vérifiée).
5. **Tour Eiffel dans Activités touristiques et Hôtels** alors que la cible est Abidjan : à ajuster avec de vraies photos locales.
6. **Qualité des images** : visuels IA basse résolution, utilisables comme référence de composition, **pas comme médias de production**. Il faudra des photos libres de droits ou des photos réelles de l'équipe.
7. **Incohérence du stepper** : 5 étapes en 10, 4 en 15. Je retiens le parcours du cahier des charges (6 étapes, dont devis).
8. **Back-office** : sidebar navy ici vs ivoire/bronze ailleurs. Je conserve la distinction (outil interne sombre).
9. **Logo** : intégré à un mur photographié. Il faut l'extraire en PNG transparent puis proposer un SVG vectorisé fidèle, à faire valider (versions clair/foncé).

## 3. Stack retenue

- Next.js (App Router, dernière version stable), TypeScript strict, Tailwind, shadcn/Radix, Motion (animations UI), GSAP+ScrollTrigger (parallaxe éditoriale uniquement), Lenis (desktop seulement, désactivé si `prefers-reduced-motion`).
- **Auth : Auth.js** (credentials + email) avec Prisma adapter, sur la même Postgres. Un seul système, rôles gérés côté serveur. (Alternative : Supabase Auth.)
- PostgreSQL (Supabase) + Prisma ; stockage privé Supabase Storage (URLs signées).
- Emails : Resend + React Email. Erreurs : Sentry. Tests : Vitest + Playwright.
- Paiement : couche d'abstraction `PaymentProvider` (voir §6).
- Dépendances limitées (cf. guardrails DamCompany : simplicité, pas de dépendance superflue). TanStack Query seulement pour le back-office.

## 4. Routes (App Router, FR par défaut, préparé i18n `/en`)

Publiques : `/`, `/services`, `/services/jet-prive`, `/villas-de-luxe`, `/hotels`, `/location-de-voiture`, `/restaurants`, `/activites-touristiques`, `/shopping-europe`, `/montres-de-luxe`, `/destinations`, `/a-propos`, `/contact`, `/mentions-legales`, `/confidentialite`, `/cgv`.
Réservation : `/reserver?service=…` (étapes 1-4), `/reserver/recapitulatif`, `/reserver/paiement`, `/reserver/confirmation/[ref]`.
Compte : `/connexion`, `/inscription`, `/mot-de-passe-oublie`, `/compte` (+ `reservations`, `devis`, `paiements`, `factures`, `favoris`, `profil`, `notifications`).
Admin : `/admin` (+ `reservations`, `calendrier`, `clients`, `devis`, `paiements`, `prestations`, `destinations`, `disponibilites`, `utilisateurs`, `emails`, `parametres`, `journal`).
API : `/api/webhooks/payments`, `/api/health`, `sitemap.xml`, `robots.txt`.

## 5. Modèle de données (Prisma, résumé)

`User(role: CLIENT|STAFF|ADMIN|SUPERADMIN)`, `Account/Session`, `Destination`, `ServiceCategory` (8), `Offering` (prestation : mode DIRECT|QUOTE, prix, devise, actif), `OfferingMedia`, `OfferingOption`, `AvailabilityRule` + `AvailabilitySlot` (capacité, contrainte d'unicité anti double réservation), `Booking(ref, statut, total, devise)`, `BookingItem`, `QuoteRequest`, `Quote`, `Payment` (provider, providerRef unique = idempotence), `Refund`, `Invoice`, `Favorite`, `Notification`, `EmailLog` (clé d'idempotence unique), `AuditLog`, `Setting`, `WebhookEvent` (id fournisseur unique).

Anti double réservation : transaction + verrou/contrainte unique sur `(offeringId, slotStart)` + décrément de capacité atomique. Aucun créneau « disponible » sans règle configurée par l'admin.

## 6. Paiement — blocage métier identifié

Le cahier des charges prévoit Stripe « si disponible pour l'entité marchande ». Mes recherches (pages tierces uniquement, pas de confirmation officielle Stripe) indiquent que **la Côte d'Ivoire ne figure pas parmi les pays de domiciliation Stripe pris en charge en direct**, avec des contournements via une entité étrangère. Des agrégateurs régionaux (CinetPay, PayDunya, Wave, Orange Money, Flutterwave, etc.) sont les options habituelles pour accepter FCFA et mobile money. **À confirmer avec vous et à vérifier sur les sites officiels avant tout choix.**

Plan : interface `PaymentProvider` (create/capture/refund/verifyWebhook) + fournisseur « manuel/acompte sur devis » activable immédiatement, + adaptateur du prestataire choisi dès que le compte existe. Aucun paiement simulé en production ; mode test explicite uniquement.

## 7. Phasage et critères de réussite

| Phase | Livrable | Critère de réussite |
|---|---|---|
| 2 Design system | Tokens, polices, boutons, cards, formulaires, header/footer, logo | Page `/styleguide` conforme aux maquettes, build OK |
| 3 Pages publiques | 8 pages service + accueil, destinations, à propos, contact | Chaque page rendue desktop/mobile, formulaires validés Zod |
| 4 Réservation | Calendrier, disponibilités, devis, récap | Test : deux réservations simultanées → une seule acceptée |
| 5 Comptes/paiements | Auth, espace client, adaptateur paiement | Un client ne peut jamais lire la réservation d'un autre (test) |
| 6 Admin | Gestion réservations, devis, contenu, rôles | Un non-admin reçoit 403 ; CRUD prestation sans code |
| 7 Validation | Vitest + Playwright, responsive, a11y | Rapport de tests, Lighthouse, 0 erreur build |
| 8 Déploiement | `.env.example`, README, docs admin/Vercel | Déploiement preview Vercel fonctionnel |

Règles DamCompany appliquées : zéro régression, modifications ciblées, vérification mobile systématique, aucun contenu inventé présenté comme réel (données démo étiquetées), aucune fonctionnalité déclarée opérationnelle sans test.

## 8. Accès et décisions manquants

1. Prestataire de paiement et statut juridique de l'entité marchande (CI ? étrangère ?).
2. Projet Supabase (URL, clés) — sinon base Postgres locale pour le dev.
3. Clé Resend + domaine d'envoi ; nom de domaine du site.
4. Fichier logo source haute résolution (idéalement vectoriel) ; sinon extraction depuis la maquette 00.
5. Photos de production (libres de droits ou fournies) ; liste réelle des prestations, tarifs, partenaires.
6. Textes légaux (mentions, CGV, politique de confidentialité), réseaux sociaux (URLs TikTok/Snapchat/Instagram), email et téléphone de contact.
7. Politique d'annulation/remboursement et taux d'acompte.
8. Conformité données personnelles applicable (loi ivoirienne n° 2013-450 ; RGPD si clients européens) à valider par un juriste.

## 9. Intégrations restant à configurer (à date)

Paiement, Supabase, Resend, Sentry, Vercel, domaine, GitHub (compte DamienRichardII), clés d'API.
