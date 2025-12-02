# 🔧 Clerk Production Configuration - Corrections Appliquées

## ✅ Résumé des corrections

Toute la configuration Clerk a été mise à jour pour fonctionner correctement en production avec Google OAuth.

---

## 📝 Fichiers modifiés

### 1. **`src/pages/_app.tsx`**

#### ✅ Corrections :
- ✅ Changé l'import de `@clerk/clerk-react` → `@clerk/nextjs`
- ✅ Ajout des variables d'environnement pour toutes les URLs Clerk
- ✅ Ajout du spread `{...pageProps}` pour passer les props correctement

```typescript
// AVANT
import { ClerkProvider } from "@clerk/clerk-react";

// APRÈS
import { ClerkProvider } from "@clerk/nextjs";
```

```typescript
// AVANT
<ClerkProvider
  publishableKey={clerkPublishableKey}
  signInUrl="/sign-in"
  signUpUrl="/sign-up"
  afterSignInUrl="/dashboard"
  afterSignUpUrl="/dashboard"
>

// APRÈS
<ClerkProvider
  publishableKey={clerkPublishableKey}
  signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
  signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up"}
  afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/dashboard"}
  afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/dashboard"}
  {...pageProps}
>
```

---

### 2. **`src/pages/sign-in/[[...sign-in]].tsx`**

#### ✅ Corrections :
- ✅ Changé l'import de `@clerk/clerk-react` → `@clerk/nextjs`
- ✅ Retiré `"use client"` (pas nécessaire avec Pages Router)
- ✅ Retiré `getServerSideProps` vide
- ✅ Ajout des props `routing`, `path`, `redirectUrl`, etc.

```typescript
// AVANT
"use client";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
      <SignIn />
    </div>
  );
}
export const getServerSideProps = () => ({ props: {} });

// APRÈS
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
      <SignIn 
        routing="path" 
        path="/sign-in"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
```

---

### 3. **`src/pages/sign-up/[[...sign-up]].tsx`**

#### ✅ Corrections :
- ✅ Changé l'import de `@clerk/clerk-react` → `@clerk/nextjs`
- ✅ Retiré `"use client"` (pas nécessaire avec Pages Router)
- ✅ Retiré `getServerSideProps` vide
- ✅ Ajout des props `routing`, `path`, `redirectUrl`, etc.

```typescript
// APRÈS
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
      <SignUp 
        routing="path" 
        path="/sign-up"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}
```

---

### 4. **`src/pages/sso-callback.tsx`** ✨ NOUVEAU

#### ✅ Créé une page dédiée pour gérer le callback OAuth :

```typescript
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SSOCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after successful OAuth
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
      <div className="text-center">
        <AuthenticateWithRedirectCallback />
        <div className="mt-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white mt-4">Connexion en cours...</p>
        </div>
      </div>
    </div>
  );
}
```

---

### 5. **`src/middleware.ts`**

#### ✅ Corrections :
- ✅ Ajout de `/sso-callback(.*)` aux routes publiques
- ✅ Amélioration du `matcher` config pour mieux gérer les fichiers statiques
- ✅ Ajout de `(.*)` pour capturer toutes les sous-routes de sign-in/sign-up

```typescript
// AVANT
const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing",
  "/about",
  "/api/webhooks/(.*)",
  "/sign-in",
  "/sign-up",
]);

// APRÈS
const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing",
  "/about",
  "/api/webhooks/(.*)",
  "/sign-in(.*)",      // ✅ Capture toutes les sous-routes
  "/sign-up(.*)",      // ✅ Capture toutes les sous-routes
  "/sso-callback(.*)", // ✅ NOUVEAU - pour OAuth
]);
```

