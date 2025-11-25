'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { FileUpload } from './FileUpload';
import { VoiceAndLanguagePanel } from './dubbing/VoiceAndLanguagePanel';
import { generateDub } from '@/lib/api';
import { Play, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DubbingFormProps {
  onSuccess?: (audioUrl: string) => void;
  onError?: (error: string) => void;
}

export function DubbingForm({ onSuccess, onError }: DubbingFormProps) {
  const { user } = useUser();
  
  // Set user ID in window for API calls
  useEffect(() => {
    if (user?.id) {
      (window as any).__clerkUserId = user.id;
    }
  }, [user]);

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Language & Voice state
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>('en-US');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);

  // Processing state
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ audioUrl?: string; error?: string } | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setResult({ error: 'Veuillez sélectionner un fichier' });
      return;
    }

    // Fallback sur langue par défaut si aucune sélectionnée
    const languageCode = selectedLanguage || 'en-US';
    // Fallback sur voix par défaut si aucune sélectionnée (le backend utilisera sa valeur par défaut)
    const voiceId = selectedVoiceId || null;

    setIsGenerating(true);
    setResult(null);

    try {
      // Appel API avec les nouveaux paramètres
      const response = await generateDub(
        selectedFile,
        languageCode,
        undefined, // sourceLanguage optionnel
        voiceId || undefined // Nouveau paramètre voiceId (undefined si null pour ne pas l'envoyer)
      );

      if (response.ok && response.data?.audioUrl) {
        setResult({ audioUrl: response.data.audioUrl });
        if (onSuccess) {
          onSuccess(response.data.audioUrl);
        }
      } else {
        const errorMessage = response.error || 'Erreur lors de la génération du doublage';
        setResult({ error: errorMessage });
        if (onError) {
          onError(errorMessage);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setResult({ error: errorMessage });
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Section Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          📁 Fichier source
        </h2>
        <FileUpload onFileSelect={handleFileSelect} />
        {selectedFile && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              ✓ Fichier sélectionné : <span className="font-medium">{selectedFile.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Section Configuration Langue & Voix */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <VoiceAndLanguagePanel
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedVoiceId={selectedVoiceId}
          onVoiceChange={setSelectedVoiceId}
        />
      </div>

      {/* Bouton de génération */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={!selectedFile || isGenerating}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
            !selectedFile || isGenerating
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>🎧 Lancer le doublage</span>
            </>
          )}
        </button>
      </div>

      {/* Résultat */}
      {result && (
        <div
          className={`p-6 rounded-xl ${
            result.error
              ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.error ? (
              <>
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                    Erreur
                  </h3>
                  <p className="text-red-800 dark:text-red-300">{result.error}</p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                    Doublage généré avec succès !
                  </h3>
                  {result.audioUrl && (
                    <div className="space-y-3">
                      <audio
                        controls
                        src={result.audioUrl}
                        className="w-full"
                        autoPlay
                      />
                      <a
                        href={result.audioUrl}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <span>📥 Télécharger</span>
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

