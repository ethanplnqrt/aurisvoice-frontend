"use client";

import { useState } from "react";
import { Play, Pause, Loader2 } from "lucide-react";
import type { VoiceProfile } from "@/lib/voices";
import { useAudioPreview } from "@/hooks/useAudioPreview";

interface VoiceGridProps {
  voices: VoiceProfile[];
  selectedVoiceId: string | null;
  onSelect: (voiceId: string) => void;
}

const GENDER_LABELS: Record<VoiceProfile["gender"], string> = {
  male: "Homme",
  female: "Femme",
  neutral: "Neutre",
  robotic: "Robotique",
};

const GENDER_COLORS: Record<VoiceProfile["gender"], string> = {
  male: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  female: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  neutral: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  robotic:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export function VoiceGrid({
  voices,
  selectedVoiceId,
  onSelect,
}: VoiceGridProps) {
  const { isPlaying, currentVoiceId, play, playFromApi, stop } =
    useAudioPreview();
  const [loadingVoices, setLoadingVoices] = useState<Set<string>>(new Set());

  const handlePreview = async (voice: VoiceProfile, e: React.MouseEvent) => {
    e.stopPropagation();

    // If already playing this voice, stop it
    if (isPlaying && currentVoiceId === voice.id) {
      stop();
      return;
    }

    // If voice has a static previewUrl, use it
    if (voice.previewUrl) {
      if (isPlaying && currentVoiceId === voice.id) {
        stop();
      } else {
        play(voice.previewUrl, voice.id);
      }
      return;
    }

    // Otherwise, fetch from API
    setLoadingVoices((prev) => new Set(prev).add(voice.id));

    try {
      await playFromApi(voice.id);
    } catch (error) {
      console.warn("Failed to fetch preview");
    } finally {
      setLoadingVoices((prev) => {
        const next = new Set(prev);
        next.delete(voice.id);
        return next;
      });
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
        const isPreviewPlaying = isPlaying && currentVoiceId === voice.id;
        const isLoading = loadingVoices.has(voice.id);

        return (
          <div
            key={voice.id}
            onClick={() => onSelect(voice.id)}
            className={`relative p-6 bg-white dark:bg-gray-800 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
              isSelected
                ? "border-primary-500 shadow-lg ring-2 ring-primary-500/20"
                : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
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
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isLoading
                    ? "bg-blue-400 text-white cursor-wait"
                    : isPreviewPlaying
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : isPreviewPlaying ? (
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
