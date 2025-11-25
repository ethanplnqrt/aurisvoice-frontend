'use client';

import { Search } from 'lucide-react';
import type { VoiceGender, VoiceStyleTag } from '@/lib/voices';

interface VoiceFiltersProps {
  selectedGender: 'all' | VoiceGender;
  onGenderChange: (gender: 'all' | VoiceGender) => void;
  selectedStyles: VoiceStyleTag[];
  onStylesChange: (tags: VoiceStyleTag[]) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const GENDER_OPTIONS: Array<{ value: 'all' | VoiceGender; label: string }> = [
  { value: 'all', label: 'Tous' },
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
  { value: 'neutral', label: 'Neutre' },
  { value: 'robotic', label: 'Robotique' },
];

const STYLE_OPTIONS: Array<{ value: VoiceStyleTag; label: string }> = [
  { value: 'narrator', label: 'Narrateur' },
  { value: 'conversational', label: 'Conversationnel' },
  { value: 'news', label: 'Actualités' },
  { value: 'promo', label: 'Promo' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'storytelling', label: 'Storytelling' },
];

export function VoiceFilters({
  selectedGender,
  onGenderChange,
  selectedStyles,
  onStylesChange,
  search,
  onSearchChange,
}: VoiceFiltersProps) {
  const handleStyleToggle = (tag: VoiceStyleTag) => {
    if (selectedStyles.includes(tag)) {
      onStylesChange(selectedStyles.filter((t) => t !== tag));
    } else {
      onStylesChange([...selectedStyles, tag]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une voix..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Filtres par genre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Genre
        </label>
        <div className="flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onGenderChange(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGender === option.value
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres par style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Style
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((option) => {
            const isSelected = selectedStyles.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStyleToggle(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
                {isSelected && (
                  <span className="ml-2">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

