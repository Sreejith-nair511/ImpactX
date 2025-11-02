import { useState, useEffect } from 'react';

/**
 * Custom hook for handling responsive breakpoints
 * @returns {object} Screen size information and utility functions
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
    isLargeDesktop: window.innerWidth >= 1280,
    isXLargeDesktop: window.innerWidth >= 1536
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLargeDesktop: width >= 1280,
        isXLargeDesktop: width >= 1536
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Check if screen size matches a breakpoint
   * @param {string} breakpoint - Breakpoint name (sm, md, lg, xl, 2xl)
   * @returns {boolean} Whether screen size matches breakpoint
   */
  const isBreakpoint = (breakpoint) => {
    switch (breakpoint) {
      case 'sm':
        return screenSize.width >= 640;
      case 'md':
        return screenSize.width >= 768;
      case 'lg':
        return screenSize.width >= 1024;
      case 'xl':
        return screenSize.width >= 1280;
      case '2xl':
        return screenSize.width >= 1536;
      default:
        return false;
    }
  };

  /**
   * Get responsive class based on breakpoints
   * @param {object} classes - Class names for different breakpoints
   * @returns {string} Combined class names
   */
  const responsiveClass = (classes) => {
    const classList = [];
    
    if (classes.base) classList.push(classes.base);
    if (screenSize.isMobile && classes.mobile) classList.push(classes.mobile);
    if (screenSize.isTablet && classes.tablet) classList.push(classes.tablet);
    if (screenSize.isDesktop && classes.desktop) classList.push(classes.desktop);
    if (screenSize.isLargeDesktop && classes.large) classList.push(classes.large);
    if (screenSize.isXLargeDesktop && classes.xlarge) classList.push(classes.xlarge);
    
    return classList.join(' ');
  };

  return {
    ...screenSize,
    isBreakpoint,
    responsiveClass
  };
};

/**
 * Custom hook for handling orientation changes
 * @returns {object} Orientation information
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState({
    angle: window.orientation || 0,
    type: window.screen.orientation ? window.screen.orientation.type : 'portrait-primary'
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation({
        angle: window.orientation || 0,
        type: window.screen.orientation ? window.screen.orientation.type : 'portrait-primary'
      });
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  return {
    ...orientation,
    isPortrait: orientation.type.includes('portrait'),
    isLandscape: orientation.type.includes('landscape')
  };
};

/**
 * Custom hook for handling touch devices
 * @returns {object} Touch device information
 */
export const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return {
    isTouchDevice,
    hasHover: !isTouchDevice
  };
};

/**
 * Custom hook for handling scroll position
 * @returns {object} Scroll position information
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: window.pageXOffset,
    y: window.pageYOffset
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

/**
 * Custom hook for handling element visibility
 * @param {React.Ref} ref - Element reference
 * @param {object} options - Intersection observer options
 * @returns {boolean} Visibility state
 */
export const useElementVisibility = (ref, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};