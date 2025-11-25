'use client';

import { Play, Pause } from 'lucide-react';
import type { VoiceProfile } from '@/lib/voices';
import { useAudioPreview } from '@/hooks/useAudioPreview';

interface VoiceGridProps {
  voices: VoiceProfile[];
  selectedVoiceId: string | null;
  onSelect: (voiceId: string) => void;
}

const GENDER_LABELS: Record<VoiceProfile['gender'], string> = {
  male: 'Homme',
  female: 'Femme',
  neutral: 'Neutre',
  robotic: 'Robotique',
};

const GENDER_COLORS: Record<VoiceProfile['gender'], string> = {
  male: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  female: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  robotic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

export function VoiceGrid({ voices, selectedVoiceId, onSelect }: VoiceGridProps) {
  const { isPlaying, currentUrl, play, stop } = useAudioPreview();

  const handlePreview = (voice: VoiceProfile, e: React.MouseEvent) => {
    e.stopPropagation();
    if (voice.previewUrl) {
      if (isPlaying && currentUrl === voice.previewUrl) {
        stop();
      } else {
        play(voice.previewUrl);
      }
    } else {
      // Placeholder: on pourrait afficher un message ou utiliser un audio de test
      console.log('Preview non disponible pour:', voice.name);
    }
  };

  if (voices.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">Aucune voix trouvée</p>
        <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {voices.map((voice) => {
        const isSelected = selectedVoiceId === voice.id;
        const isPreviewPlaying = isPlaying && currentUrl === voice.previewUrl;

        return (
          <div
            key={voice.id}
            onClick={() => onSelect(voice.id)}
            className={`relative p-6 bg-white dark:bg-gray-800 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
              isSelected
                ? 'border-primary-500 shadow-lg ring-2 ring-primary-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
            }`}
          >
            {/* Badge de sélection */}
            {isSelected && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            {/* En-tête de la carte */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {voice.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${GENDER_COLORS[voice.gender]}`}
                >
                  {GENDER_LABELS[voice.gender]}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {voice.description}
            </p>

            {/* Tags de style */}
            <div className="flex flex-wrap gap-2 mb-4">
              {voice.styleTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {voice.styleTags.length > 3 && (
                <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                  +{voice.styleTags.length - 3}
                </span>
              )}
            </div>

            {/* Bouton de préécoute */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={(e) => handlePreview(voice, e)}
                disabled={!voice.previewUrl}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  voice.previewUrl
                    ? isPreviewPlaying
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                {isPreviewPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Arrêter</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Préécouter</span>
                  </>
                )}
              </button>

              {isSelected && (
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  Sélectionnée
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

