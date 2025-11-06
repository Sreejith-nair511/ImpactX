import React, { useState, useEffect } from 'react';

/**
 * Form Component
 * A customizable form with validation support
 */
const Form = ({ 
  children, 
  onSubmit, 
  className = '',
  validateOnBlur = true,
  validateOnChange = false
}) => {
  return (
    <form 
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

/**
 * Form Field Component
 * A wrapper for form fields with validation support
 */
const FormField = ({ 
  children, 
  label, 
  name,
  required = false,
  error = '',
  helperText = '',
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {children}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

/**
 * Input Component
 * A customizable input field with validation support
 */
const Input = React.forwardRef(({
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  error = '',
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={`block w-full px-3 py-2 border ${
        error 
          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
      } rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
        disabled ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-700'
      } text-gray-900 dark:text-white ${className}`}
      {...props}
    />
  );
});

/**
 * Textarea Component
 * A customizable textarea with validation support
 */
const Textarea = React.forwardRef(({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 3,
  disabled = false,
  error = '',
  className = '',
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`block w-full px-3 py-2 border ${
        error 
          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
      } rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
        disabled ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-700'
      } text-gray-900 dark:text-white ${className}`}
      {...props}
    />
  );
});

/**
 * Select Component
 * A customizable select dropdown with validation support
 */
const Select = React.forwardRef(({
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder,
  disabled = false,
  error = '',
  className = '',
  ...props
}, ref) => {
  return (
    <select
      ref={ref}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`block w-full px-3 py-2 border ${
        error 
          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
      } rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
        disabled ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-700'
      } text-gray-900 dark:text-white ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

/**
 * Checkbox Component
 * A customizable checkbox with validation support
 */
const Checkbox = React.forwardRef(({
  name,
  checked,
  onChange,
  onBlur,
  label,
  disabled = false,
  error = '',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          ref={ref}
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 ${
            disabled ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-700'
          } ${error ? 'border-red-300' : ''}`}
          {...props}
        />
      </div>
      {label && (
        <label 
          htmlFor={name} 
          className="ml-3 text-sm text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  );
});

/**
 * Button Component
 * A customizable button for form actions
 */
const Button = ({ 
  children, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    outline: 'bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500 text-gray-700 dark:text-gray-300'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  // Get classes
  const buttonClasses = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center border border-transparent rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
      } ${buttonClasses} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Export all components
Form.Field = FormField;
Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;
Form.Checkbox = Checkbox;
Form.Button = Button;

export default Form;