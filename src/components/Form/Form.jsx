import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    componentType: 'navbar'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Generate AI Component</h2>
      <p className="form-subtitle">Describe what you want and let AI create it!</p>
      
      <form onSubmit={handleSubmit} className="form-custom">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="componentType">Component Type</label>
          <select
            id="componentType"
            name="componentType"
            value={formData.componentType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="navbar">Navbar</option>
            <option value="hero">Hero Section</option>
            <option value="card">Card</option>
            <option value="form">Form</option>
            <option value="footer">Footer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Description</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe the component you want..."
            rows="4"
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className="form-submit-btn"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate with AI 🚀'}
        </button>
      </form>
    </div>
  );
};

export default Form;