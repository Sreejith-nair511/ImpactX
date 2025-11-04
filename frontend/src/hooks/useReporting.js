import { useState, useEffect, useCallback } from 'react';
import * as reportingService from '../services/reportingService';

/**
 * Custom hook for managing project reporting and analytics
 * @param {string} projectId - The ID of the project
 * @param {Object} options - Configuration options
 * @returns {Object} Reporting state and actions
 */
export const useReporting = (projectId, options = {}) => {
  const [report, setReport] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [impactMetrics, setImpactMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch project report
  const fetchReport = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await reportingService.getProjectReport(projectId, fetchOptions);
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Generate custom report
  const generateCustomReport = useCallback(async (reportConfig) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newReport = await reportingService.generateCustomReport(projectId, reportConfig);
      setReport(newReport);
      return newReport;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Export report
  const exportReport = useCallback(async (reportId, format = 'pdf') => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const blob = await reportingService.exportReport(projectId, reportId, format);
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${reportId}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return blob;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch report templates
  const fetchTemplates = useCallback(async (fetchOptions = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await reportingService.getReportTemplates(fetchOptions);
      setTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Create report template
  const createTemplate = useCallback(async (templateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newTemplate = await reportingService.createReportTemplate(templateData);
      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch dashboard data
  const fetchDashboardData = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await reportingService.getDashboardData(projectId, fetchOptions);
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch impact metrics
  const fetchImpactMetrics = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await reportingService.getImpactMetrics(projectId, fetchOptions);
      setImpactMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Initialize data
  useEffect(() => {
    if (projectId) {
      fetchReport();
      fetchDashboardData();
      fetchImpactMetrics();
    }
    fetchTemplates();
  }, [projectId, fetchReport, fetchDashboardData, fetchImpactMetrics, fetchTemplates]);
  
  return {
    report,
    templates,
    dashboardData,
    impactMetrics,
    loading,
    error,
    fetchReport,
    generateCustomReport,
    exportReport,
    fetchTemplates,
    createTemplate,
    fetchDashboardData,
    fetchImpactMetrics
  };
};