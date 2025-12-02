# 🚀 Variables d'environnement pour Vercel (Production)

## Instructions rapides

1. Allez dans votre projet Vercel → **Settings** → **Environment Variables**
2. Ajoutez ces variables :

---

## Variables à ajouter

### 🔐 Clerk Authentication (OBLIGATOIRE)

```bash
# Clerk Publishable Key (Production)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
# Environnement: Production, Preview, Development

# Clerk Secret Key (Production)
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
# Environnement: Production uniquement ⚠️
```

### 🔗 Clerk Routes (OPTIONNEL - avec fallback)

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
# Environnement: Production, Preview, Development

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
# Environnement: Production, Preview, Development

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
# Environnement: Production, Preview, Development

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
# Environnement: Production, Preview, Development
```

### 🌐 Clerk Frontend API (OPTIONNEL - si domaine custom)

```bash
# Si vous avez configuré un domaine custom dans Clerk
NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.aurisvoice.com
# Environnement: Production, Preview, Development
```

### 🔧 Backend API

```bash
NEXT_PUBLIC_BACKEND_URL=https://api.aurisvoice.com
# Environnement: Production, Preview, Development
```

### 💳 Stripe (si utilisé)

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
# Environnement: Production, Preview, Development

STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
# Environnement: Production uniquement ⚠️
```

---

## 🔑 Où obtenir les clés ?

### Clerk
1. Allez sur [Clerk Dashboard](https://dashboard.clerk.com)
2. Sélectionnez votre application
3. Allez dans **API Keys**
4. Copiez :
   - **Publishable key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** → `CLERK_SECRET_KEY`

⚠️ **IMPORTANT** : Pour la production, utilisez les clés qui commencent par `pk_live_` et `sk_live_` (pas `pk_test_`)

---

## ⚠️ Sécurité

### Variables PUBLIQUES (`NEXT_PUBLIC_*`)
- ✅ Visible côté client (navigateur)
- ✅ Ajouter à : Production, Preview, Development

### Variables PRIVÉES (sans `NEXT_PUBLIC_`)
- 🔒 Serveur uniquement
- 🔒 Ajouter à : **Production uniquement**

---

## 🧪 Test après déploiement

1. Redéployez votre application après avoir ajouté les variables
2. Testez la connexion avec Google sur `https://aurisvoice.com/sign-in`
3. Vérifiez que la redirection vers `/dashboard` fonctionne
4. Vérifiez que le bouton de déconnexion fonctionne

---

## ✅ Checklist Vercel

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ajoutée (pk_live_)
- [ ] `CLERK_SECRET_KEY` ajoutée (sk_live_) - Production uniquement
- [ ] `NEXT_PUBLIC_BACKEND_URL` ajoutée
- [ ] Variables redéployées (Vercel redéploie automatiquement)
- [ ] Test de connexion Google effectué
- [ ] Test de redirection `/dashboard` effectué

---

## 🔄 Redéploiement

Après avoir ajouté les variables, Vercel redéploiera automatiquement votre application. Sinon :

```bash
# Forcez un redéploiement
git commit --allow-empty -m "Trigger redeploy with new env vars"
git push
```

---

## 📞 Support

- [Vercel Docs - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Clerk Docs](https://clerk.com/docs)

