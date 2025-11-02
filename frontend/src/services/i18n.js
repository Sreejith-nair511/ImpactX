/**
 * Internationalization service for handling multiple languages
 */

// Supported languages
const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिन्दी',
  zh: '中文'
};

// Default translations
const DEFAULT_TRANSLATIONS = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.donate': 'Donate',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    
    // Pages
    'page.home.title': 'Welcome to ImpactX',
    'page.projects.title': 'Our Projects',
    'page.donate.title': 'Make a Donation',
    'page.analytics.title': 'Analytics Dashboard',
    'page.settings.title': 'User Settings',
    
    // Components
    'component.search.placeholder': 'Search...',
    'component.pagination.previous': 'Previous',
    'component.pagination.next': 'Next',
    'component.notification.close': 'Close',
    
    // Accessibility
    'accessibility.skipToContent': 'Skip to main content',
    'accessibility.openMenu': 'Open menu',
    'accessibility.closeMenu': 'Close menu'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.donate': 'Donar',
    'nav.analytics': 'Analíticas',
    'nav.settings': 'Configuración',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.view': 'Ver',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    
    // Pages
    'page.home.title': 'Bienvenido a ImpactX',
    'page.projects.title': 'Nuestros Proyectos',
    'page.donate.title': 'Hacer una Donación',
    'page.analytics.title': 'Panel de Analíticas',
    'page.settings.title': 'Configuración de Usuario',
    
    // Components
    'component.search.placeholder': 'Buscar...',
    'component.pagination.previous': 'Anterior',
    'component.pagination.next': 'Siguiente',
    'component.notification.close': 'Cerrar',
    
    // Accessibility
    'accessibility.skipToContent': 'Saltar al contenido principal',
    'accessibility.openMenu': 'Abrir menú',
    'accessibility.closeMenu': 'Cerrar menú'
  }
};

/**
 * Set current language
 * @param {string} language - Language code
 */
export const setLanguage = (language) => {
  if (SUPPORTED_LANGUAGES[language]) {
    localStorage.setItem('language', language);
  }
};

/**
 * Get current language
 * @returns {string} Current language code
 */
export const getLanguage = () => {
  const stored = localStorage.getItem('language');
  return stored && SUPPORTED_LANGUAGES[stored] ? stored : 'en';
};

/**
 * Get supported languages
 * @returns {object} Supported languages
 */
export const getSupportedLanguages = () => {
  return SUPPORTED_LANGUAGES;
};

/**
 * Get translations for a language
 * @param {string} language - Language code
 * @returns {object} Translations
 */
export const getTranslations = (language = getLanguage()) => {
  return DEFAULT_TRANSLATIONS[language] || DEFAULT_TRANSLATIONS.en;
};

/**
 * Translate a key
 * @param {string} key - Translation key
 * @param {object} params - Parameters for interpolation
 * @param {string} language - Language code
 * @returns {string} Translated string
 */
export const t = (key, params = {}, language = getLanguage()) => {
  const translations = getTranslations(language);
  let translation = translations[key] || key;
  
  // Handle parameter interpolation
  Object.keys(params).forEach(param => {
    translation = translation.replace(`{{${param}}}`, params[param]);
  });
  
  return translation;
};

/**
 * Format currency for locale
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @param {string} language - Language code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'USD', language = getLanguage()) => {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format date for locale
 * @param {string|Date} date - Date to format
 * @param {string} language - Language code
 * @returns {string} Formatted date
 */
export const formatDate = (date, language = getLanguage()) => {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

/**
 * Format number for locale
 * @param {number} number - Number to format
 * @param {string} language - Language code
 * @returns {string} Formatted number
 */
export const formatNumber = (number, language = getLanguage()) => {
  return new Intl.NumberFormat(language).format(number);
};

/**
 * Get direction for language
 * @param {string} language - Language code
 * @returns {string} Text direction (ltr or rtl)
 */
export const getTextDirection = (language = getLanguage()) => {
  // Languages that use right-to-left text direction
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

/**
 * Apply language to document
 * @param {string} language - Language code
 */
export const applyLanguage = (language = getLanguage()) => {
  document.documentElement.lang = language;
  document.documentElement.dir = getTextDirection(language);
  
  // Update title if available
  const translations = getTranslations(language);
  if (translations['page.home.title']) {
    document.title = translations['page.home.title'];
  }
};

/**
 * Initialize internationalization
 */
export const initI18n = () => {
  const language = getLanguage();
  applyLanguage(language);
};

// Export utilities
export { SUPPORTED_LANGUAGES, DEFAULT_TRANSLATIONS };