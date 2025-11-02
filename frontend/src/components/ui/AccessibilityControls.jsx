import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AdjustmentsHorizontalIcon,
  SunIcon,
  MoonIcon,
  ArrowsPointingOutIcon,
  EyeIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import {
  getAccessibilityPreferences,
  setHighContrastMode,
  setFontSize,
  setReducedMotion,
  setFocusVisible
} from '../../services/accessibility';

const AccessibilityControls = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    highContrast: false,
    fontSize: 1,
    reducedMotion: false,
    focusVisible: true
  });

  useEffect(() => {
    // Load preferences on mount
    const loadedPreferences = getAccessibilityPreferences();
    setPreferences(loadedPreferences);
  }, []);

  const toggleHighContrast = () => {
    const newValue = !preferences.highContrast;
    setHighContrastMode(newValue);
    setPreferences(prev => ({ ...prev, highContrast: newValue }));
  };

  const adjustFontSize = (size) => {
    setFontSize(size);
    setPreferences(prev => ({ ...prev, fontSize: size }));
  };

  const toggleReducedMotion = () => {
    const newValue = !preferences.reducedMotion;
    setReducedMotion(newValue);
    setPreferences(prev => ({ ...prev, reducedMotion: newValue }));
  };

  const toggleFocusVisible = () => {
    const newValue = !preferences.focusVisible;
    setFocusVisible(newValue);
    setPreferences(prev => ({ ...prev, focusVisible: newValue }));
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors"
        aria-label="Accessibility controls"
        aria-expanded={isOpen}
      >
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h3 className="text-lg font-medium">Accessibility Settings</h3>
                <p className="text-sm text-indigo-200">Customize your experience</p>
              </div>
              
              <div className="p-4 space-y-6">
                {/* High Contrast Mode */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ArrowsPointingOutIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">High Contrast</span>
                    </div>
                    <button
                      onClick={toggleHighContrast}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        preferences.highContrast ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label="Toggle high contrast mode"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Increases color contrast for better visibility
                  </p>
                </div>
                
                {/* Font Size */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Text Size</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {preferences.fontSize === 1 ? 'Normal' : 
                       preferences.fontSize === 1.2 ? 'Large' : 
                       preferences.fontSize === 1.5 ? 'Extra Large' : 
                       `${Math.round(preferences.fontSize * 100)}%`}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => adjustFontSize(1)}
                      className={`flex-1 py-2 px-3 text-xs rounded-lg border ${
                        preferences.fontSize === 1
                          ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-200'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => adjustFontSize(1.2)}
                      className={`flex-1 py-2 px-3 text-sm rounded-lg border ${
                        preferences.fontSize === 1.2
                          ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-200'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => adjustFontSize(1.5)}
                      className={`flex-1 py-2 px-3 text-lg rounded-lg border ${
                        preferences.fontSize === 1.5
                          ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-200'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      A
                    </button>
                  </div>
                </div>
                
                {/* Reduced Motion */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {preferences.reducedMotion ? (
                        <SpeakerXMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      ) : (
                        <SpeakerWaveIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Reduced Motion</span>
                    </div>
                    <button
                      onClick={toggleReducedMotion}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        preferences.reducedMotion ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label="Toggle reduced motion"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Minimize animations and transitions
                  </p>
                </div>
                
                {/* Focus Visible */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Focus Indicators</span>
                    </div>
                    <button
                      onClick={toggleFocusVisible}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        preferences.focusVisible ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label="Toggle focus indicators"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.focusVisible ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Show focus rings for keyboard navigation
                  </p>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityControls;