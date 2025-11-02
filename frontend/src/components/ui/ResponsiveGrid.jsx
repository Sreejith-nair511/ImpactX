import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';

const ResponsiveGrid = ({ 
  children, 
  columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  },
  gap = 4,
  className = '',
  itemClassName = '',
  animate = true
}) => {
  const { width } = useResponsive();
  
  // Determine number of columns based on screen size
  const getColumnCount = () => {
    if (width >= 1280) return columns.xl || columns.lg || columns.md || columns.sm || columns.xs;
    if (width >= 1024) return columns.lg || columns.md || columns.sm || columns.xs;
    if (width >= 768) return columns.md || columns.sm || columns.xs;
    if (width >= 640) return columns.sm || columns.xs;
    return columns.xs;
  };

  const columnCount = getColumnCount();
  
  // Calculate grid template columns
  const gridTemplateColumns = `repeat(${columnCount}, minmax(0, 1fr))`;
  
  // Calculate gap classes
  const gapClass = `gap-${gap}`;

  return (
    <div 
      className={`grid ${gapClass} ${className}`}
      style={{ gridTemplateColumns }}
    >
      {React.Children.map(children, (child, index) => {
        if (!child) return null;
        
        return (
          <motion.div
            key={index}
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={animate ? { opacity: 1, y: 0 } : false}
            transition={animate ? { duration: 0.3, delay: index * 0.05 } : false}
            className={itemClassName}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

// ResponsiveGrid.Item component for consistent styling
ResponsiveGrid.Item = ({ children, className = '', ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;