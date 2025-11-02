import { useState, useEffect, useCallback } from 'react';
import * as reportsService from '../services/reportsService';

/**
 * Custom hook for managing impact reports and analytics
 * @param {string} userId - User ID
 * @returns {object} Reports management functions and state
 */
export const useReports = (userId) => {
  const [impactReport, setImpactReport] = useState(null);
  const [projectReport, setProjectReport] = useState(null);
  const [donorReport, setDonorReport] = useState(null);
  const [financialReport, setFinancialReport] = useState(null);
  const [performanceReport, setPerformanceReport] = useState(null);
  const [partnershipReport, setPartnershipReport] = useState(null);
  const [reportTemplates, setReportTemplates] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch impact report
   */
  const fetchImpactReport = useCallback(async (options = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await reportsService.getImpactReport(userId, options);
      setImpactReport(data);
    } catch (err) {
      setError(err.message || 'Failed to load impact report');
      console.error('Error fetching impact report:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Fetch project report
   */
  const fetchProjectReport = useCallback(async (projectId, options = {}) => {
    if (!projectId) return;
    
    try {
      const data = await reportsService.getProjectReport(projectId, options);
      setProjectReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load project report');
      console.error('Error fetching project report:', err);
      throw err;
    }
  }, []);

  /**
   * Fetch donor report
   */
  const fetchDonorReport = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await reportsService.getDonorReport(userId, options);
      setDonorReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load donor report');
      console.error('Error fetching donor report:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Fetch financial report
   */
  const fetchFinancialReport = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await reportsService.getFinancialReport(userId, options);
      setFinancialReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load financial report');
      console.error('Error fetching financial report:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Fetch performance report
   */
  const fetchPerformanceReport = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await reportsService.getPerformanceReport(userId, options);
      setPerformanceReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load performance report');
      console.error('Error fetching performance report:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Fetch partnership report
   */
  const fetchPartnershipReport = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await reportsService.getPartnershipReport(userId, options);
      setPartnershipReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load partnership report');
      console.error('Error fetching partnership report:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Generate custom report
   * @param {object} reportConfig - Report configuration
   */
  const generateCustomReport = useCallback(async (reportConfig) => {
    if (!userId) return;
    
    try {
      const response = await reportsService.generateCustomReport(userId, reportConfig);
      
      // Add to report history
      setReportHistory(prev => [response.report, ...prev]);
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to generate custom report');
      console.error('Error generating custom report:', err);
      throw err;
    }
  }, [userId]);

  /**
   * Export report
   * @param {string} reportId - Report ID
   * @param {string} format - Export format
   */
  const exportReport = useCallback(async (reportId, format = 'pdf') => {
    try {
      const response = await reportsService.exportReport(reportId, format);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to export report');
      console.error('Error exporting report:', err);
      throw err;
    }
  }, []);

  /**
   * Fetch report templates
   */
  const fetchReportTemplates = useCallback(async () => {
    try {
      const data = await reportsService.getReportTemplates();
      setReportTemplates(data);
    } catch (err) {
      console.error('Error fetching report templates:', err);
    }
  }, []);

  /**
   * Create report template
   * @param {object} templateData - Template data
   */
  const createReportTemplate = useCallback(async (templateData) => {
    try {
      const response = await reportsService.createReportTemplate(templateData);
      setReportTemplates(prev => [response.template, ...prev]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to create report template');
      console.error('Error creating report template:', err);
      throw err;
    }
  }, []);

  /**
   * Update report template
   * @param {string} templateId - Template ID
   * @param {object} templateData - Updated template data
   */
  const updateReportTemplate = useCallback(async (templateId, templateData) => {
    try {
      const response = await reportsService.updateReportTemplate(templateId, templateData);
      setReportTemplates(prev => 
        prev.map(template => 
          template.id === templateId ? response.template : template
        )
      );
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update report template');
      console.error('Error updating report template:', err);
      throw err;
    }
  }, []);

  /**
   * Delete report template
   * @param {string} templateId - Template ID
   */
  const deleteReportTemplate = useCallback(async (templateId) => {
    try {
      await reportsService.deleteReportTemplate(templateId);
      setReportTemplates(prev => prev.filter(template => template.id !== templateId));
    } catch (err) {
      setError(err.message || 'Failed to delete report template');
      console.error('Error deleting report template:', err);
      throw err;
    }
  }, []);

  /**
   * Fetch report history
   */
  const fetchReportHistory = useCallback(async (options = {}) => {
    if (!userId) return;
    
    try {
      const data = await reportsService.getReportHistory(userId, options);
      setReportHistory(data);
    } catch (err) {
      console.error('Error fetching report history:', err);
    }
  }, [userId]);

  /**
   * Fetch report analytics
   * @param {string} reportId - Report ID
   * @param {object} options - Query options
   */
  const fetchReportAnalytics = useCallback(async (reportId, options = {}) => {
    try {
      const data = await reportsService.getReportAnalytics(reportId, options);
      setAnalytics(data);
      return data;
    } catch (err) {
      console.error('Error fetching report analytics:', err);
      return null;
    }
  }, []);

  /**
   * Fetch impact metrics
   * @param {object} options - Query options
   */
  const getImpactMetrics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const metrics = await reportsService.getImpactMetrics(userId, options);
      return metrics;
    } catch (err) {
      console.error('Error fetching impact metrics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Fetch engagement metrics
   * @param {object} options - Query options
   */
  const getEngagementMetrics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const metrics = await reportsService.getEngagementMetrics(userId, options);
      return metrics;
    } catch (err) {
      console.error('Error fetching engagement metrics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Fetch productivity metrics
   * @param {object} options - Query options
   */
  const getProductivityMetrics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const metrics = await reportsService.getProductivityMetrics(userId, options);
      return metrics;
    } catch (err) {
      console.error('Error fetching productivity metrics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Fetch trend analysis
   * @param {object} options - Query options
   */
  const getTrendAnalysis = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const analysis = await reportsService.getTrendAnalysis(userId, options);
      return analysis;
    } catch (err) {
      console.error('Error fetching trend analysis:', err);
      return null;
    }
  }, [userId]);

  /**
   * Fetch comparative analysis
   * @param {object} options - Query options
   */
  const getComparativeAnalysis = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const analysis = await reportsService.getComparativeAnalysis(userId, options);
      return analysis;
    } catch (err) {
      console.error('Error fetching comparative analysis:', err);
      return null;
    }
  }, [userId]);

  /**
   * Fetch predictive analytics
   * @param {object} options - Query options
   */
  const getPredictiveAnalytics = useCallback(async (options = {}) => {
    if (!userId) return null;
    
    try {
      const analytics = await reportsService.getPredictiveAnalytics(userId, options);
      return analytics;
    } catch (err) {
      console.error('Error fetching predictive analytics:', err);
      return null;
    }
  }, [userId]);

  /**
   * Fetch report notifications
   * @param {object} options - Query options
   */
  const getNotifications = useCallback(async (options = {}) => {
    try {
      const notifications = await reportsService.getReportNotifications(options);
      return notifications;
    } catch (err) {
      console.error('Error fetching report notifications:', err);
      return [];
    }
  }, []);

  /**
   * Mark report notification as read
   * @param {string} notificationId - Notification ID
   */
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await reportsService.markReportNotificationAsRead(notificationId);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  // Fetch initial data on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchImpactReport();
      fetchReportTemplates();
      fetchReportHistory();
    }
  }, [userId, fetchImpactReport, fetchReportTemplates, fetchReportHistory]);

  return {
    impactReport,
    projectReport,
    donorReport,
    financialReport,
    performanceReport,
    partnershipReport,
    reportTemplates,
    reportHistory,
    analytics,
    loading,
    error,
    fetchImpactReport,
    fetchProjectReport,
    fetchDonorReport,
    fetchFinancialReport,
    fetchPerformanceReport,
    fetchPartnershipReport,
    generateCustomReport,
    exportReport,
    fetchReportTemplates,
    createReportTemplate,
    updateReportTemplate,
    deleteReportTemplate,
    fetchReportHistory,
    fetchReportAnalytics,
    getImpactMetrics,
    getEngagementMetrics,
    getProductivityMetrics,
    getTrendAnalysis,
    getComparativeAnalysis,
    getPredictiveAnalytics,
    getNotifications,
    markNotificationAsRead
  };
};

export default useReports;