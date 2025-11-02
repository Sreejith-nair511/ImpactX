import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LanguageIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { 
  getLanguage, 
  setLanguage, 
  getSupportedLanguages,
  t
} from '../../services/i18n';

const LanguageSelector = ({ 
  className = '',
  showLabel = true,
  showFlags = false,
  variant = 'dropdown' // 'dropdown' or 'list'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
  const supportedLanguages = getSupportedLanguages();

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    
    // Reload page to apply language changes
    window.location.reload();
  };

  const getLanguageName = (code) => {
    const names = {
      en: { name: 'English', flag: '🇺🇸' },
      es: { name: 'Español', flag: '🇪🇸' },
      fr: { name: 'Français', flag: '🇫🇷' },
      de: { name: 'Deutsch', flag: '🇩🇪' },
      hi: { name: 'हिन्दी', flag: '🇮🇳' },
      zh: { name: '中文', flag: '🇨🇳' }
    };
    
    return names[code] || { name: code, flag: '🏳️' };
  };

  if (variant === 'list') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {Object.keys(supportedLanguages).map((code) => {
          const { name, flag } = getLanguageName(code);
          const isActive = code === currentLanguage;
          
          return (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`flex items-center px-3 py-1.5 text-sm rounded-full transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-label={`Switch to ${name}`}
            >
              {showFlags && <span className="mr-2">{flag}</span>}
              <span>{name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <LanguageIcon className="h-5 w-5" />
        {showLabel && (
          <span>{getLanguageName(currentLanguage).name}</span>
        )}
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="py-1">
                {Object.keys(supportedLanguages).map((code) => {
                  const { name, flag } = getLanguageName(code);
                  const isActive = code === currentLanguage;
                  
                  return (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full flex items-center px-4 py-2 text-sm ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      aria-label={`Switch to ${name}`}
                    >
                      {showFlags && <span className="mr-2">{flag}</span>}
                      <span>{name}</span>
                      {isActive && (
                        <svg className="h-4 w-4 ml-auto text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;