'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  getLanguageGroups,
  searchLanguages,
} from '@/lib/languages';

interface LanguageSelectorProps {
  value: string | undefined; // Code langue sélectionné (ex: "fr-FR")
  onChange: (value: string) => void;
  className?: string;
}

export function LanguageSelector({
  value,
  onChange,
  className = '',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === value);

  // Filtrer les langues selon la recherche
  const filteredLanguages = searchQuery
    ? searchLanguages(searchQuery)
    : SUPPORTED_LANGUAGES;

  // Grouper par groupe géographique
  const groups = getLanguageGroups();
  const languagesByGroup = groups.map((group) => ({
    group,
    languages: filteredLanguages.filter((lang) => lang.group === group),
  })).filter((item) => item.languages.length > 0);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bouton de sélection */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {selectedLanguage ? (
            <>
              <span className="text-2xl flex-shrink-0">{selectedLanguage.flag}</span>
              <div className="flex flex-col items-start min-w-0">
                <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {selectedLanguage.nativeLabel}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {selectedLanguage.label}
                </span>
              </div>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              Sélectionner une langue
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl max-h-96 overflow-hidden flex flex-col">
          {/* Barre de recherche */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une langue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Liste des langues */}
          <div className="overflow-y-auto flex-1">
            {languagesByGroup.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                Aucune langue trouvée
              </div>
            ) : (
              languagesByGroup.map(({ group, languages }) => (
                <div key={group} className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {group}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left ${
                        value === lang.code
                          ? 'bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-500'
                          : ''
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{lang.flag}</span>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {lang.nativeLabel}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {lang.label}
                        </span>
                      </div>
                      {value === lang.code && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

