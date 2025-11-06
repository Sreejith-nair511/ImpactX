import { useState, useCallback } from 'react';

/**
 * Custom hook for advanced tab animations and transitions
 * @param {string} defaultAnimation - Default animation type
 * @param {number} defaultDuration - Default animation duration in milliseconds
 * @returns {Object} Animation management functions and state
 */
export const useTabAnimations = (defaultAnimation = 'slide', defaultDuration = 200) => {
  const [animationType, setAnimationType] = useState(defaultAnimation);
  const [animationDuration, setAnimationDuration] = useState(defaultDuration);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation presets
  const animationPresets = {
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    flip: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 }
    },
    bounce: {
      initial: { opacity: 0, y: 50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      },
      exit: { opacity: 0, y: -50 }
    }
  };

  // Change animation type
  const changeAnimation = useCallback((newAnimationType) => {
    if (animationPresets[newAnimationType]) {
      setAnimationType(newAnimationType);
    }
  }, []);

  // Change animation duration
  const changeDuration = useCallback((newDuration) => {
    if (newDuration > 0 && newDuration <= 1000) {
      setAnimationDuration(newDuration);
    }
  }, []);

  // Get animation variants
  const getAnimationVariants = useCallback(() => {
    return animationPresets[animationType] || animationPresets.slide;
  }, [animationType]);

  // Handle animation start
  const onAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  // Handle animation complete
  const onAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Cycle through animation types
  const cycleAnimation = useCallback(() => {
    const animationTypes = Object.keys(animationPresets);
    const currentIndex = animationTypes.indexOf(animationType);
    const nextIndex = (currentIndex + 1) % animationTypes.length;
    setAnimationType(animationTypes[nextIndex]);
  }, [animationType]);

  return {
    animationType,
    animationDuration,
    isAnimating,
    animationPresets,
    changeAnimation,
    changeDuration,
    getAnimationVariants,
    onAnimationStart,
    onAnimationComplete,
    cycleAnimation
  };
};