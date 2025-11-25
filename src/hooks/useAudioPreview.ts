/**
 * Hook pour la préécoute d'extraits audio
 * Gère la lecture d'un seul audio à la fois
 */

import { useState, useRef, useEffect } from 'react';

export interface UseAudioPreviewReturn {
  isPlaying: boolean;
  currentUrl: string | null;
  play: (url: string) => void;
  stop: () => void;
  error: string | null;
}

export function useAudioPreview(): UseAudioPreviewReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
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

  const play = (url: string) => {
    try {
      // Arrêter l'audio précédent s'il existe
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Si on clique sur le même audio, on l'arrête
      if (currentUrl === url && isPlaying) {
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
        setError(null);
      };

      audio.onpause = () => {
        setIsPlaying(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentUrl(null);
        audioRef.current = null;
      };

      audio.onerror = (e) => {
        console.error('Audio preview error:', e);
        setError('Impossible de lire l\'extrait audio');
        setIsPlaying(false);
        setCurrentUrl(null);
        audioRef.current = null;
      };

      // Lancer la lecture
      audio.play().catch((err) => {
        console.error('Audio play error:', err);
        setError('Impossible de lire l\'extrait audio');
        setIsPlaying(false);
        setCurrentUrl(null);
        audioRef.current = null;
      });
    } catch (err) {
      console.error('Audio preview error:', err);
      setError('Erreur lors de la lecture audio');
      setIsPlaying(false);
      setCurrentUrl(null);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentUrl(null);
    setError(null);
  };

  return {
    isPlaying,
    currentUrl,
    play,
    stop,
    error,
  };
}

