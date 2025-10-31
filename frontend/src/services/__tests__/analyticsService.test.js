import {
  trackPageView,
  trackEvent,
  identifyUser,
  getPlatformMetrics,
  getImpactData,
  getGeographicData,
  getUserEngagement
} from '../analyticsService';

describe('analyticsService', () => {
  beforeEach(() => {
    // Mock console.log to avoid output during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.log
    jest.restoreAllMocks();
  });

  describe('trackPageView', () => {
    test('logs page view with properties', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      
      trackPageView('Dashboard', { userId: '123' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Page viewed: Dashboard',
        { userId: '123' }
      );
    });

    test('calls window.analytics.page when available', () => {
      // Mock window.analytics
      window.analytics = {
        page: jest.fn()
      };
      
      trackPageView('Dashboard', { userId: '123' });
      
      expect(window.analytics.page).toHaveBeenCalledWith(
        'Dashboard',
        { userId: '123' }
      );
      
      // Clean up
      delete window.analytics;
    });
  });

  describe('trackEvent', () => {
    test('logs event with properties', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      
      trackEvent('Button Clicked', { buttonId: 'submit' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Event tracked: Button Clicked',
        { buttonId: 'submit' }
      );
    });

    test('calls window.analytics.track when available', () => {
      // Mock window.analytics
      window.analytics = {
        track: jest.fn()
      };
      
      trackEvent('Button Clicked', { buttonId: 'submit' });
      
      expect(window.analytics.track).toHaveBeenCalledWith(
        'Button Clicked',
        { buttonId: 'submit' }
      );
      
      // Clean up
      delete window.analytics;
    });
  });

  describe('identifyUser', () => {
    test('logs user identification with traits', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      
      identifyUser('user123', { name: 'John Doe', email: 'john@example.com' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'User identified: user123',
        { name: 'John Doe', email: 'john@example.com' }
      );
    });

    test('calls window.analytics.identify when available', () => {
      // Mock window.analytics
      window.analytics = {
        identify: jest.fn()
      };
      
      identifyUser('user123', { name: 'John Doe', email: 'john@example.com' });
      
      expect(window.analytics.identify).toHaveBeenCalledWith(
        'user123',
        { name: 'John Doe', email: 'john@example.com' }
      );
      
      // Clean up
      delete window.analytics;
    });
  });

  describe('getPlatformMetrics', () => {
    test('returns platform metrics', async () => {
      const metrics = await getPlatformMetrics();
      
      expect(metrics).toEqual({
        totalDonations: 1250000,
        activeProjects: 42,
        verifiedImpact: 98.7,
        donorCount: 15420,
        ngoPartners: 87,
        countriesReached: 23,
        lastUpdated: expect.any(String)
      });
    });
  });

  describe('getImpactData', () => {
    test('returns impact data', async () => {
      const data = await getImpactData();
      
      expect(data).toHaveLength(6);
      expect(data[0]).toEqual({
        month: 'Jan',
        donations: 45000,
        impact: 1200
      });
    });
  });

  describe('getGeographicData', () => {
    test('returns geographic data', async () => {
      const data = await getGeographicData();
      
      expect(data).toHaveLength(5);
      expect(data[0]).toEqual({
        country: 'India',
        projects: 15,
        donations: 420000,
        impact: 12500
      });
    });
  });

  describe('getUserEngagement', () => {
    test('returns user engagement metrics', async () => {
      const data = await getUserEngagement();
      
      expect(data).toEqual({
        dailyActiveUsers: 1240,
        monthlyActiveUsers: 8750,
        avgSessionDuration: 420,
        bounceRate: 32.5,
        topPages: [
          { page: '/dashboard', visits: 3420 },
          { page: '/projects', visits: 2890 },
          { page: '/impact', visits: 2100 },
          { page: '/donate', visits: 1870 },
          { page: '/analytics', visits: 1560 }
        ]
      });
    });
  });
});