# 🔐 Clerk Configuration - README

## 🎯 Statut : Production Ready ✅

Toute la configuration Clerk a été corrigée et est maintenant prête pour la production avec Google OAuth.

---

## 📖 Documentation disponible

| 📄 Fichier | 🎯 Objectif | 👤 Pour qui ? |
|-----------|------------|--------------|
| **`CLERK_FIX_SUMMARY.md`** | Résumé rapide des corrections | Tous |
| **`QUICK_START_CLERK.md`** | Guide de démarrage en 3 étapes | Développeurs |
| **`VERCEL_ENV_VARS.md`** | Variables Vercel (liste rapide) | DevOps |
| **`CLERK_ENV_CONFIG.md`** | Guide complet des variables | Développeurs |
| **`CLERK_PRODUCTION_FIX.md`** | Documentation technique détaillée | Développeurs avancés |

---

## 🚀 Démarrage rapide (3 minutes)

### Étape 1 : Variables d'environnement

Créez `.env.local` à la racine du projet :

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_BACKEND_URL=https://api.aurisvoice.com
```

### Étape 2 : Clerk Dashboard

1. Allez sur [dashboard.clerk.com](https://dashboard.clerk.com)
2. Copiez vos clés `pk_live_` et `sk_live_` depuis **API Keys**
3. Configurez les **Paths** : `/sign-in`, `/sign-up`, `/dashboard`
4. Ajoutez vos **Domains** : `https://aurisvoice.com`
5. Activez **Google** dans Social Connections

### Étape 3 : Test

```bash
npm run dev
```

Allez sur `http://localhost:3000/sign-in` et testez la connexion avec Google.

---

## ✅ Ce qui a été corrigé

✅ Tous les imports utilisent maintenant `@clerk/nextjs` (11 fichiers)  
✅ Page `/sso-callback` créée pour OAuth  
✅ Middleware mis à jour avec `/sso-callback` en route publique  
✅ `ClerkProvider` configuré avec variables d'environnement  
✅ Routes sign-in/sign-up améliorées  
✅ Documentation complète créée  

---

## 📁 Structure du code

```
src/
├── pages/
│   ├── _app.tsx                  ✅ ClerkProvider avec @clerk/nextjs
│   ├── sign-in/
│   │   └── [[...sign-in]].tsx   ✅ Import @clerk/nextjs
│   ├── sign-up/
│   │   └── [[...sign-up]].tsx   ✅ Import @clerk/nextjs
│   ├── sso-callback.tsx         ✨ NOUVEAU - OAuth callback
│   ├── dashboard/
│   │   └── index.tsx            ✅ Import @clerk/nextjs
│   ├── credits.tsx              ✅ Import @clerk/nextjs
│   ├── history/
│   │   └── index.tsx            ✅ Import @clerk/nextjs
│   └── create-dub.tsx           ✅ Import @clerk/nextjs
├── components/
│   ├── Navbar.tsx               ✅ Import @clerk/nextjs
│   └── DubbingForm.tsx          ✅ Import @clerk/nextjs
└── middleware.ts                ✅ /sso-callback ajouté
```

---

## 🔑 Variables d'environnement requises

### Obligatoires

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
```

### Optionnelles (avec fallback)

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Domaine custom (optionnel)

```bash
NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.aurisvoice.com
```

---

## 🧪 Tests à effectuer

### ✅ En local

1. `npm run dev`
2. Allez sur `http://localhost:3000/sign-in`
3. Cliquez sur "Continue with Google"
4. Vérifiez la connexion
5. Vérifiez la redirection vers `/dashboard`
6. Vérifiez que le `UserButton` s'affiche
7. Testez la déconnexion

### ✅ En production

1. Configurez les variables dans Vercel
2. Déployez : `git push`
3. Allez sur `https://aurisvoice.com/sign-in`
4. Répétez les tests ci-dessus

---

## 🆘 Dépannage rapide

| ❌ Problème | ✅ Solution |
|------------|----------|
| "Invalid publishable key" | Vérifiez que vous utilisez `pk_live_` (pas `pk_test_`) |
| "Redirect URI mismatch" | Ajoutez `https://accounts.clerk.com/v1/oauth_callback` dans Google Cloud Console |
| Redirection ne fonctionne pas | Vérifiez `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` |
| OAuth callback ne fonctionne pas | Vérifiez que `/sso-callback` est dans les routes publiques du middleware |

Pour plus de détails → `CLERK_ENV_CONFIG.md` (section Dépannage)

---

## 📞 Besoin d'aide ?

### Documentation locale
- **Démarrage rapide** → `QUICK_START_CLERK.md`
- **Variables Vercel** → `VERCEL_ENV_VARS.md`
- **Configuration complète** → `CLERK_ENV_CONFIG.md`
- **Détails techniques** → `CLERK_PRODUCTION_FIX.md`
- **Résumé des corrections** → `CLERK_FIX_SUMMARY.md`

### Documentation externe
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Next.js Pages Router](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Discord](https://clerk.com/discord)

---

## ✅ Checklist finale

### Configuration
- [ ] `.env.local` créé avec toutes les variables
- [ ] Clés Clerk copiées (pk_live_ et sk_live_)
- [ ] Paths configurés dans Clerk Dashboard
- [ ] Domaines ajoutés dans Clerk Dashboard
- [ ] Google OAuth activé dans Clerk

### Vercel (Production)
- [ ] Variables ajoutées dans Environment Variables
- [ ] Application redéployée
- [ ] Test de connexion Google effectué

### Tests
- [ ] Connexion avec Google fonctionne en local
- [ ] Redirection vers `/dashboard` fonctionne
- [ ] Déconnexion fonctionne
- [ ] Connexion avec Google fonctionne en production

---

## 🎉 Félicitations !

Votre application AurisVoice est maintenant correctement configurée pour utiliser Clerk en production avec Google OAuth.

**Date de mise à jour** : 2 décembre 2024  
**Version** : @clerk/nextjs (latest)  
**Statut** : ✅ Production Ready

