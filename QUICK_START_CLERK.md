# ⚡ Quick Start - Clerk Production Setup

## 🎯 Ce qui a été corrigé

✅ **Tous les fichiers utilisent maintenant `@clerk/nextjs`** (au lieu de `@clerk/clerk-react`)  
✅ **Page `/sso-callback` créée** pour gérer les callbacks OAuth (Google, etc.)  
✅ **Middleware mis à jour** pour inclure `/sso-callback` dans les routes publiques  
✅ **ClerkProvider correctement configuré** avec variables d'environnement  
✅ **Routes sign-in/sign-up améliorées** avec props correctes  

---

## 🚀 Étapes suivantes (3 étapes rapides)

### 1️⃣ Configurer les variables d'environnement

**En local** - Créez `.env.local` à la racine :

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_BACKEND_URL=https://api.aurisvoice.com
```

**En production** - Ajoutez ces variables dans Vercel :
- Allez dans Settings → Environment Variables
- Ajoutez les mêmes variables
- Voir `VERCEL_ENV_VARS.md` pour la liste complète

### 2️⃣ Configurer Clerk Dashboard

1. Allez sur [dashboard.clerk.com](https://dashboard.clerk.com)
2. **API Keys** → Copiez vos clés `pk_live_` et `sk_live_`
3. **Paths** → Configurez :
   - Sign-in path: `/sign-in`
   - Sign-up path: `/sign-up`
   - After sign-in URL: `/dashboard`
4. **Domains** → Ajoutez `https://aurisvoice.com`
5. **Social Connections** → Activez "Google"

### 3️⃣ Tester

```bash
# Local
npm run dev
# Allez sur http://localhost:3000/sign-in
# Testez la connexion avec Google

# Production
git push
# Allez sur https://aurisvoice.com/sign-in
# Testez la connexion avec Google
```

---

## 📁 Fichiers modifiés

### Modifiés ✏️
- `src/pages/_app.tsx` - ClerkProvider avec @clerk/nextjs
- `src/pages/sign-in/[[...sign-in]].tsx` - Import @clerk/nextjs
- `src/pages/sign-up/[[...sign-up]].tsx` - Import @clerk/nextjs
- `src/middleware.ts` - Ajout /sso-callback
- `src/components/Navbar.tsx` - Import @clerk/nextjs
- `src/components/DubbingForm.tsx` - Import @clerk/nextjs
- `src/pages/dashboard/index.tsx` - Import @clerk/nextjs
- `src/pages/credits.tsx` - Import @clerk/nextjs
- `src/pages/history/index.tsx` - Import @clerk/nextjs
- `src/pages/create-dub.tsx` - Import @clerk/nextjs

### Créés ✨
- `src/pages/sso-callback.tsx` - Callback OAuth
- `CLERK_ENV_CONFIG.md` - Guide complet des variables env
- `CLERK_PRODUCTION_FIX.md` - Documentation complète des corrections
- `VERCEL_ENV_VARS.md` - Guide rapide Vercel
- `QUICK_START_CLERK.md` - Ce fichier

---

## ✅ Checklist finale

- [ ] Variables d'environnement ajoutées (local + Vercel)
- [ ] Clés Clerk copiées (`pk_live_` et `sk_live_`)
- [ ] Paths configurés dans Clerk Dashboard
- [ ] Domaines ajoutés dans Clerk Dashboard
- [ ] Google OAuth activé dans Clerk
- [ ] Test de connexion local ✓
- [ ] Test de connexion production ✓

---

## 📚 Documentation complète

- **`CLERK_ENV_CONFIG.md`** - Configuration détaillée des variables
- **`CLERK_PRODUCTION_FIX.md`** - Documentation technique complète
- **`VERCEL_ENV_VARS.md`** - Guide spécifique Vercel

---

## 🆘 Besoin d'aide ?

- **Erreur "Invalid publishable key"** → Vérifiez que vous utilisez `pk_live_` (pas `pk_test_`)
- **Erreur "Redirect URI mismatch"** → Ajoutez `https://accounts.clerk.com/v1/oauth_callback` dans Google Cloud Console
- **Callback OAuth ne fonctionne pas** → Vérifiez que `/sso-callback` est dans les routes publiques du middleware

---

**🎉 Vous êtes prêt !** Votre configuration Clerk est maintenant correcte pour la production avec Google OAuth.

