# 🧪 PWA PRO - GUIDE DE TEST RAPIDE

**Version**: v1.0  
**Durée**: 5 minutes

---

## ⚡ Test Rapide (2 minutes)

### 1. Démarrer l'app
```bash
npm run dev
```

### 2. Ouvrir Chrome
```
http://localhost:3000
```

### 3. Vérifier Console
**Attendu**:
```
[SW] AurisVoice PWA Service Worker loaded ✓
[SW] Version: aurisvoice-v1
[SW] ✓ Service Worker registered successfully
[SW] Scope: http://localhost:3000/
```

**Si vous voyez ça** → ✅ **SERVICE WORKER OK**

---

### 4. Vérifier DevTools

**Application → Service Workers**:
```
✅ Status: activated
✅ Source: /sw.js
✅ Scope: /
```

**Application → Cache Storage**:
```
✅ aurisvoice-v1-static
✅ aurisvoice-v1-dynamic
✅ aurisvoice-v1-images
```

**Application → Manifest**:
```
✅ Name: AurisVoice
✅ Icons: 192x192, 512x512
✅ Theme: #0f0220
```

**Si tout est vert** → ✅ **PWA INSTALLÉ**

---

### 5. Test Offline (1 minute)

1. **DevTools** → **Network** → Cocher **Offline** ☑️
2. **Recharger** la page (F5)
3. **Attendu**: Page offline AurisVoice s'affiche avec:
   - Logo microphone violet
   - Message "Vous êtes hors ligne"
   - Bouton "Réessayer"
   - Design cohérent

4. **Décocher Offline** ☐
5. **Cliquer "Réessayer"**
6. **Attendu**: Page se recharge et fonctionne

**Si ça marche** → ✅ **OFFLINE SUPPORT OK**

---

## 🎯 Résultat Attendu

**Si les 5 étapes passent** → ✅ **PWA PRO OPÉRATIONNEL**

---

## 🔬 Test Complet (5 minutes)

### Test 1: Precache
**DevTools → Application → Cache Storage → aurisvoice-v1-static**

Vérifier que ces 6 fichiers sont cachés:
- [ ] `/` (homepage)
- [ ] `/offline.html`
- [ ] `/manifest.json`
- [ ] `/icons/icon-192x192.png`
- [ ] `/icons/icon-512x512.png`
- [ ] `/favicon.ico`

---

### Test 2: Cache Strategies

#### A. Images (CacheFirst)
1. Visiter une page avec images
2. **Network tab** → Voir images chargées
3. **Cache Storage** → Voir images dans `aurisvoice-v1-images`
4. **Recharger** page
5. **Network tab** → Images servies depuis cache (0ms, taille: "(disk cache)")

#### B. HTML (NetworkFirst)
1. Visiter `/about`
2. **Activer Offline** ☑️
3. **Recharger** `/about`
4. **Attendu**: Page servie depuis cache (pas offline.html)

#### C. JS/CSS (StaleWhileRevalidate)
1. Visiter homepage
2. **Recharger**
3. **Network tab** → JS/CSS depuis cache
4. **Background**: Fetch pour mise à jour

---

### Test 3: Auto-Update

1. **Ouvrir** `public/sw.js`
2. **Changer**: `const CACHE_VERSION = 'aurisvoice-v2';`
3. **Sauvegarder**
4. **Attendre 60 secondes** OU recharger
5. **Console attendu**:
```
[SW] Update found, installing new version...
[SW] ✓ New version installed
[SW] ✓ Controller changed - reloading page...
```
6. **Page se recharge automatiquement**

---

### Test 4: Blacklist APIs

1. **Network tab** → Filter: "clerk" ou "stripe"
2. Effectuer une action qui appelle Clerk/Stripe
3. **Vérifier**: Requêtes passent par le réseau (pas de cache)
4. **Cache Storage** → Vérifier: Aucune entrée clerk/stripe

---

### Test 5: Manifest Detection

