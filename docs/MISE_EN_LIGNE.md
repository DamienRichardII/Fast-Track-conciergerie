# Fast Track Conciergerie — mise en ligne (checklist)

Projet Supabase : `zbjbvpzhzurscdnlzfdi` · Site : https://fasttrackconciergerie.vercel.app
Commandes pour **PowerShell** (une par ligne, pas de `&&`).

## 1. Base de données (Supabase)
1. SQL Editor → coller `supabase/01_schema.sql` → **Run**.
   (Si le projet contient d'anciennes tables du site : d'abord `supabase/00_reset.sql`. Il ne supprime que `users`, `requests`, `messages`, `experiences`.)
2. Project Settings → Database → **Reset database password** → copier le mot de passe.
3. Bouton **Connect** → onglet **Direct** → **Transaction pooler** (port 6543) → copier l'adresse
   et remplacer `[YOUR-PASSWORD]` (crochets compris) par le mot de passe.
   Ne pas utiliser « Direct connection » (ne marche pas depuis Vercel).

### 1b. Paiement SumUp
Exécuter `supabase/02_sumup.sql` dans le SQL Editor (ajoute les colonnes de paiement ; sans danger si relancé).
Fonctionnement : Admin → Demandes → ouvrir une demande → saisir le montant → copier le lien `/payer/<référence>` et l'envoyer au client
(ou il clique « Payer » dans `/compte`). Le statut « Payé » revient automatiquement via SumUp (la demande passe en « Confirmée »).
Devise : EUR (le franc CFA XOF n'est pas proposé par SumUp).

## 2. Test en local (facultatif)
```powershell
$env:DATABASE_URL="postgresql://postgres.zbjbvpzhzurscdnlzfdi:MOTDEPASSE@aws-0-REGION.pooler.supabase.com:6543/postgres"
npm install
npm run db:check
```
Attendu : « Connecté » + 4 tables (users, requests, messages, experiences) avec RLS activée.

## 3. Variables Vercel (Settings → Environment Variables → Production)
| Variable | Valeur |
|---|---|
| `DATABASE_URL` | adresse du Transaction pooler (étape 1.3) — cocher *Sensitive* |
| `SESSION_SECRET` | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | email de l'administrateur |
| `ADMIN_PASSWORD` | mot de passe admin (à retirer après la 1re connexion) |
| `CONTACT_TO_EMAIL` | `Fasttrackmax@outlook.com` |
| `NEXT_PUBLIC_SITE_URL` | URL finale du site (domaine propre quand il existe) |
| `SUMUP_API_KEY` | clé API **secrète** SumUp (cocher *Sensitive*) |
| `SUMUP_MERCHANT_CODE` | code marchand SumUp (ex. `MCXXXXXX`) |
| `RESEND_API_KEY`, `RESEND_FROM` | quand Resend est configuré (emails automatiques) |
| `NEXT_PUBLIC_SNAPCHAT_URL`, `NEXT_PUBLIC_TIKTOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` | liens des comptes du client |

Supprimer les variables obsolètes : `ADMIN_DISABLED`.

## 4. Pousser le code
```powershell
git status
git add .
git commit -m "Supabase"
git push
```
Puis Vercel → Deployments → **Redeploy** si une variable a été modifiée après le dernier déploiement.

## 5. Vérifications après déploiement
- [ ] `/connexion` : connexion avec `ADMIN_EMAIL` / `ADMIN_PASSWORD` → arrive sur `/admin`
- [ ] Retirer `ADMIN_PASSWORD` de Vercel
- [ ] `/contact` : envoyer un message → visible dans Admin → Messages
- [ ] `/reserver` : faire une demande → visible dans Admin → Demandes
- [ ] `/inscription` : créer un compte test → `/compte` affiche ses demandes
- [ ] Admin → Expériences : modifier un texte → visible sur `/activites-touristiques` sous 1 minute
- [ ] Un client connecté n'accède pas à `/admin`

## 6. Avant d'ouvrir au public
- [ ] Pages légales : remplacer les « [À compléter] » (mentions légales, CGV, confidentialité) puis retirer le `noindex`
- [ ] Emails automatiques (Resend + domaine vérifié)
- [ ] Domaine personnalisé + `NEXT_PUBLIC_SITE_URL`
- [ ] Photos : Night street food, Îles Éhotilé
- [ ] URL Snapchat / TikTok / Instagram
- [ ] Sauvegardes Supabase (selon le forfait)

## 7. Nettoyage
- Supprimer le projet Railway « Fast Track Conciergerie » (devenu inutile).
- Images inutilisées (~27 Mo) : `public/media/events`, `quad`, `bassam`… → `git rm -r` si non réutilisées.
