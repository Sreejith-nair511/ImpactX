import { useState, useCallback } from 'react';

/**
 * Custom hook for managing complex form state
 * @param {object} initialValues - Initial form values
 * @returns {object} Form state and handlers
 */
export const useFormState = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Handle input changes
   * @param {string} name - Field name
   * @param {any} value - Field value
   */
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when it's changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  /**
   * Handle input blur
   * @param {string} name - Field name
   */
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  /**
   * Set field error
   * @param {string} name - Field name
   * @param {string} error - Error message
   */
  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  /**
   * Set multiple field errors
   * @param {object} newErrors - Error object
   */
  const setErrorsBatch = useCallback((newErrors) => {
    setErrors(prev => ({ ...prev, ...newErrors }));
  }, []);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * Set form values
   * @param {object} newValues - New form values
   */
  const setFormValues = useCallback((newValues) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  /**
   * Check if field has error
   * @param {string} name - Field name
   * @returns {boolean} Whether field has error
   */
  const hasError = useCallback((name) => {
    return !!errors[name];
  }, [errors]);

  /**
   * Get field error message
   * @param {string} name - Field name
   * @returns {string|null} Error message
   */
  const getError = useCallback((name) => {
    return errors[name] || null;
  }, [errors]);

  /**
   * Check if field is touched
   * @param {string} name - Field name
   * @returns {boolean} Whether field is touched
   */
  const isTouched = useCallback((name) => {
    return !!touched[name];
  }, [touched]);

  /**
   * Check if form is valid
   * @returns {boolean} Whether form is valid
   */
  const isValid = useCallback(() => {
    return Object.values(errors).every(error => !error);
  }, [errors]);

  /**
   * Get form data
   * @returns {object} Current form values
   */
  const getData = useCallback(() => {
    return { ...values };
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setError,
    setErrorsBatch,
    reset,
    setFormValues,
    hasError,
    getError,
    isTouched,
    isValid,
    getData
  };
};

/**
 * Custom hook for handling form submission
 * @param {Function} onSubmit - Submit handler function
 * @param {Function} onError - Error handler function
 * @returns {object} Submission state and handlers
 */
export const useFormSubmission = (onSubmit, onError) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /**
   * Handle form submission
   * @param {object} data - Form data
   */
  const handleSubmit = useCallback(async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await onSubmit(data);
      setIsSubmitting(false);
      return result;
    } catch (error) {
      setSubmitError(error.message || 'An error occurred during submission');
      setIsSubmitting(false);
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    }
  }, [isSubmitting, onSubmit, onError]);

  /**
   * Reset submission state
   */
  const resetSubmission = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
  }, []);

  return {
    isSubmitting,
    submitError,
    handleSubmit,
    resetSubmission
  };
};

export default useFormState;