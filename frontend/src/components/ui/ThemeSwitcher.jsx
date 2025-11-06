import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Monitor, Contrast, Type, Palette } from 'lucide-react';

/**
 * Theme Switcher Component
 * Provides UI controls for changing application theme and accessibility settings
 */
const ThemeSwitcher = ({ className = '', showLabels = true }) => {
  const { 
    theme, 
    highContrast, 
    fontSize, 
    toggleTheme, 
    setThemeMode, 
    toggleHighContrast, 
    setFontSizeMode 
  } = useTheme();

  return (
    <div className={`theme-switcher ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Theme Mode Selection */}
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {showLabels && 'Theme'}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setThemeMode('light')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                theme === 'light'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label="Light theme"
            >
              <Sun size={16} />
              {showLabels && <span className="text-xs mt-1">Light</span>}
            </button>
            
            <button
              onClick={() => setThemeMode('dark')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                theme === 'dark'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label="Dark theme"
            >
              <Moon size={16} />
              {showLabels && <span className="text-xs mt-1">Dark</span>}
            </button>
            
            <button
              onClick={() => setThemeMode('system')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                theme === 'system'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label="System theme"
            >
              <Monitor size={16} />
              {showLabels && <span className="text-xs mt-1">System</span>}
            </button>
          </div>
        </div>
        
        {/* Accessibility Options */}
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {showLabels && 'Accessibility'}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={toggleHighContrast}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                highContrast
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
            >
              <Contrast size={16} />
              {showLabels && <span className="text-xs mt-1">Contrast</span>}
            </button>
            
            <button
              onClick={() => setFontSizeMode(fontSize === 'small' ? 'medium' : 'small')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                fontSize === 'small'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label={fontSize === 'small' ? "Normal text size" : "Small text size"}
            >
              <Type size={16} />
              {showLabels && <span className="text-xs mt-1">Small</span>}
            </button>
            
            <button
              onClick={() => setFontSizeMode(fontSize === 'large' ? 'medium' : 'large')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                fontSize === 'large'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label={fontSize === 'large' ? "Normal text size" : "Large text size"}
            >
              <span className="text-lg font-bold">T</span>
              {showLabels && <span className="text-xs mt-1">Large</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;