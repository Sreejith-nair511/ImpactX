import { useState, useEffect, useCallback } from 'react';
import * as projectInsightsService from '../services/projectInsightsService';

/**
 * Custom hook for managing project insights and analytics
 * @param {string} projectId - The ID of the project
 * @param {Object} options - Configuration options
 * @returns {Object} Project insights state and actions
 */
export const useProjectInsights = (projectId, options = {}) => {
  const [analytics, setAnalytics] = useState(null);
  const [fundingTrends, setFundingTrends] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState(null);
  const [demographics, setDemographics] = useState(null);
  const [engagementStats, setEngagementStats] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [performanceScore, setPerformanceScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch project analytics
  const fetchAnalytics = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await projectInsightsService.getProjectAnalytics(projectId, fetchOptions);
      setAnalytics(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch project analytics');
      console.error('Error fetching project analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  // Fetch funding trends
  const fetchFundingTrends = useCallback(async (fetchOptions = {}) => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getFundingTrends(projectId, fetchOptions);
      setFundingTrends(data.trends || data);
    } catch (err) {
      console.error('Error fetching funding trends:', err);
    }
  }, [projectId]);
  
  // Fetch impact metrics
  const fetchImpactMetrics = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getImpactMetrics(projectId);
      setImpactMetrics(data);
    } catch (err) {
      console.error('Error fetching impact metrics:', err);
    }
  }, [projectId]);
  
  // Fetch beneficiary demographics
  const fetchDemographics = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getBeneficiaryDemographics(projectId);
      setDemographics(data);
    } catch (err) {
      console.error('Error fetching beneficiary demographics:', err);
    }
  }, [projectId]);
  
  // Fetch engagement statistics
  const fetchEngagementStats = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getEngagementStats(projectId);
      setEngagementStats(data);
    } catch (err) {
      console.error('Error fetching engagement statistics:', err);
    }
  }, [projectId]);
  
  // Fetch milestones progress
  const fetchMilestones = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getMilestonesProgress(projectId);
      setMilestones(data.milestones || data);
    } catch (err) {
      console.error('Error fetching milestones progress:', err);
    }
  }, [projectId]);
  
  // Fetch risk assessment
  const fetchRiskAssessment = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getRiskAssessment(projectId);
      setRiskAssessment(data);
    } catch (err) {
      console.error('Error fetching risk assessment:', err);
    }
  }, [projectId]);
  
  // Fetch performance score
  const fetchPerformanceScore = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const data = await projectInsightsService.getPerformanceScore(projectId);
      setPerformanceScore(data);
    } catch (err) {
      console.error('Error fetching performance score:', err);
    }
  }, [projectId]);
  
  // Refresh all data
  const refresh = useCallback(() => {
    fetchAnalytics(options);
    fetchFundingTrends(options);
    fetchImpactMetrics();
    fetchDemographics();
    fetchEngagementStats();
    fetchMilestones();
    fetchRiskAssessment();
    fetchPerformanceScore();
  }, [
    fetchAnalytics,
    fetchFundingTrends,
    fetchImpactMetrics,
    fetchDemographics,
    fetchEngagementStats,
    fetchMilestones,
    fetchRiskAssessment,
    fetchPerformanceScore,
    options
  ]);
  
  // Initialize data
  useEffect(() => {
    if (projectId) {
      refresh();
    }
  }, [projectId, refresh]);
  
  return {
    // State
    analytics,
    fundingTrends,
    impactMetrics,
    demographics,
    engagementStats,
    milestones,
    riskAssessment,
    performanceScore,
    loading,
    error,
    
    // Actions
    fetchAnalytics,
    fetchFundingTrends,
    fetchImpactMetrics,
    fetchDemographics,
    fetchEngagementStats,
    fetchMilestones,
    fetchRiskAssessment,
    fetchPerformanceScore,
    refresh
  };
};

export default useProjectInsights;