# 🔐 Configuration des Variables d'Environnement Clerk

## Variables Requises pour Production

Ajoutez ces variables dans votre fichier `.env.local` (local) et dans Vercel/votre plateforme de déploiement (production) :

```bash
# ==========================================
# 🔐 CLERK AUTHENTICATION - PRODUCTION CONFIG
# ==========================================

# Clerk Publishable Key (Public - visible côté client)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx

# Clerk Secret Key (Private - serveur uniquement)
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Clerk Frontend API (si domaine custom)
NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.aurisvoice.com

# ==========================================
# 🔗 CLERK ROUTES
# ==========================================

# URL de connexion
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

# URL d'inscription
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Redirection après connexion
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

# Redirection après inscription
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ==========================================
# 🌐 BACKEND API
# ==========================================

# URL du backend (API)
NEXT_PUBLIC_BACKEND_URL=https://api.aurisvoice.com

# ==========================================
# 💳 STRIPE (optionnel)
# ==========================================

# Stripe Publishable Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx

# Stripe Secret Key
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
```

## 📋 Guide de Configuration

### 1. Obtenir vos clés Clerk

1. Allez sur [Clerk Dashboard](https://dashboard.clerk.com)
2. Sélectionnez votre application
3. Allez dans **"API Keys"**
4. Copiez les clés :
   - `Publishable key` → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `Secret key` → `CLERK_SECRET_KEY`

⚠️ **Important** : Pour la production, utilisez les clés `pk_live_` et `sk_live_` (pas `pk_test_`)

### 2. Configurer un domaine custom (optionnel mais recommandé)

1. Dans le Clerk Dashboard, allez dans **"Paths"**
2. Cliquez sur **"Set up custom domain"**
3. Ajoutez votre domaine (ex: `clerk.aurisvoice.com`)
4. Configurez le DNS CNAME comme indiqué
5. Une fois configuré, ajoutez la variable :
   ```bash
   NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.aurisvoice.com
   ```

### 3. Configurer Google OAuth

1. Dans le Clerk Dashboard, allez dans **"User & Authentication"** → **"Social Connections"**
2. Activez **"Google"**
3. Deux options :
   - **Utiliser les credentials Clerk** (recommandé pour commencer)
   - **Utiliser vos propres credentials OAuth Google** :
     - Créez un projet sur [Google Cloud Console](https://console.cloud.google.com)
     - Activez l'API Google+ 
     - Créez des credentials OAuth 2.0
     - Ajoutez les URIs autorisées :
       - `https://aurisvoice.com`
       - `https://clerk.aurisvoice.com` (si domaine custom)
       - `https://accounts.clerk.com` (callback Clerk)

### 4. Configurer les URLs autorisées dans Clerk

1. Dans le Clerk Dashboard, allez dans **"Paths"**
2. Configurez :
   - **Sign-in path** : `/sign-in`
   - **Sign-up path** : `/sign-up`
   - **Home URL** : `https://aurisvoice.com`
   - **After sign-in URL** : `/dashboard`
   - **After sign-up URL** : `/dashboard`

3. Dans **"Domains"**, ajoutez vos domaines autorisés :
   - `https://aurisvoice.com`
   - `https://www.aurisvoice.com`
   - `http://localhost:3000` (pour le développement)

### 5. Configurer dans Vercel (Production)

1. Allez dans votre projet Vercel
2. Settings → **Environment Variables**
3. Ajoutez toutes les variables listées ci-dessus
4. Pour `NEXT_PUBLIC_*` variables : sélectionnez **Production**, **Preview**, et **Development**
5. Pour `CLERK_SECRET_KEY` et `STRIPE_SECRET_KEY` : sélectionnez uniquement **Production**

### 6. Tester la configuration

#### En local :
```bash
# 1. Créez .env.local à la racine du projet
# 2. Ajoutez toutes les variables
# 3. Redémarrez le serveur
npm run dev

# 4. Testez :
# - Allez sur http://localhost:3000/sign-in
# - Testez la connexion avec Google
# - Vérifiez la redirection vers /dashboard
```

#### En production :
```bash
# 1. Poussez vos changements
git push

# 2. Vérifiez le déploiement Vercel
# 3. Testez :
# - Allez sur https://aurisvoice.com/sign-in
# - Testez la connexion avec Google
# - Vérifiez la redirection vers /dashboard
```

## ✅ Checklist de Vérification

- [ ] Variables Clerk configurées dans `.env.local`
- [ ] Variables Clerk configurées dans Vercel
- [ ] Google OAuth activé dans Clerk Dashboard
- [ ] Domaines autorisés configurés dans Clerk
- [ ] Paths configurés dans Clerk Dashboard
- [ ] Test de connexion Google en local ✓
- [ ] Test de connexion Google en production ✓
- [ ] Redirection vers `/dashboard` fonctionne ✓
- [ ] Page `/sso-callback` accessible ✓

## 🐛 Dépannage

### Erreur "Invalid publishable key"
- Vérifiez que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` est bien définie
- Pour la production, utilisez `pk_live_` (pas `pk_test_`)
- Redémarrez le serveur après changement

### Erreur "Redirect URI mismatch" avec Google OAuth
- Vérifiez les URLs autorisées dans Google Cloud Console
- Ajoutez `https://accounts.clerk.com/v1/oauth_callback`
- Vérifiez que votre domaine est bien configuré dans Clerk

### La redirection après login ne fonctionne pas
- Vérifiez `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- Vérifiez que la route est bien protégée par le middleware
- Vérifiez les logs du navigateur pour les erreurs

### "Cannot read properties of undefined" avec Clerk
- Vérifiez que `ClerkProvider` enveloppe bien toute l'application
- Vérifiez que vous utilisez `@clerk/nextjs` (pas `@clerk/clerk-react`)
- Vérifiez que le middleware est bien configuré

## 📞 Support

- [Documentation Clerk](https://clerk.com/docs)
- [Clerk Discord](https://clerk.com/discord)
- [Documentation Next.js + Clerk](https://clerk.com/docs/quickstarts/nextjs)