```typescript
// AVANT
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// APRÈS
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

---

### 6. **Tous les composants et pages utilisant Clerk**

#### ✅ Corrections :
Changé tous les imports de `@clerk/clerk-react` → `@clerk/nextjs` dans :

- ✅ `src/components/Navbar.tsx`
- ✅ `src/components/DubbingForm.tsx`
- ✅ `src/pages/dashboard/index.tsx`
- ✅ `src/pages/credits.tsx`
- ✅ `src/pages/history/index.tsx`
- ✅ `src/pages/create-dub.tsx`

```typescript
// AVANT
import { useUser, UserButton, RedirectToSignIn } from '@clerk/clerk-react';

// APRÈS
import { useUser, UserButton, RedirectToSignIn } from '@clerk/nextjs';
```

---

## 🆕 Nouveaux fichiers créés

### 1. **`CLERK_ENV_CONFIG.md`**
- Guide complet de configuration des variables d'environnement
- Instructions pour obtenir les clés Clerk
- Configuration du domaine custom
- Configuration de Google OAuth
- Checklist de vérification
- Guide de dépannage

### 2. **`src/pages/sso-callback.tsx`**
- Page dédiée pour gérer les callbacks OAuth (Google, etc.)
- Redirection automatique vers `/dashboard` après authentification
- UI de chargement pendant le processus

---

## 🔑 Variables d'environnement requises

Ajoutez ces variables dans `.env.local` (local) et dans Vercel (production) :

```bash
# ==========================================
# 🔐 CLERK AUTHENTICATION
# ==========================================

# Clés Clerk (obligatoires)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Domaine custom (optionnel mais recommandé)
NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.aurisvoice.com

# ==========================================
# 🔗 CLERK ROUTES (optionnel - avec fallback)
# ==========================================

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## 🚀 Configuration dans Clerk Dashboard

