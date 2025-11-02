import React from 'react';
import { TrendingUp, TrendingDown, Minus, Users, Folder, CheckCircle, CurrencyRupee } from 'lucide-react';
import './MetricsDashboard.css';

/**
 * Metrics Dashboard Component
 * Displays key performance indicators and metrics
 */
const MetricsDashboard = ({ metrics = [], className = '' }) => {
  // Format number with commas
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  // Get trend icon
  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp size={16} />;
    if (trend < 0) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };
  
  // Get trend class
  const getTrendClass = (trend) => {
    if (trend > 0) return 'trend-up';
    if (trend < 0) return 'trend-down';
    return 'trend-neutral';
  };
  
  // Get icon component
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'users': return Users;
      case 'projects': return Folder;
      case 'tasks': return CheckCircle;
      case 'currency': return CurrencyRupee;
      default: return TrendingUp;
    }
  };
  
  return (
    <div className={`metrics-dashboard ${className}`}>
      <div className="metrics-grid">
        {metrics.map((metric, index) => {
          const IconComponent = getIcon(metric.icon);
          const trendClass = getTrendClass(metric.trend);
          
          return (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="metric-title">{metric.title}</h3>
              </div>
              
              <div className="metric-content">
                <div className="metric-value">
                  {metric.prefix && <span className="metric-prefix">{metric.prefix}</span>}
                  <span className="metric-number">{formatNumber(metric.value)}</span>
                  {metric.suffix && <span className="metric-suffix">{metric.suffix}</span>}
                </div>
                
                {metric.description && (
                  <p className="metric-description">{metric.description}</p>
                )}
              </div>
              
              {metric.trend !== undefined && (
                <div className={`metric-trend ${trendClass}`}>
                  {getTrendIcon(metric.trend)}
                  <span>{Math.abs(metric.trend)}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsDashboard;