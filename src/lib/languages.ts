/**
 * Configuration des langues supportées pour le doublage IA
 * Format: code ISO avec locale (ex: "fr-FR", "en-US")
 */

export interface Language {
  code: string; // Code ISO avec locale (ex: "fr-FR", "en-US")
  label: string; // Label en français (ex: "Français (France)")
  nativeLabel: string; // Nom natif (ex: "Français")
  group: string; // Groupe géographique
  flag: string; // Emoji drapeau
}

export const SUPPORTED_LANGUAGES: Language[] = [
  // Europe - Francophonie
  {
    code: 'fr-FR',
    label: 'Français (France)',
    nativeLabel: 'Français',
    group: 'Europe',
    flag: '🇫🇷',
  },
  {
    code: 'fr-CA',
    label: 'Français (Canada)',
    nativeLabel: 'Français',
    group: 'Amériques',
    flag: '🇨🇦',
  },
  {
    code: 'fr-BE',
    label: 'Français (Belgique)',
    nativeLabel: 'Français',
    group: 'Europe',
    flag: '🇧🇪',
  },
  {
    code: 'fr-CH',
    label: 'Français (Suisse)',
    nativeLabel: 'Français',
    group: 'Europe',
    flag: '🇨🇭',
  },

  // Europe - Anglais
  {
    code: 'en-US',
    label: 'Anglais (États-Unis)',
    nativeLabel: 'English',
    group: 'Amériques',
    flag: '🇺🇸',
  },
  {
    code: 'en-GB',
    label: 'Anglais (Royaume-Uni)',
    nativeLabel: 'English',
    group: 'Europe',
    flag: '🇬🇧',
  },
  {
    code: 'en-AU',
    label: 'Anglais (Australie)',
    nativeLabel: 'English',
    group: 'Océanie',
    flag: '🇦🇺',
  },
  {
    code: 'en-CA',
    label: 'Anglais (Canada)',
    nativeLabel: 'English',
    group: 'Amériques',
    flag: '🇨🇦',
  },

  // Europe - Autres
  {
    code: 'es-ES',
    label: 'Espagnol (Espagne)',
    nativeLabel: 'Español',
    group: 'Europe',
    flag: '🇪🇸',
  },
  {
    code: 'es-MX',
    label: 'Espagnol (Mexique)',
    nativeLabel: 'Español',
    group: 'Amériques',
    flag: '🇲🇽',
  },
  {
    code: 'es-AR',
    label: 'Espagnol (Argentine)',
    nativeLabel: 'Español',
    group: 'Amériques',
    flag: '🇦🇷',
  },
  {
    code: 'pt-PT',
    label: 'Portugais (Portugal)',
    nativeLabel: 'Português',
    group: 'Europe',
    flag: '🇵🇹',
  },
  {
    code: 'pt-BR',
    label: 'Portugais (Brésil)',
    nativeLabel: 'Português',
    group: 'Amériques',
    flag: '🇧🇷',
  },
  {
    code: 'it-IT',
    label: 'Italien',
    nativeLabel: 'Italiano',
    group: 'Europe',
    flag: '🇮🇹',
  },
  {
    code: 'de-DE',
    label: 'Allemand',
    nativeLabel: 'Deutsch',
    group: 'Europe',
    flag: '🇩🇪',
  },
  {
    code: 'nl-NL',
    label: 'Néerlandais',
    nativeLabel: 'Nederlands',
    group: 'Europe',
    flag: '🇳🇱',
  },
  {
    code: 'sv-SE',
    label: 'Suédois',
    nativeLabel: 'Svenska',
    group: 'Europe',
    flag: '🇸🇪',
  },
  {
    code: 'no-NO',
    label: 'Norvégien',
    nativeLabel: 'Norsk',
    group: 'Europe',
    flag: '🇳🇴',
  },
  {
    code: 'da-DK',
    label: 'Danois',
    nativeLabel: 'Dansk',
    group: 'Europe',
    flag: '🇩🇰',
  },
  {
    code: 'fi-FI',
    label: 'Finnois',
    nativeLabel: 'Suomi',
    group: 'Europe',
    flag: '🇫🇮',
  },
  {
    code: 'pl-PL',
    label: 'Polonais',
    nativeLabel: 'Polski',
    group: 'Europe',
    flag: '🇵🇱',
  },
  {
    code: 'cs-CZ',
    label: 'Tchèque',
    nativeLabel: 'Čeština',
    group: 'Europe',
    flag: '🇨🇿',
  },
  {
    code: 'el-GR',
    label: 'Grec',
    nativeLabel: 'Ελληνικά',
    group: 'Europe',
    flag: '🇬🇷',
  },

  // Asie
  {
    code: 'ja-JP',
    label: 'Japonais',
    nativeLabel: '日本語',
    group: 'Asie',
    flag: '🇯🇵',
  },
  {
    code: 'ko-KR',
    label: 'Coréen',
    nativeLabel: '한국어',
    group: 'Asie',
    flag: '🇰🇷',
  },
  {
    code: 'zh-CN',
    label: 'Chinois (Mandarin)',
    nativeLabel: '中文',
    group: 'Asie',
    flag: '🇨🇳',
  },
  {
    code: 'zh-HK',
    label: 'Chinois (Cantonais)',
    nativeLabel: '中文',
    group: 'Asie',
    flag: '🇭🇰',
  },
  {
    code: 'hi-IN',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    group: 'Asie',
    flag: '🇮🇳',
  },
  {
    code: 'id-ID',
    label: 'Indonésien',
    nativeLabel: 'Bahasa Indonesia',
    group: 'Asie',
    flag: '🇮🇩',
  },
  {
    code: 'th-TH',
    label: 'Thaï',
    nativeLabel: 'ไทย',
    group: 'Asie',
    flag: '🇹🇭',
  },
  {
    code: 'vi-VN',
    label: 'Vietnamien',
    nativeLabel: 'Tiếng Việt',
    group: 'Asie',
    flag: '🇻🇳',
  },

  // Moyen-Orient
  {
    code: 'ar-SA',
    label: 'Arabe (Arabie Saoudite)',
    nativeLabel: 'العربية',
    group: 'Moyen-Orient',
    flag: '🇸🇦',
  },
  {
    code: 'ar-EG',
    label: 'Arabe (Égypte)',
    nativeLabel: 'العربية',
    group: 'Moyen-Orient',
    flag: '🇪🇬',
  },
  {
    code: 'tr-TR',
    label: 'Turc',
    nativeLabel: 'Türkçe',
    group: 'Moyen-Orient',
    flag: '🇹🇷',
  },
];

/**
 * Obtenir une langue par son code
 */
export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}

/**
 * Obtenir toutes les langues d'un groupe
 */
export function getLanguagesByGroup(group: string): Language[] {
  return SUPPORTED_LANGUAGES.filter((lang) => lang.group === group);
}

/**
 * Obtenir la liste unique des groupes
 */
export function getLanguageGroups(): string[] {
  return Array.from(new Set(SUPPORTED_LANGUAGES.map((lang) => lang.group)));
}

/**
 * Rechercher des langues par terme (nom, code, drapeau)
 */
export function searchLanguages(query: string): Language[] {
  const lowerQuery = query.toLowerCase();
  return SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.label.toLowerCase().includes(lowerQuery) ||
      lang.nativeLabel.toLowerCase().includes(lowerQuery) ||
      lang.code.toLowerCase().includes(lowerQuery)
  );
}