### 1. **API Keys**
- Allez dans [Clerk Dashboard](https://dashboard.clerk.com) → API Keys
- Copiez `Publishable key` → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Copiez `Secret key` → `CLERK_SECRET_KEY`
- ⚠️ Pour la production : utilisez `pk_live_` et `sk_live_` (pas `pk_test_`)

### 2. **Paths**
Configurez les chemins dans Clerk Dashboard → Paths :
- Sign-in path : `/sign-in`
- Sign-up path : `/sign-up`
- Home URL : `https://aurisvoice.com`
- After sign-in URL : `/dashboard`
- After sign-up URL : `/dashboard`

### 3. **Domains**
Ajoutez vos domaines autorisés dans Clerk Dashboard → Domains :
- `https://aurisvoice.com`
- `https://www.aurisvoice.com`
- `http://localhost:3000` (développement)

### 4. **Social Connections (Google OAuth)**
Activez Google OAuth dans Clerk Dashboard → User & Authentication → Social Connections :
- Cliquez sur "Enable" pour Google
- Deux options :
  - **Option 1** (recommandé) : Utiliser les credentials Clerk par défaut
  - **Option 2** : Utiliser vos propres credentials OAuth Google
    1. Créez un projet sur [Google Cloud Console](https://console.cloud.google.com)
    2. Activez Google+ API
    3. Créez des credentials OAuth 2.0
    4. Ajoutez les URIs autorisées :
       - `https://aurisvoice.com`
       - `https://clerk.aurisvoice.com` (si domaine custom)
       - `https://accounts.clerk.com/v1/oauth_callback`

### 5. **Custom Domain (optionnel mais recommandé)**
Configurez un domaine custom dans Clerk Dashboard → Paths → Custom Domain :
- Ajoutez `clerk.aurisvoice.com`
- Configurez le DNS CNAME comme indiqué
- Ajoutez la variable : `NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.aurisvoice.com`

---

## 🧪 Tests à effectuer

### En local :
```bash
# 1. Créez .env.local avec toutes les variables
# 2. Installez les dépendances si nécessaire
npm install

# 3. Redémarrez le serveur
npm run dev

# 4. Testez :
# - Allez sur http://localhost:3000/sign-in
# - Cliquez sur "Continue with Google"
# - Vérifiez la connexion
# - Vérifiez la redirection vers /dashboard
# - Vérifiez que le UserButton s'affiche dans la navbar
```

### En production :
```bash
# 1. Configurez toutes les variables dans Vercel
# 2. Déployez
git push

# 3. Testez :
# - Allez sur https://aurisvoice.com/sign-in
# - Testez la connexion avec Google
# - Vérifiez la redirection vers /dashboard
# - Vérifiez que toutes les pages protégées fonctionnent
```

---

## ✅ Checklist de vérification

### Configuration
- [x] `@clerk/nextjs` utilisé partout (au lieu de `@clerk/clerk-react`)
- [x] `ClerkProvider` correctement configuré dans `_app.tsx`
- [x] Variables d'environnement définies pour toutes les URLs
- [x] Middleware mis à jour avec `/sso-callback` en route publique
- [x] Page `/sso-callback` créée pour OAuth

### Clerk Dashboard
- [ ] Clés API copiées (pk_live_ et sk_live_)
- [ ] Paths configurés (`/sign-in`, `/sign-up`, `/dashboard`)
- [ ] Domaines autorisés ajoutés
- [ ] Google OAuth activé
- [ ] (Optionnel) Domaine custom configuré

### Variables d'environnement
- [ ] `.env.local` créé avec toutes les variables (local)
- [ ] Variables ajoutées dans Vercel (production)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` définie
- [ ] `CLERK_SECRET_KEY` définie
- [ ] (Optionnel) `NEXT_PUBLIC_CLERK_FRONTEND_API` définie

### Tests
- [ ] Connexion avec Google fonctionne en local
- [ ] Redirection vers `/dashboard` fonctionne
- [ ] Pages protégées accessibles après connexion
- [ ] Déconnexion fonctionne
- [ ] Connexion avec Google fonctionne en production

---

## 🐛 Dépannage

### Erreur "Invalid publishable key"
- Vérifiez que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` est définie
- Pour la production, utilisez `pk_live_` (pas `pk_test_`)
- Redémarrez le serveur après changement de variables

### Erreur "Redirect URI mismatch" avec Google OAuth
- Vérifiez les URLs autorisées dans Google Cloud Console
- Ajoutez `https://accounts.clerk.com/v1/oauth_callback`
- Vérifiez que votre domaine est configuré dans Clerk Dashboard

### La redirection après login ne fonctionne pas
- Vérifiez `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- Vérifiez que `/dashboard` est protégée par le middleware
- Consultez les logs du navigateur pour les erreurs

### "Cannot read properties of undefined" avec Clerk
- Vérifiez que `ClerkProvider` enveloppe toute l'application
- Vérifiez que vous utilisez `@clerk/nextjs` (pas `@clerk/clerk-react`)
- Vérifiez que le middleware est bien configuré

### OAuth callback ne fonctionne pas
- Vérifiez que `/sso-callback` est dans les routes publiques du middleware
- Vérifiez que la page `/sso-callback.tsx` existe
- Consultez les logs Clerk Dashboard pour plus de détails

---

## 📚 Ressources

- [Documentation Clerk](https://clerk.com/docs)
- [Clerk + Next.js Pages Router](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Discord](https://clerk.com/discord)
- [Google OAuth Setup](https://clerk.com/docs/authentication/social-connections/google)

---

## 🎉 Résultat final

Après ces corrections, votre application est maintenant :

✅ Configurée correctement pour la production  
✅ Compatible avec Google OAuth  
✅ Utilise les bonnes dépendances (`@clerk/nextjs`)  
✅ Possède toutes les routes nécessaires (`/sign-in`, `/sign-up`, `/sso-callback`)  
✅ Possède un middleware correctement configuré  
✅ Possède des variables d'environnement bien organisées  

---

**Date de mise à jour** : 2 décembre 2024  
**Version Clerk** : @clerk/nextjs (dernière version)  
**Framework** : Next.js Pages Router

