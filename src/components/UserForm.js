import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    subscribe: false,
    country: '',
    bio: ''
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = ['', 'USA', 'Canada', 'UK', 'Australia', 'India', 'Germany', 'France'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.age) {
      const ageNum = parseInt(formData.age);
      if (ageNum < 1 || ageNum > 150) {
        newErrors.age = 'Age must be between 1 and 150';
      }
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        const submission = {
          ...formData,
          id: Date.now(),
          submittedAt: new Date().toLocaleString()
        };
        
        setSubmittedData(prev => [submission, ...prev]);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          age: '',
          gender: '',
          subscribe: false,
          country: '',
          bio: ''
        });
        
        setErrors({});
        setIsSubmitting(false);
        alert('Form submitted successfully!');
      }, 500);
    } else {
      setErrors(validationErrors);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      subscribe: false,
      country: '',
      bio: ''
    });
    setErrors({});
  };

  const removeSubmission = (id) => {
    setSubmittedData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="form-container">
      <h2>User Registration Form</h2>
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? 'error' : ''}
              placeholder="Age"
              min="1"
              max="150"
            />
          </div>
            {errors.age && <span className="error-message">{errors.age}</span>}

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error' : ''}
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country || 'Select a country'}
              </option>
            ))}
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us something about yourself..."
            rows="4"
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          <label htmlFor="subscribe">Subscribe to newsletter</label>
        </div>

        <div className="form-buttons">
          <button 
            type="button" 
            onClick={handleReset} 
            className="btn btn-reset"
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </form>

      {submittedData.length > 0 && (
        <div className="submissions-section">
          <h3>Submitted Forms ({submittedData.length})</h3>
          <div className="submissions-list">
            {submittedData.map((data) => (
              <div key={data.id} className="submission-card">
                <button 
                  onClick={() => removeSubmission(data.id)}
                  className="btn-remove"
                  title="Remove submission"
                >
                  ×
                </button>
                <h4>{data.name}</h4>
                <p><strong>Email:</strong> {data.email}</p>
                {data.age && <p><strong>Age:</strong> {data.age}</p>}
                {data.gender && <p><strong>Gender:</strong> {data.gender}</p>}
                <p><strong>Country:</strong> {data.country}</p>
                {data.bio && <p><strong>Bio:</strong> {data.bio}</p>}
                <p><strong>Newsletter:</strong> {data.subscribe ? 'Subscribed' : 'Not subscribed'}</p>
                <p className="submission-time"><em>Submitted: {data.submittedAt}</em></p>
              </div>
            ))}
          </div>
          {submittedData.length > 0 && (
            <button 
              onClick={() => setSubmittedData([])} 
              className="btn btn-clear-all"
            >
              Clear All Submissions
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserForm;