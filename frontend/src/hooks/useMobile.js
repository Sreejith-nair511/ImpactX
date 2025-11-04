import { useState, useEffect } from 'react';

/**
 * Custom hook for mobile device detection and mobile-specific functionality
 * @returns {Object} Mobile device information and utility functions
 */
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check if device is mobile
  const checkMobile = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      
      // Mobile detection based on user agent and screen size
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(userAgent);
      
      // Consider devices with width <= 768px as mobile
      const isMobileWidth = width <= 768;
      
      // Consider devices with width > 768px and <= 1024px as tablet
      const isTabletWidth = width > 768 && width <= 1024;
      
      setIsMobile(isMobileUA || isMobileWidth);
      setIsTablet(isTabletWidth);
      setScreenWidth(width);
      setScreenHeight(height);
      setIsLandscape(width > height);
      
      // Check for touch capability
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  };

  // Initialize and add event listeners
  useEffect(() => {
    checkMobile();
    
    const handleResize = () => {
      checkMobile();
    };
    
    const handleOrientationChange = () => {
      setTimeout(() => {
        checkMobile();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Function to prevent zoom on input focus (iOS issue)
  const preventZoomOnInput = () => {
    if (isMobile) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    }
  };

  // Function to allow zoom again
  const allowZoom = () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  };

  // Function to add touch-friendly padding to elements
  const makeTouchFriendly = (elementId) => {
    if (isMobile && elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
      }
    }
  };

  // Function to adjust font size for better mobile readability
  const adjustFontSize = (elementId, scaleFactor = 1) => {
    if (isMobile && elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const currentFontSize = parseFloat(computedStyle.fontSize);
        const newFontSize = currentFontSize * scaleFactor;
        element.style.fontSize = `${newFontSize}px`;
      }
    }
  };

  // Function to add mobile-specific classes to body
  const addMobileClasses = () => {
    if (typeof document !== 'undefined') {
      if (isMobile) {
        document.body.classList.add('mobile-device');
      } else {
        document.body.classList.remove('mobile-device');
      }
      
      if (isTablet) {
        document.body.classList.add('tablet-device');
      } else {
        document.body.classList.remove('tablet-device');
      }
      
      if (isTouchDevice) {
        document.body.classList.add('touch-device');
      } else {
        document.body.classList.remove('touch-device');
      }
    }
  };

  // Apply mobile classes
  useEffect(() => {
    addMobileClasses();
  }, [isMobile, isTablet, isTouchDevice]);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    screenWidth,
    screenHeight,
    isLandscape,
    isPortrait: !isLandscape,
    isTouchDevice,
    preventZoomOnInput,
    allowZoom,
    makeTouchFriendly,
    adjustFontSize
  };
};