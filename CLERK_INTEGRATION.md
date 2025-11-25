# 🔐 Intégration Clerk Authentication - Complète

## ✅ Fichiers créés/modifiés

### Nouveaux fichiers
- `src/middleware.ts` - Middleware Clerk pour protection des routes
- `src/pages/sign-in/[[...sign-in]].tsx` - Page de connexion
- `src/pages/sign-up/[[...sign-up]].tsx` - Page d'inscription
- `src/pages/sign-in/loading.tsx` - Loading state pour sign-in
- `src/pages/sign-up/loading.tsx` - Loading state pour sign-up
- `src/pages/create-dub.tsx` - Page protégée pour créer un doublage
- `.env.local.example` - Template pour variables d'environnement Clerk

### Fichiers modifiés
- `src/pages/_app.tsx` - Wrapper avec ClerkProvider
- `src/components/Navbar.tsx` - Ajout de UserButton et bouton connexion
- `src/pages/dashboard/index.tsx` - Protection avec Clerk + userId dans API
- `src/pages/history/index.tsx` - Protection avec Clerk + userId dans API
- `src/pages/credits.tsx` - Protection avec Clerk + userId dans API
- `src/components/DubbingForm.tsx` - Utilisation de userId Clerk
- `src/lib/api.ts` - Ajout de getUserId() et header x-user-id
- `src/lib/credits.ts` - Ajout de header x-user-id pour getCredits() et checkout
- `src/lib/useDubbingHistory.ts` - Utilisation de userId Clerk

## 🔧 Configuration requise

### Variables d'environnement

Créez `.env.local` à la racine du projet :

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Backend URL (existing)
NEXT_PUBLIC_BACKEND_URL=http://localhost:10000
```

**Pour obtenir vos clés Clerk :**
1. Créez un compte sur https://clerk.com
2. Créez une nouvelle application
3. Copiez les clés depuis le dashboard Clerk

## 📋 Routes protégées

Les routes suivantes nécessitent maintenant une authentification :
- `/dashboard` - Tableau de bord
- `/history` - Historique des doublages
- `/credits` - Gestion des crédits
- `/create-dub` - Création de doublage

## 🌐 Routes publiques

Les routes suivantes restent accessibles sans authentification :
- `/` - Page d'accueil
- `/about` - À propos
- `/sign-in` - Connexion
- `/sign-up` - Inscription

## 🔄 Intégration avec le backend

### Headers automatiques

Tous les appels API incluent maintenant automatiquement le header `x-user-id` avec l'ID Clerk de l'utilisateur :

```typescript
// Exemple dans api.ts
const userId = getUserId(); // Récupère depuis window.__clerkUserId
if (userId) {
  headers['x-user-id'] = userId;
}
```

### Pages qui envoient userId

- ✅ `/api/dub` - Génération de doublage
- ✅ `/api/credits` - Récupération des crédits
- ✅ `/api/stripe/checkout` - Création de session Stripe
- ✅ `/api/dubbing/history` - Historique des doublages
- ✅ `/api/projects` - Liste des projets

## 🎨 Interface utilisateur

### Navbar

- **Si connecté** : Affiche `<UserButton />` avec menu déroulant
- **Si non connecté** : Affiche bouton "Connexion" qui redirige vers `/sign-in`

### Pages d'authentification

- Design cohérent avec le thème de l'application
- Loading states avec spinner
- Redirection automatique après connexion

## 🔒 Protection des pages

Toutes les pages protégées utilisent le pattern suivant :

```typescript
const { isSignedIn, isLoaded, user } = useUser();

if (!isLoaded) {
  return <LoadingState />;
}

if (!isSignedIn) {
  return <RedirectToSignIn />;
}

// Page content...
```

## 📝 Notes importantes

1. **Compatibility** : Le système fonctionne avec ou sans authentification (fallback sur 'anonymous' si pas de userId)
2. **Backend** : Le backend doit accepter `x-user-id` dans les headers (déjà implémenté)
3. **Stripe** : Les paiements Stripe sont maintenant liés au userId Clerk
4. **Credits** : Les crédits sont maintenant liés au userId Clerk
5. **History** : L'historique est maintenant lié au userId Clerk

## 🚀 Prochaines étapes

1. **Configurer Clerk** :
   - Créer un compte Clerk
   - Ajouter les clés dans `.env.local`
   - Tester la connexion/inscription

2. **Backend (optionnel)** :
   - Adapter le backend pour utiliser le userId Clerk au lieu de 'anonymous'
   - Créer une table utilisateurs si nécessaire
   - Lier les crédits et l'historique au userId Clerk

3. **Testing** :
   - Tester la connexion/inscription
   - Tester la protection des routes
   - Tester les appels API avec userId
   - Vérifier que les crédits sont bien liés à l'utilisateur

## ✅ Checklist de vérification

- [x] Middleware Clerk configuré
- [x] ClerkProvider dans _app.tsx
- [x] Pages sign-in/sign-up créées
- [x] UserButton dans Navbar
- [x] Pages protégées (dashboard, history, credits, create-dub)
- [x] Headers x-user-id dans tous les appels API
- [x] Loading states pour auth pages
- [x] Variables d'environnement documentées
- [x] Compatibilité avec système existant préservée

