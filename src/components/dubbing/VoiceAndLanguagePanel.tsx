'use client';

import { useState, useMemo } from 'react';
import { Globe, Mic2 } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { VoiceFilters } from './VoiceFilters';
import { VoiceGrid } from './VoiceGrid';
import {
  getFilteredVoices,
  type VoiceGender,
  type VoiceStyleTag,
} from '@/lib/voices';

interface VoiceAndLanguagePanelProps {
  selectedLanguage: string | undefined;
  onLanguageChange: (value: string) => void;
  selectedVoiceId: string | null;
  onVoiceChange: (voiceId: string) => void;
  className?: string;
}

export function VoiceAndLanguagePanel({
  selectedLanguage,
  onLanguageChange,
  selectedVoiceId,
  onVoiceChange,
  className = '',
}: VoiceAndLanguagePanelProps) {
  // État des filtres
  const [selectedGender, setSelectedGender] = useState<'all' | VoiceGender>('all');
  const [selectedStyles, setSelectedStyles] = useState<VoiceStyleTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les voix selon les critères
  const filteredVoices = useMemo(
    () =>
      getFilteredVoices(selectedGender, selectedStyles, searchQuery),
    [selectedGender, selectedStyles, searchQuery]
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Configuration du Doublage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sélectionnez la langue cible et la voix IA pour votre projet
        </p>
      </div>

      {/* Section Langue */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-primary-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Langue Cible
          </h3>
        </div>
        <LanguageSelector
          value={selectedLanguage}
          onChange={onLanguageChange}
        />
      </div>

      {/* Section Voix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Mic2 className="w-5 h-5 text-primary-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Voix IA
          </h3>
        </div>

        {/* Filtres */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
          <VoiceFilters
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
            selectedStyles={selectedStyles}
            onStylesChange={setSelectedStyles}
            search={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Grille de voix */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredVoices.length} voix disponible{filteredVoices.length > 1 ? 's' : ''}
            </p>
            {selectedVoiceId && (
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Voix sélectionnée
              </p>
            )}
          </div>
          <VoiceGrid
            voices={filteredVoices}
            selectedVoiceId={selectedVoiceId}
            onSelect={onVoiceChange}
          />
        </div>
      </div>

      {/* Info de sélection */}
      {selectedLanguage && selectedVoiceId && (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
          <p className="text-sm text-primary-800 dark:text-primary-200">
            <span className="font-semibold">Configuration prête :</span> La voix{' '}
            <span className="font-medium">{selectedVoiceId}</span> sera utilisée pour
            la langue sélectionnée.
          </p>
        </div>
      )}
    </div>
  );
}

