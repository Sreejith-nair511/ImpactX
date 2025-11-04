import apiClient from './apiClient';

/**
 * Reporting Service
 * Handles all reporting and analytics operations
 */

// Get project report
export const getProjectReport = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      format: options.format || 'json',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/report`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching project report:', error);
    throw error;
  }
};

// Generate custom report
export const generateCustomReport = async (projectId, reportConfig) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/custom-report`, reportConfig);
    return response.data;
  } catch (error) {
    console.error('Error generating custom report:', error);
    throw error;
  }
};

// Export report
export const exportReport = async (projectId, reportId, format = 'pdf') => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/reports/${reportId}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error exporting report:', error);
    throw error;
  }
};

// Get report templates
export const getReportTemplates = async (options = {}) => {
  try {
    const params = {
      limit: options.limit || 50,
      ...options
    };
    
    const response = await apiClient.get('/report-templates', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching report templates:', error);
    throw error;
  }
};

// Create report template
export const createReportTemplate = async (templateData) => {
  try {
    const response = await apiClient.post('/report-templates', templateData);
    return response.data;
  } catch (error) {
    console.error('Error creating report template:', error);
    throw error;
  }
};

// Get dashboard data
export const getDashboardData = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/dashboard`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Get impact metrics
export const getImpactMetrics = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || 'all',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/impact-metrics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching impact metrics:', error);
    throw error;
  }
};

export default {
  getProjectReport,
  generateCustomReport,
  exportReport,
  getReportTemplates,
  createReportTemplate,
  getDashboardData,
  getImpactMetrics
};