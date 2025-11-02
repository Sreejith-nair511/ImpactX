import React from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import { useThemePreferences } from '../../hooks/usePreferences';

const ThemeSwitcher = ({ 
  className = '',
  size = 'md',
  showLabels = true,
  showSystemOption = true
}) => {
  const { theme, updateTheme } = useThemePreferences();
  
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };
  
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleThemeChange = (newTheme) => {
    updateTheme(newTheme);
  };

  const getThemeIcon = (themeType) => {
    switch (themeType) {
      case 'light':
        return <SunIcon className={iconSizeClasses[size]} />;
      case 'dark':
        return <MoonIcon className={iconSizeClasses[size]} />;
      case 'system':
        return <ComputerDesktopIcon className={iconSizeClasses[size]} />;
      default:
        return <SwatchIcon className={iconSizeClasses[size]} />;
    }
  };

  const getThemeLabel = (themeType) => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Theme';
    }
  };

  const themes = showSystemOption 
    ? ['light', 'dark', 'system'] 
    : ['light', 'dark'];

  return (
    <div className={`inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
      {themes.map((themeOption) => (
        <motion.button
          key={themeOption}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleThemeChange(themeOption)}
          className={`flex items-center justify-center rounded-md transition-all duration-200 ${
            sizeClasses[size]
          } ${
            theme === themeOption
              ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label={`Switch to ${getThemeLabel(themeOption)} theme`}
          aria-pressed={theme === themeOption}
        >
          {getThemeIcon(themeOption)}
          {showLabels && (
            <span className="ml-2 text-sm font-medium">
              {getThemeLabel(themeOption)}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

// ThemeSwitcher.Dropdown component for dropdown version
ThemeSwitcher.Dropdown = ({ 
  className = '',
  buttonClassName = '',
  dropdownClassName = ''
}) => {
  const { theme, updateTheme } = useThemePreferences();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleThemeChange = (newTheme) => {
    updateTheme(newTheme);
    setIsOpen(false);
  };

  const getThemeDisplay = () => {
    switch (theme) {
      case 'light':
        return { icon: <SunIcon className="h-5 w-5" />, label: 'Light' };
      case 'dark':
        return { icon: <MoonIcon className="h-5 w-5" />, label: 'Dark' };
      case 'system':
        return { icon: <ComputerDesktopIcon className="h-5 w-5" />, label: 'System' };
      default:
        return { icon: <SwatchIcon className="h-5 w-5" />, label: 'Theme' };
    }
  };

  const { icon, label } = getThemeDisplay();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${buttonClassName}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {icon}
        <span>{label}</span>
        <svg 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

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
            className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden ${dropdownClassName}`}
          >
            <div className="py-1">
              <button
                onClick={() => handleThemeChange('light')}
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme === 'light'
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SunIcon className="h-5 w-5 mr-3" />
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme === 'dark'
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MoonIcon className="h-5 w-5 mr-3" />
                Dark
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  theme === 'system'
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ComputerDesktopIcon className="h-5 w-5 mr-3" />
                System
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;