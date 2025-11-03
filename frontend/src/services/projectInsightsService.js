import apiClient from './apiClient';

/**
 * Project Insights Service
 * Handles all project analytics and insights operations
 */

// Get project analytics data
export const getProjectAnalytics = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '30d',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/analytics`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching project analytics:', error);
    throw error;
  }
};

// Get project funding trends
export const getFundingTrends = async (projectId, options = {}) => {
  try {
    const params = {
      timeframe: options.timeframe || '12m',
      interval: options.interval || '1m',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/funding-trends`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching funding trends:', error);
    throw error;
  }
};

// Get impact metrics
export const getImpactMetrics = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/impact-metrics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching impact metrics:', error);
    throw error;
  }
};

// Get beneficiary demographics
export const getBeneficiaryDemographics = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/beneficiary-demographics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching beneficiary demographics:', error);
    throw error;
  }
};

// Get engagement statistics
export const getEngagementStats = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/engagement-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching engagement statistics:', error);
    throw error;
  }
};

// Get project milestones progress
export const getMilestonesProgress = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/milestones-progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching milestones progress:', error);
    throw error;
  }
};

// Get risk assessment
export const getRiskAssessment = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/risk-assessment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    throw error;
  }
};

// Get project comparison data
export const getProjectComparison = async (projectId, comparisonProjectIds = []) => {
  try {
    const response = await apiClient.post(`/projects/${projectId}/compare`, {
      projectIds: comparisonProjectIds
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project comparison:', error);
    throw error;
  }
};

// Get predictive insights
export const getPredictiveInsights = async (projectId, options = {}) => {
  try {
    const params = {
      horizon: options.horizon || '6m',
      ...options
    };
    
    const response = await apiClient.get(`/projects/${projectId}/predictive-insights`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching predictive insights:', error);
    throw error;
  }
};

// Get project performance score
export const getPerformanceScore = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/performance-score`);
    return response.data;
  } catch (error) {
    console.error('Error fetching performance score:', error);
    throw error;
  }
};

// Get donor retention metrics
export const getDonorRetention = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/donor-retention`);
    return response.data;
  } catch (error) {
    console.error('Error fetching donor retention metrics:', error);
    throw error;
  }
};

// Get social impact metrics
export const getSocialImpact = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/social-impact`);
    return response.data;
  } catch (error) {
    console.error('Error fetching social impact metrics:', error);
    throw error;
  }
};

// Get environmental impact metrics
export const getEnvironmentalImpact = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/environmental-impact`);
    return response.data;
  } catch (error) {
    console.error('Error fetching environmental impact metrics:', error);
    throw error;
  }
};

// Get economic impact metrics
export const getEconomicImpact = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/economic-impact`);
    return response.data;
  } catch (error) {
    console.error('Error fetching economic impact metrics:', error);
    throw error;
  }
};

export default {
  getProjectAnalytics,
  getFundingTrends,
  getImpactMetrics,
  getBeneficiaryDemographics,
  getEngagementStats,
  getMilestonesProgress,
  getRiskAssessment,
  getProjectComparison,
  getPredictiveInsights,
  getPerformanceScore,
  getDonorRetention,
  getSocialImpact,
  getEnvironmentalImpact,
  getEconomicImpact
};