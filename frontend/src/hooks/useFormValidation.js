import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation
 * @param {object} initialValues - Initial form values
 * @param {object} validationRules - Validation rules for each field
 * @returns {object} Form state and validation functions
 */
export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validate a single field
   * @param {string} fieldName - Field name
   * @param {any} value - Field value
   * @returns {string|null} Error message or null
   */
  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    for (const rule of rules) {
      const errorMessage = rule(value, values);
      if (errorMessage) {
        return errorMessage;
      }
    }

    return null;
  }, [validationRules, values]);

  /**
   * Validate all fields
   * @returns {object} Errors object
   */
  const validateAll = useCallback(() => {
    const newErrors = {};

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return newErrors;
  }, [validateField, validationRules, values]);

  /**
   * Check if form is valid
   * @returns {boolean} Whether form is valid
   */
  const isValid = useCallback(() => {
    const errors = validateAll();
    return Object.keys(errors).length === 0;
  }, [validateAll]);

  /**
   * Handle field change
   * @param {string} fieldName - Field name
   * @param {any} value - Field value
   */
  const handleChange = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));

    // Validate field if it has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  }, [touched, validateField]);

  /**
   * Handle field blur
   * @param {string} fieldName - Field name
   */
  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate field on blur
    const error = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, [values, validateField]);

  /**
   * Reset form
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Handle form submission
   * @param {function} onSubmit - Submit handler
   */
  const handleSubmit = useCallback(async (onSubmit) => {
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, fieldName) => {
      acc[fieldName] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const errors = validateAll();
    
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    setIsSubmitting(true);
    
    try {
      const result = await onSubmit(values);
      setIsSubmitting(false);
      return { success: true, result };
    } catch (error) {
      setIsSubmitting(false);
      return { success: false, error };
    }
  }, [validateAll, validationRules, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    validateAll,
    isValid,
    reset
  };
};

/**
 * Common validation rules
 */
export const validationRules = {
  /**
   * Required field validation
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message;
    }
    return null;
  },

  /**
   * Email validation
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  email: (message = 'Please enter a valid email address') => (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message;
    }
    return null;
  },

  /**
   * Minimum length validation
   * @param {number} length - Minimum length
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  minLength: (length, message) => (value) => {
    if (value && value.length < length) {
      return message || `Must be at least ${length} characters`;
    }
    return null;
  },

  /**
   * Maximum length validation
   * @param {number} length - Maximum length
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  maxLength: (length, message) => (value) => {
    if (value && value.length > length) {
      return message || `Must be no more than ${length} characters`;
    }
    return null;
  },

  /**
   * Number validation
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  number: (message = 'Please enter a valid number') => (value) => {
    if (value && isNaN(value)) {
      return message;
    }
    return null;
  },

  /**
   * Minimum value validation
   * @param {number} min - Minimum value
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  min: (min, message) => (value) => {
    if (value && Number(value) < min) {
      return message || `Must be at least ${min}`;
    }
    return null;
  },

  /**
   * Maximum value validation
   * @param {number} max - Maximum value
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  max: (max, message) => (value) => {
    if (value && Number(value) > max) {
      return message || `Must be no more than ${max}`;
    }
    return null;
  },

  /**
   * Custom pattern validation
   * @param {RegExp} pattern - Regular expression pattern
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  pattern: (pattern, message) => (value) => {
    if (value && !pattern.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  /**
   * Match another field validation
   * @param {string} fieldName - Field name to match
   * @param {object} allValues - All form values
   * @param {string} message - Error message
   * @returns {function} Validation function
   */
  match: (fieldName, message) => (value, allValues) => {
    if (value !== allValues[fieldName]) {
      return message || 'Fields do not match';
    }
    return null;
  }
};