/**
 * Configuration des voix OpenAI TTS disponibles
 * Les IDs correspondent aux voix supportées par l'API OpenAI TTS
 */

export type VoiceGender = 'male' | 'female' | 'neutral' | 'robotic';

export type VoiceStyleTag =
  | 'narrator'
  | 'conversational'
  | 'news'
  | 'promo'
  | 'corporate'
  | 'storytelling'
  | 'calm'
  | 'energetic'
  | 'warm'
  | 'professional';

export interface VoiceProfile {
  id: string; // ID utilisé côté backend pour OpenAI (ex: "alloy", "nova", "shimmer")
  name: string; // Label marketing (ex: "Alloy – Neutral Pro")
  gender: VoiceGender;
  styleTags: VoiceStyleTag[]; // Tags de style
  defaultLanguages: string[]; // Codes ISO suggérés (ex: ["en-US", "fr-FR"])
  description: string; // Description courte en français
  previewUrl?: string; // URL d'un extrait audio (optionnel pour l'instant)
}

export const VOICE_PROFILES: VoiceProfile[] = [
  // Voix neutres professionnelles
  {
    id: 'alloy',
    name: 'Alloy – Neutre Professionnel',
    gender: 'neutral',
    styleTags: ['corporate', 'professional', 'calm'],
    defaultLanguages: ['en-US', 'fr-FR', 'es-ES'],
    description: 'Voix neutre et équilibrée, idéale pour les contenus corporate et professionnels.',
  },
  {
    id: 'nova',
    name: 'Nova – Narrateur Premium',
    gender: 'neutral',
    styleTags: ['narrator', 'storytelling', 'warm'],
    defaultLanguages: ['en-US', 'en-GB', 'fr-FR'],
    description: 'Voix polyvalente avec une chaleur naturelle, parfaite pour la narration et le storytelling.',
  },

  // Voix masculines
  {
    id: 'echo',
    name: 'Echo – Masculin Grave',
    gender: 'male',
    styleTags: ['narrator', 'corporate', 'calm'],
    defaultLanguages: ['en-US', 'en-GB', 'de-DE'],
    description: 'Voix masculine profonde et autoritaire, excellente pour la narration et les contenus corporate.',
  },
  {
    id: 'fable',
    name: 'Fable – Masculin Chaleureux',
    gender: 'male',
    styleTags: ['conversational', 'warm', 'storytelling'],
    defaultLanguages: ['en-US', 'es-ES', 'pt-BR'],
    description: 'Voix masculine chaleureuse et engageante, parfaite pour les podcasts et contenus conversationnels.',
  },

  // Voix féminines
  {
    id: 'shimmer',
    name: 'Shimmer – Féminin Élégant',
    gender: 'female',
    styleTags: ['corporate', 'professional', 'calm'],
    defaultLanguages: ['en-US', 'fr-FR', 'es-ES'],
    description: 'Voix féminine claire et professionnelle, idéale pour les présentations et contenus corporate.',
  },
  {
    id: 'verse',
    name: 'Verse – Féminin Chaleureux',
    gender: 'female',
    styleTags: ['conversational', 'warm', 'storytelling'],
    defaultLanguages: ['en-US', 'fr-FR', 'it-IT'],
    description: 'Voix féminine chaleureuse et naturelle, parfaite pour les podcasts et contenus conversationnels.',
  },
  {
    id: 'onyx',
    name: 'Onyx – Féminin Autoritaire',
    gender: 'female',
    styleTags: ['news', 'corporate', 'professional'],
    defaultLanguages: ['en-US', 'en-GB', 'de-DE'],
    description: 'Voix féminine confiante et autoritaire, excellente pour les actualités et contenus d\'information.',
  },

  // Voix spécialisées
  {
    id: 'wind',
    name: 'Wind – Narrateur Énergique',
    gender: 'neutral',
    styleTags: ['promo', 'energetic', 'news'],
    defaultLanguages: ['en-US', 'es-ES', 'pt-BR'],
    description: 'Voix dynamique et énergique, parfaite pour les publicités et contenus promotionnels.',
  },
  {
    id: 'robotic',
    name: 'Robotic – IA Voix Off',
    gender: 'robotic',
    styleTags: ['corporate', 'professional'],
    defaultLanguages: ['en-US', 'fr-FR', 'de-DE'],
    description: 'Voix robotique assumée, idéale pour les contenus tech et futuristic.',
  },
  {
    id: 'sage',
    name: 'Sage – Masculin Sage',
    gender: 'male',
    styleTags: ['narrator', 'storytelling', 'calm'],
    defaultLanguages: ['en-US', 'en-GB', 'fr-FR'],
    description: 'Voix masculine mature et sage, parfaite pour les documentaires et narrations historiques.',
  },
  {
    id: 'coral',
    name: 'Coral – Féminin Jeune',
    gender: 'female',
    styleTags: ['conversational', 'energetic', 'promo'],
    defaultLanguages: ['en-US', 'es-ES', 'pt-BR'],
    description: 'Voix féminine jeune et dynamique, idéale pour les contenus marketing et publicitaires.',
  },
];

/**
 * Obtenir une voix par son ID
 */
export function getVoiceById(id: string): VoiceProfile | undefined {
  return VOICE_PROFILES.find((voice) => voice.id === id);
}

/**
 * Filtrer les voix par genre
 */
export function filterVoicesByGender(
  voices: VoiceProfile[],
  gender: VoiceGender | 'all'
): VoiceProfile[] {
  if (gender === 'all') return voices;
  return voices.filter((voice) => voice.gender === gender);
}

/**
 * Filtrer les voix par tags de style
 */
export function filterVoicesByStyleTags(
  voices: VoiceProfile[],
  selectedTags: VoiceStyleTag[]
): VoiceProfile[] {
  if (selectedTags.length === 0) return voices;
  return voices.filter((voice) =>
    selectedTags.every((tag) => voice.styleTags.includes(tag))
  );
}

/**
 * Rechercher des voix par terme (nom, description, tags)
 */
export function searchVoices(voices: VoiceProfile[], query: string): VoiceProfile[] {
  if (!query.trim()) return voices;
  const lowerQuery = query.toLowerCase();
  return voices.filter(
    (voice) =>
      voice.name.toLowerCase().includes(lowerQuery) ||
      voice.description.toLowerCase().includes(lowerQuery) ||
      voice.styleTags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Obtenir toutes les voix filtrées selon les critères
 */
export function getFilteredVoices(
  gender: VoiceGender | 'all',
  selectedStyleTags: VoiceStyleTag[],
  searchQuery: string
): VoiceProfile[] {
  let filtered = VOICE_PROFILES;
  filtered = filterVoicesByGender(filtered, gender);
  filtered = filterVoicesByStyleTags(filtered, selectedStyleTags);
  filtered = searchVoices(filtered, searchQuery);
  return filtered;
}

