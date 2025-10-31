import { useState, useEffect } from 'react';

/**
 * Custom hook for processing chart data
 * @param {Array} rawData - Raw data from API
 * @param {string} xAxisKey - Key for x-axis values
 * @param {Array} yAxisKeys - Keys for y-axis values
 * @returns {object} Processed chart data and configuration
 */
export const useChartData = (rawData, xAxisKey, yAxisKeys) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rawData && rawData.length > 0) {
      try {
        const processedData = rawData.map(item => {
          const dataPoint = { [xAxisKey]: item[xAxisKey] };
          yAxisKeys.forEach(key => {
            dataPoint[key] = item[key];
          });
          return dataPoint;
        });
        
        setChartData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error processing chart data:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [rawData, xAxisKey, yAxisKeys]);

  return { chartData, loading };
};

/**
 * Custom hook for generating chart colors
 * @param {number} count - Number of colors needed
 * @returns {Array} Array of color strings
 */
export const useChartColors = (count) => {
  const baseColors = [
    '#6366f1', // indigo-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#ec4899', // pink-500
    '#f97316', // orange-500
  ];

  return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
};

/**
 * Custom hook for chart dimensions
 * @param {object} containerRef - Reference to chart container
 * @returns {object} Chart dimensions
 */
export const useChartDimensions = (containerRef) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    margin: { top: 20, right: 30, bottom: 40, left: 50 }
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(width * 0.6, 200),
          margin: { top: 20, right: 30, bottom: 40, left: 50 }
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [containerRef]);

  return dimensions;
};