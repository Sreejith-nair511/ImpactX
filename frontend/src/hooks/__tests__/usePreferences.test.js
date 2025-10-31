import { renderHook, act } from '@testing-library/react';
import {
  useThemePreferences,
  useNotificationPreferences,
  usePrivacyPreferences,
  useDashboardPreferences
} from '../usePreferences';

// Mock the userPreferences service
jest.mock('../../services/userPreferences', () => ({
  themePreferences: {
    getTheme: jest.fn(() => 'system'),
    setTheme: jest.fn(),
    getDarkMode: jest.fn(() => null),
    setDarkMode: jest.fn()
  },
  notificationPreferences: {
    getEmailNotifications: jest.fn(() => true),
    setEmailNotifications: jest.fn(),
    getPushNotifications: jest.fn(() => true),
    setPushNotifications: jest.fn(),
    getNotificationFrequency: jest.fn(() => 'daily'),
    setNotificationFrequency: jest.fn()
  },
  dashboardPreferences: {
    getVisibleWidgets: jest.fn(() => ['donations', 'projects', 'impact', 'geographic']),
    setVisibleWidgets: jest.fn(),
    getChartType: jest.fn(() => 'line'),
    setChartType: jest.fn(),
    getDataRange: jest.fn(() => 'last30days'),
    setDataRange: jest.fn()
  },
  privacyPreferences: {
    getAnalyticsConsent: jest.fn(() => true),
    setAnalyticsConsent: jest.fn(),
    getDataSharing: jest.fn(() => false),
    setDataSharing: jest.fn()
  }
}));

describe('usePreferences', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('useThemePreferences', () => {
    test('returns initial theme and dark mode values', () => {
      const { result } = renderHook(() => useThemePreferences());

      expect(result.current.theme).toBe('system');
      expect(result.current.darkMode).toBeNull();
    });

    test('updates theme correctly', () => {
      const { result } = renderHook(() => useThemePreferences());

      act(() => {
        result.current.updateTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });

    test('toggles dark mode correctly', () => {
      const { result } = renderHook(() => useThemePreferences());

      act(() => {
        result.current.toggleDarkMode(true);
      });

      expect(result.current.darkMode).toBe(true);
    });
  });

  describe('useNotificationPreferences', () => {
    test('returns initial notification preference values', () => {
      const { result } = renderHook(() => useNotificationPreferences());

      expect(result.current.emailNotifications).toBe(true);
      expect(result.current.pushNotifications).toBe(true);
      expect(result.current.notificationFrequency).toBe('daily');
    });

    test('updates email notifications correctly', () => {
      const { result } = renderHook(() => useNotificationPreferences());

      act(() => {
        result.current.updateEmailNotifications(false);
      });

      expect(result.current.emailNotifications).toBe(false);
    });

    test('updates push notifications correctly', () => {
      const { result } = renderHook(() => useNotificationPreferences());

      act(() => {
        result.current.updatePushNotifications(false);
      });

      expect(result.current.pushNotifications).toBe(false);
    });

    test('updates notification frequency correctly', () => {
      const { result } = renderHook(() => useNotificationPreferences());

      act(() => {
        result.current.updateNotificationFrequency('weekly');
      });

      expect(result.current.notificationFrequency).toBe('weekly');
    });
  });

  describe('usePrivacyPreferences', () => {
    test('returns initial privacy preference values', () => {
      const { result } = renderHook(() => usePrivacyPreferences());

      expect(result.current.analyticsConsent).toBe(true);
      expect(result.current.dataSharing).toBe(false);
    });

    test('updates analytics consent correctly', () => {
      const { result } = renderHook(() => usePrivacyPreferences());

      act(() => {
        result.current.updateAnalyticsConsent(false);
      });

      expect(result.current.analyticsConsent).toBe(false);
    });

    test('updates data sharing correctly', () => {
      const { result } = renderHook(() => usePrivacyPreferences());

      act(() => {
        result.current.updateDataSharing(true);
      });

      expect(result.current.dataSharing).toBe(true);
    });
  });

  describe('useDashboardPreferences', () => {
    test('returns initial dashboard preference values', () => {
      const { result } = renderHook(() => useDashboardPreferences());

      expect(result.current.visibleWidgets).toEqual(['donations', 'projects', 'impact', 'geographic']);
      expect(result.current.chartType).toBe('line');
      expect(result.current.dataRange).toBe('last30days');
    });

    test('updates visible widgets correctly', () => {
      const { result } = renderHook(() => useDashboardPreferences());
      const newWidgets = ['donations', 'impact'];

      act(() => {
        result.current.updateVisibleWidgets(newWidgets);
      });

      expect(result.current.visibleWidgets).toEqual(newWidgets);
    });

    test('updates chart type correctly', () => {
      const { result } = renderHook(() => useDashboardPreferences());

      act(() => {
        result.current.updateChartType('bar');
      });

      expect(result.current.chartType).toBe('bar');
    });

    test('updates data range correctly', () => {
      const { result } = renderHook(() => useDashboardPreferences());

      act(() => {
        result.current.updateDataRange('last7days');
      });

      expect(result.current.dataRange).toBe('last7days');
    });
  });
});