/**
 * Accessibility service for managing accessibility features
 */

/**
 * Set high contrast mode
 * @param {boolean} enabled - Whether high contrast mode is enabled
 */
export const setHighContrastMode = (enabled) => {
  if (enabled) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
  
  // Store preference
  localStorage.setItem('highContrastMode', enabled.toString());
};

/**
 * Get high contrast mode preference
 * @returns {boolean} Whether high contrast mode is enabled
 */
export const getHighContrastMode = () => {
  const stored = localStorage.getItem('highContrastMode');
  return stored ? stored === 'true' : false;
};

/**
 * Set font size adjustment
 * @param {number} size - Font size multiplier (1 = normal, 1.2 = large, 1.5 = extra large)
 */
export const setFontSize = (size) => {
  document.documentElement.style.fontSize = `${16 * size}px`;
  localStorage.setItem('fontSize', size.toString());
};

/**
 * Get font size adjustment
 * @returns {number} Font size multiplier
 */
export const getFontSize = () => {
  const stored = localStorage.getItem('fontSize');
  return stored ? parseFloat(stored) : 1;
};

/**
 * Set reduced motion preference
 * @param {boolean} enabled - Whether reduced motion is enabled
 */
export const setReducedMotion = (enabled) => {
  if (enabled) {
    document.documentElement.classList.add('reduced-motion');
  } else {
    document.documentElement.classList.remove('reduced-motion');
  }
  
  localStorage.setItem('reducedMotion', enabled.toString());
};

/**
 * Get reduced motion preference
 * @returns {boolean} Whether reduced motion is enabled
 */
export const getReducedMotion = () => {
  const stored = localStorage.getItem('reducedMotion');
  return stored ? stored === 'true' : false;
};

/**
 * Set focus visible preference
 * @param {boolean} enabled - Whether focus visible is enabled
 */
export const setFocusVisible = (enabled) => {
  if (enabled) {
    document.documentElement.classList.add('focus-visible');
  } else {
    document.documentElement.classList.remove('focus-visible');
  }
  
  localStorage.setItem('focusVisible', enabled.toString());
};

/**
 * Get focus visible preference
 * @returns {boolean} Whether focus visible is enabled
 */
export const getFocusVisible = () => {
  const stored = localStorage.getItem('focusVisible');
  return stored ? stored === 'true' : true; // Default to true
};

/**
 * Apply accessibility preferences on app load
 */
export const applyAccessibilityPreferences = () => {
  // Apply high contrast mode
  if (getHighContrastMode()) {
    setHighContrastMode(true);
  }
  
  // Apply font size
  setFontSize(getFontSize());
  
  // Apply reduced motion
  if (getReducedMotion()) {
    setReducedMotion(true);
  }
  
  // Apply focus visible
  if (getFocusVisible()) {
    setFocusVisible(true);
  }
};

/**
 * Skip to main content
 * @param {string} targetId - ID of the main content element
 */
export const skipToContent = (targetId) => {
  const target = document.getElementById(targetId);
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus();
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} type - Type of announcement (polite, assertive)
 */
export const announceToScreenReader = (message, type = 'polite') => {
  // Create or get announcement element
  let announcement = document.getElementById('screen-reader-announcement');
  if (!announcement) {
    announcement = document.createElement('div');
    announcement.id = 'screen-reader-announcement';
    announcement.setAttribute('aria-live', type);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);
  }
  
  // Set message
  announcement.textContent = message;
};

/**
 * Get accessibility preferences
 * @returns {object} Current accessibility preferences
 */
export const getAccessibilityPreferences = () => {
  return {
    highContrast: getHighContrastMode(),
    fontSize: getFontSize(),
    reducedMotion: getReducedMotion(),
    focusVisible: getFocusVisible()
  };
};

/**
 * Reset accessibility preferences to defaults
 */
export const resetAccessibilityPreferences = () => {
  setHighContrastMode(false);
  setFontSize(1);
  setReducedMotion(false);
  setFocusVisible(true);
  
  // Clear localStorage
  localStorage.removeItem('highContrastMode');
  localStorage.removeItem('fontSize');
  localStorage.removeItem('reducedMotion');
  localStorage.removeItem('focusVisible');
};