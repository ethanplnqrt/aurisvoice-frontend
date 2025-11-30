/**
 * Hook pour la préécoute d'extraits audio
 * Gère la lecture d'un seul audio à la fois
 * Supporte les URLs statiques et la génération via API
 */

import { useState, useRef, useEffect } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://aurisvoice.onrender.com";

export interface UseAudioPreviewReturn {
  isPlaying: boolean;
  currentUrl: string | null;
  currentVoiceId: string | null;
  play: (url: string, voiceId?: string) => void;
  playFromApi: (voiceId: string) => Promise<string | null>;
  stop: () => void;
  error: string | null;
}

export function useAudioPreview(): UseAudioPreviewReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Nettoyer l'audio lors du démontage
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = (url: string, voiceId?: string) => {
    try {
      // Arrêter l'audio précédent s'il existe
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Si on clique sur le même audio/voice, on l'arrête
      if (voiceId && currentVoiceId === voiceId && isPlaying) {
        stop();
        return;
      }
      if (!voiceId && currentUrl === url && isPlaying) {
        stop();
        return;
      }

      // Créer un nouvel élément audio
      const audio = new Audio(url);
      audioRef.current = audio;

      // Gérer les événements
      audio.onplay = () => {
        setIsPlaying(true);
        setCurrentUrl(url);
        if (voiceId) {
          setCurrentVoiceId(voiceId);
        }
        setError(null);
      };

      audio.onpause = () => {
        setIsPlaying(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentUrl(null);
        setCurrentVoiceId(null);
        audioRef.current = null;
      };

      audio.onerror = (e) => {
        console.error("Audio preview error:", e);
        setError("Impossible de lire l'extrait audio");
        setIsPlaying(false);
        setCurrentUrl(null);
        setCurrentVoiceId(null);
        audioRef.current = null;
      };

      // Lancer la lecture
      audio.play().catch((err) => {
        console.error("Audio play error:", err);
        setError("Impossible de lire l'extrait audio");
        setIsPlaying(false);
        setCurrentUrl(null);
        setCurrentVoiceId(null);
        audioRef.current = null;
      });
    } catch (err) {
      console.error("Audio preview error:", err);
      setError("Erreur lors de la lecture audio");
      setIsPlaying(false);
      setCurrentUrl(null);
      setCurrentVoiceId(null);
    }
  };

  /**
   * Fetch preview audio from API and return blob URL
   * Returns null on error
   */
  const playFromApi = async (voiceId: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `${API_URL}/api/preview-voice?voice_id=${voiceId}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        console.warn("Failed to fetch preview");
        return null;
      }

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Convert response to blob and create object URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      // Play the audio
      audio.play().catch(() => {
        console.warn("Failed to fetch preview");
        URL.revokeObjectURL(url);
      });

      // Store audio reference and voice ID for tracking
      audioRef.current = audio;
      setCurrentVoiceId(voiceId);
      setCurrentUrl(url);

      // Handle audio events
      audio.onplay = () => {
        setIsPlaying(true);
        setError(null);
      };

      audio.onpause = () => {
        setIsPlaying(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentUrl(null);
        setCurrentVoiceId(null);
        audioRef.current = null;
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        console.warn("Failed to fetch preview");
        setIsPlaying(false);
        setCurrentUrl(null);
        setCurrentVoiceId(null);
        audioRef.current = null;
        URL.revokeObjectURL(url);
      };

      return url;
    } catch (err) {
      console.warn("Failed to fetch preview");
      return null;
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Clean up blob URLs
    if (currentUrl && currentUrl.startsWith("blob:")) {
      URL.revokeObjectURL(currentUrl);
    }
    setIsPlaying(false);
    setCurrentUrl(null);
    setCurrentVoiceId(null);
    setError(null);
  };

  return {
    isPlaying,
    currentUrl,
    currentVoiceId,
    play,
    playFromApi,
    stop,
    error,
  };
}