**Sur CHAQUE page** (13 pages à tester):
- [ ] `/` - Homepage
- [ ] `/dashboard` - Dashboard
- [ ] `/about` - About
- [ ] `/credits` - Credits
- [ ] `/history` - History
- [ ] `/create-dub` - Create dub
- [ ] `/payment/success` - Payment success
- [ ] `/payment/cancel` - Payment cancel
- [ ] `/tests/mobile` - Mobile tests
- [ ] `/dashboard/1` - Studio player
- [ ] `/sso-callback` - OAuth
- [ ] `/404` - Not found
- [ ] `/500` - Server error

**Pour chaque page**:
1. Naviguer vers la page
2. **DevTools → Application → Manifest**
3. **Attendu**: Manifest détecté et affiché

**Si toutes passent** → ✅ **MANIFEST 100% COVERAGE**

---

## 🏅 Test Lighthouse (Final)

### Lancer l'audit
1. **DevTools** → **Lighthouse**
2. Cocher **PWA** uniquement
3. Cliquer **Analyze page load**

### Score Attendu: 100/100

**Vérifier**:
- ✅ Installable
- ✅ PWA Optimized
- ✅ Works offline
- ✅ Configured properly

**Détails attendus**:
```
✅ Fast and reliable
   ✓ Current page responds with 200 when offline
   ✓ Start URL responds with 200 when offline
   ✓ Registers a service worker

✅ Installable
   ✓ Web app manifest meets requirements
   ✓ Provides a valid apple-touch-icon
   ✓ Configured for a custom splash screen

✅ PWA Optimized
   ✓ Redirects HTTP to HTTPS
   ✓ Content sized correctly for viewport
   ✓ Has a <meta name="viewport"> tag
   ✓ Sets a theme color
```

---

## 🐛 Dépannage

### Service Worker ne s'enregistre pas

**Solution**:
1. **Console** → Vérifier erreurs
2. **Clear site data** (DevTools → Application)
3. **Hard reload** (Ctrl+Shift+R)
4. Vérifier que `/sw.js` est accessible

### Cache ne fonctionne pas

**Solution**:
1. **Vérifier** que SW est activé
2. **Network tab** → Voir si requêtes passent par SW
3. **Cache Storage** → Vérifier que caches se remplissent
4. **Console** → Logs `[SW] Serving from cache`

### Offline page ne s'affiche pas

**Solution**:
1. **Vérifier** `/offline.html` existe
2. **Cache Storage** → Vérifier `/offline.html` dans static cache
3. **Console** → Chercher `[SW] Serving offline page`
4. **Test**: Vraiment hors ligne (pas juste Network → Offline)

### Manifest non détecté

**Solution**:
1. **Vérifier** que la page contient `<link rel="manifest" />`
2. **Network tab** → `/manifest.json` → Vérifier 200 OK
3. **Response Headers** → `Content-Type: application/manifest+json`
4. **Clear cache** + hard reload

---

## ✅ Checklist Rapide

### Avant Commit
- [x] SW enregistré localement
- [x] Cache fonctionne
- [x] Offline marche
- [x] Manifest détecté
- [x] 0 erreurs linting
- [x] Console propre

### Après Deploy
- [ ] https://www.aurisvoice.com/sw.js → 200
- [ ] https://www.aurisvoice.com/manifest.json → 200
- [ ] https://www.aurisvoice.com/offline.html → 200
- [ ] Test offline en production
- [ ] Lighthouse audit → 100/100
- [ ] "Add to Home Screen" fonctionne

---

## 📞 Support

**Documentation complète**: `PWA_PRO_OPTIMIZATION_COMPLETE.md`

**Questions**:
- Service Worker? → Voir section "Service Worker PRO"
- Offline? → Voir section "Page Offline"
- Cache? → Voir section "Cache Strategies"
- Tests? → Ce fichier

---

## 🎉 Validation Finale

**Si tous les tests passent**:

✅ Service Worker installé et actif  
✅ Cache strategies fonctionnent  
✅ Page offline s'affiche correctement  
✅ Manifest détecté sur toutes les pages  
✅ Auto-update opérationnel  
✅ Lighthouse PWA 100/100  

**→ PWA PRO VALIDÉ - PRÊT POUR PRODUCTION 🚀**

---

**Status**: ✅ Guide de test complet  
**Durée**: 5 minutes pour test complet  
**Next**: Commit → Deploy → Test en production

