# 🎙️ Intégration du Formulaire de Doublage Premium

## ✅ Fichiers créés/modifiés

### Nouveaux fichiers
- `src/components/DubbingForm.tsx` - Formulaire complet avec intégration VoiceAndLanguagePanel

### Fichiers modifiés
- `src/lib/api.ts` - Fonction `generateDub` mise à jour pour accepter `voiceId`

## 📦 Structure du formulaire

Le composant `DubbingForm` intègre :
1. **FileUpload** - Upload de fichier audio/vidéo
2. **VoiceAndLanguagePanel** - Sélection premium de langue et voix
3. **Bouton de génération** - Lancement du doublage
4. **Affichage des résultats** - Audio player + téléchargement

## 🔧 Utilisation

```tsx
import { DubbingForm } from '@/components/DubbingForm';

export default function CreateDubPage() {
  return (
    <div className="container mx-auto py-8">
      <DubbingForm
        onSuccess={(audioUrl) => {
          console.log('Doublage généré:', audioUrl);
        }}
        onError={(error) => {
          console.error('Erreur:', error);
        }}
      />
    </div>
  );
}
```

## 📡 Payload API envoyé au backend

### Exemple 1 : Avec langue et voix sélectionnées

```javascript
// FormData envoyé à POST /api/dub
{
  file: File,                    // Fichier audio/vidéo
  targetLanguage: "fr-FR",      // Code langue complet (ex: "fr-FR", "en-US")
  voiceModel: "nova"            // ID de la voix (ex: "alloy", "nova", "shimmer")
}
```

### Exemple 2 : Avec langue seulement (fallback voix)

```javascript
// FormData envoyé à POST /api/dub
{
  file: File,
  targetLanguage: "en-US",      // Langue sélectionnée
  // voiceModel non envoyé → backend utilise sa valeur par défaut
}
```

### Exemple 3 : Fallback complet (comportement actuel préservé)

```javascript
// FormData envoyé à POST /api/dub
{
  file: File,
  targetLanguage: "en-US",      // Fallback sur "en-US" si aucune langue
  // voiceModel non envoyé → backend utilise sa valeur par défaut
}
```

## 🎯 Comportement de fallback

### Langue
- **Si aucune langue sélectionnée** → Fallback sur `"en-US"`
- **Format** : Code ISO complet avec locale (ex: `"fr-FR"`, `"en-US"`, `"es-ES"`)

### Voix
- **Si aucune voix sélectionnée** → Le champ `voiceModel` n'est **pas envoyé** au backend
- **Backend** : Utilise sa valeur par défaut (probablement `"nova"` selon la doc)
- **Si voix sélectionnée** → Envoie l'ID de la voix (ex: `"alloy"`, `"shimmer"`, `"verse"`)

## 🔄 Flux complet

```
1. Utilisateur upload un fichier
   ↓
2. Utilisateur sélectionne langue (optionnel, défaut: "en-US")
   ↓
3. Utilisateur sélectionne voix (optionnel, défaut: backend)
   ↓
4. Clic sur "Lancer le doublage"
   ↓
5. Appel API generateDub(file, languageCode, undefined, voiceId)
   ↓
6. FormData créé avec:
   - file
   - targetLanguage (toujours présent)
   - voiceModel (seulement si voiceId !== null)
   ↓
7. POST /api/dub avec FormData
   ↓
8. Backend traite et retourne audioUrl
   ↓
9. Affichage du player audio + bouton téléchargement
```

## 📝 Code de l'appel API

```typescript
// src/lib/api.ts - generateDub()
const formData = new FormData();
formData.append('file', file);
formData.append('targetLanguage', targetLanguage);
if (sourceLanguage) {
  formData.append('sourceLanguage', sourceLanguage);
}
// Ajouter voiceId si fourni (le backend utilisera sa valeur par défaut si null/undefined)
if (voiceId) {
  formData.append('voiceModel', voiceId);
}
```

## 🎨 Interface utilisateur

Le formulaire affiche :
- ✅ Zone d'upload de fichier
- ✅ Panel premium de sélection langue + voix
- ✅ Bouton de génération (désactivé si pas de fichier)
- ✅ Indicateur de chargement
- ✅ Résultat avec player audio
- ✅ Bouton de téléchargement

## 🔒 Sécurité et validation

- ✅ Validation de la taille du fichier (50MB max)
- ✅ Validation du type de fichier (audio/video)
- ✅ Gestion des erreurs avec messages clairs
- ✅ Fallback robuste si aucune sélection

## 📌 Notes importantes

1. **Compatibilité** : Le formulaire fonctionne même si `VoiceAndLanguagePanel` n'est pas utilisé (fallback automatique)
2. **Backend** : Le backend doit accepter `voiceModel` dans le FormData (déjà prévu selon la doc)
3. **Format langue** : Utilise maintenant le format complet `"fr-FR"` au lieu de `"fr"` pour plus de précision
4. **Pas de breaking change** : Si `voiceModel` n'est pas envoyé, le backend utilise sa valeur par défaut

