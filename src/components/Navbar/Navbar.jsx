// src/components/Navbar/Navbar.jsx
import React from 'react';
import { useUser } from '../../context/UserContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle'; // ✅ Import
import './Navbar.css';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">AI Helper</span>
        </div>
        
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="navbar-actions">
          <ThemeToggle variant="button" size="sm" showTooltip tooltipText="Toggle theme" />
          <div className="navbar-user">
            <span className="user-avatar">👤</span>
            <span className="user-name">{user.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;