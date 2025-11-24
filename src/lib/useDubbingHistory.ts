// Hook to fetch dubbing history from the backend API
'use client';

import { useState, useEffect } from 'react';

/**
 * Interface for a dubbing history entry
 */
export interface DubbingHistoryEntry {
  id: string;
  inputName: string;
  outputFileName: string;
  creditsUsed: number;
  timestamp: string;
}

/**
 * Hook to fetch and manage dubbing history
 * @returns {Object} { history, isLoading, error }
 */
export function useDubbingHistory() {
  const [history, setHistory] = useState<DubbingHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
          throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
        }

        const response = await fetch(`${backendUrl}/api/dubbing/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': 'TEST_USER_HISTORY' // Placeholder for future authentication
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch history: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.ok && Array.isArray(data.history)) {
          setHistory(data.history);
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('❌ Error fetching dubbing history:', err);
        setHistory([]); // Reset history on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []); // Empty dependency array - fetch only on mount

  return { history, isLoading, error };
}

