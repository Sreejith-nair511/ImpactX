import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber, formatCurrency } from '../../utils/dataFormatter';

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  format = 'number',
  isLoading = false,
  description = '',
  trendLabel = 'from last month'
}) => {
  const formatValue = (val) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'number':
        return formatNumber(val);
      case 'percentage':
        return val.toFixed(1) + '%';
      case 'decimal':
        return val.toFixed(2);
      case 'integer':
        return Math.round(val).toLocaleString();
      default:
        return val;
    }
  };

  const getChangeColor = () => {
    if (!change) return 'text-gray-500';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getChangeIcon = () => {
    if (!change) return null;
    return change > 0 ? '▲' : '▼';
  };

  const getChangeText = () => {
    if (!change) return '';
    return change > 0 ? 'increase' : 'decrease';
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 shadow-lg"
        aria-busy="true"
        aria-label="Loading analytics data"
      >
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
      role="region"
      aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 
            id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-gray-400 text-sm font-medium"
          >
            {title}
          </h3>
          <p className="text-2xl font-bold text-white mt-2" aria-live="polite">
            {formatValue(value)}
          </p>
          {description && (
            <p className="text-gray-500 text-xs mt-1">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-indigo-500/10 rounded-lg" aria-hidden="true">
            <Icon className="h-6 w-6 text-indigo-400" />
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div 
          className={`flex items-center mt-4 text-sm ${getChangeColor()}`}
          aria-label={`${Math.abs(change)}% ${getChangeText()} ${trendLabel}`}
        >
          <span aria-hidden="true">{getChangeIcon()}</span>
          <span className="ml-1 font-medium">{Math.abs(change)}%</span>
          <span className="ml-1 text-gray-400">{trendLabel}</span>
        </div>
      )}
    </motion.div>
  );
};

export default AnalyticsCard;