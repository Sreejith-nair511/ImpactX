import React, { useState } from 'react';
import Form from '../components/ui/Form';

const FormDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
    subscribe: false,
    rating: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Please select a rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            category: '',
            message: '',
            subscribe: false,
            rating: ''
          });
        }, 3000);
      }, 1500);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      message: '',
      subscribe: false,
      rating: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Form Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This page demonstrates the form component with validation and various input types.
        </p>
        
        {isSubmitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Form submitted successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <p>Thank you for your submission. We'll get back to you soon.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <Form.Field
                label="Full Name"
                name="name"
                required
                error={errors.name}
                helperText="Please enter your full name"
              >
                <Form.Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  error={errors.name}
                />
              </Form.Field>
              
              {/* Email Field */}
              <Form.Field
                label="Email Address"
                name="email"
                required
                error={errors.email}
                helperText="We'll never share your email"
              >
                <Form.Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  error={errors.email}
                />
              </Form.Field>
              
              {/* Phone Field */}
              <Form.Field
                label="Phone Number"
                name="phone"
                required
                error={errors.phone}
                helperText="10-digit phone number"
              >
                <Form.Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  error={errors.phone}
                />
              </Form.Field>
              
              {/* Category Field */}
              <Form.Field
                label="Category"
                name="category"
                required
                error={errors.category}
              >
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  error={errors.category}
                  options={[
                    { value: '', label: 'Select a category' },
                    { value: 'donation', label: 'Donation Inquiry' },
                    { value: 'volunteer', label: 'Volunteer Opportunity' },
                    { value: 'partnership', label: 'Partnership' },
                    { value: 'feedback', label: 'Feedback' },
                    { value: 'other', label: 'Other' }
                  ]}
                />
              </Form.Field>
              
              {/* Rating Field */}
              <Form.Field
                label="Rate Your Experience"
                name="rating"
                required
                error={errors.rating}
              >
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <Form.Input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={formData.rating === rating.toString()}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{rating}</span>
                    </label>
                  ))}
                </div>
              </Form.Field>
              
              {/* Subscribe Checkbox */}
              <Form.Field>
                <Form.Checkbox
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                  label="Subscribe to our newsletter for updates"
                />
              </Form.Field>
            </div>
            
            {/* Message Field */}
            <Form.Field
              label="Message"
              name="message"
              required
              error={errors.message}
              helperText="Please provide as much detail as possible"
            >
              <Form.Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message here..."
                rows={4}
                error={errors.message}
              />
            </Form.Field>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Form.Button
                type="button"
                variant="secondary"
                onClick={handleReset}
              >
                Reset
              </Form.Button>
              <Form.Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Form'
                )}
              </Form.Button>
            </div>
          </Form>
        )}
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Client-side validation with real-time error feedback</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Support for various input types (text, email, tel, textarea, select, checkbox, radio)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Accessible form labels and error messages</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Loading states and submission feedback</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with all theme modes (light/dark/high contrast)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fully customizable with additional CSS classes</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          To use the form component in your components:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {`import Form from '../components/ui/Form';
import { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
    console.log('Form submitted:', formData);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field
        label="Full Name"
        name="name"
        required
        error={errors.name}
      >
        <Form.Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.name}
        />
      </Form.Field>
      
      <Form.Field
        label="Email Address"
        name="email"
        required
        error={errors.email}
      >
        <Form.Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={errors.email}
        />
      </Form.Field>
      
      <Form.Button type="submit" variant="primary">
        Submit
      </Form.Button>
    </Form>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default FormDemo;