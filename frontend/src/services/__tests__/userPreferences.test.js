import {
  getPreference,
  setPreference,
  removePreference,
  clearAllPreferences,
  getAllPreferences,
  themePreferences,
  notificationPreferences,
  dashboardPreferences,
  privacyPreferences
} from '../userPreferences';

describe('userPreferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getPreference', () => {
    test('returns default value when preference does not exist', () => {
      const result = getPreference('nonexistent', 'default');
      expect(result).toBe('default');
    });

    test('returns stored value when preference exists', () => {
      localStorage.setItem('impactx_pref_test', JSON.stringify('stored'));
      const result = getPreference('test', 'default');
      expect(result).toBe('stored');
    });

    test('handles JSON parsing errors gracefully', () => {
      localStorage.setItem('impactx_pref_invalid', 'invalid json');
      const result = getPreference('invalid', 'default');
      expect(result).toBe('default');
    });
  });

  describe('setPreference', () => {
    test('stores preference correctly', () => {
      setPreference('test', 'value');
      expect(localStorage.getItem('impactx_pref_test')).toBe(JSON.stringify('value'));
    });

    test('handles JSON stringifying errors gracefully', () => {
      const circular = { a: 1 };
      circular.self = circular;
      
      expect(() => {
        setPreference('circular', circular);
      }).not.toThrow();
    });
  });

  describe('removePreference', () => {
    test('removes preference correctly', () => {
      localStorage.setItem('impactx_pref_test', JSON.stringify('value'));
      removePreference('test');
      expect(localStorage.getItem('impactx_pref_test')).toBeNull();
    });
  });

  describe('clearAllPreferences', () => {
    test('clears all impactx preferences', () => {
      localStorage.setItem('impactx_pref_test1', JSON.stringify('value1'));
      localStorage.setItem('impactx_pref_test2', JSON.stringify('value2'));
      localStorage.setItem('other_pref', JSON.stringify('other'));
      
      clearAllPreferences();
      
      expect(localStorage.getItem('impactx_pref_test1')).toBeNull();
      expect(localStorage.getItem('impactx_pref_test2')).toBeNull();
      expect(localStorage.getItem('other_pref')).not.toBeNull();
    });
  });

  describe('getAllPreferences', () => {
    test('returns all impactx preferences', () => {
      localStorage.setItem('impactx_pref_test1', JSON.stringify('value1'));
      localStorage.setItem('impactx_pref_test2', JSON.stringify('value2'));
      localStorage.setItem('other_pref', JSON.stringify('other'));
      
      const result = getAllPreferences();
      
      expect(result).toEqual({
        test1: 'value1',
        test2: 'value2'
      });
    });
  });

  describe('themePreferences', () => {
    test('getTheme returns default theme', () => {
      expect(themePreferences.getTheme()).toBe('system');
    });

    test('setTheme stores theme correctly', () => {
      themePreferences.setTheme('dark');
      expect(themePreferences.getTheme()).toBe('dark');
    });

    test('getDarkMode returns null by default', () => {
      expect(themePreferences.getDarkMode()).toBeNull();
    });

    test('setDarkMode stores dark mode preference', () => {
      themePreferences.setDarkMode(true);
      expect(themePreferences.getDarkMode()).toBe(true);
    });
  });

  describe('notificationPreferences', () => {
    test('getEmailNotifications returns true by default', () => {
      expect(notificationPreferences.getEmailNotifications()).toBe(true);
    });

    test('setEmailNotifications stores preference correctly', () => {
      notificationPreferences.setEmailNotifications(false);
      expect(notificationPreferences.getEmailNotifications()).toBe(false);
    });

    test('getPushNotifications returns true by default', () => {
      expect(notificationPreferences.getPushNotifications()).toBe(true);
    });

    test('setPushNotifications stores preference correctly', () => {
      notificationPreferences.setPushNotifications(false);
      expect(notificationPreferences.getPushNotifications()).toBe(false);
    });

    test('getNotificationFrequency returns daily by default', () => {
      expect(notificationPreferences.getNotificationFrequency()).toBe('daily');
    });

    test('setNotificationFrequency stores preference correctly', () => {
      notificationPreferences.setNotificationFrequency('weekly');
      expect(notificationPreferences.getNotificationFrequency()).toBe('weekly');
    });
  });

  describe('privacyPreferences', () => {
    test('getAnalyticsConsent returns true by default', () => {
      expect(privacyPreferences.getAnalyticsConsent()).toBe(true);
    });

    test('setAnalyticsConsent stores preference correctly', () => {
      privacyPreferences.setAnalyticsConsent(false);
      expect(privacyPreferences.getAnalyticsConsent()).toBe(false);
    });

    test('getDataSharing returns false by default', () => {
      expect(privacyPreferences.getDataSharing()).toBe(false);
    });

    test('setDataSharing stores preference correctly', () => {
      privacyPreferences.setDataSharing(true);
      expect(privacyPreferences.getDataSharing()).toBe(true);
    });
  });
});