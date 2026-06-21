// src/components/ThemeToggle/ThemeToggle.jsx
import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './ThemeToggle.css';

const ThemeToggle = ({ 
  variant = 'button', // 'button', 'switch', 'labeled'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  color = 'default',
  showTooltip = false,
  tooltipText = 'Toggle theme',
  className = '',
  ...props 
}) => {
  const { user, updateUser } = useUser();
  const isDark = user.theme === 'dark';

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', user.theme || 'light');
  }, [user.theme]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    updateUser({ theme: newTheme });
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Get icon based on current theme
  const getIcon = () => {
    return isDark ? '☀️' : '🌙';
  };

  const getLabel = () => {
    return isDark ? 'Light' : 'Dark';
  };

  // Button variant
  if (variant === 'button') {
    return (
      <div className={`theme-toggle-wrapper ${showTooltip ? 'tooltip-top' : ''}`}>
        <button
          className={`theme-toggle ${size} ${color} ${className}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          {...props}
        >
          <span className={isDark ? 'dark-icon' : 'light-icon'}>
            {getIcon()}
          </span>
        </button>
        {showTooltip && <span className="tooltip">{tooltipText}</span>}
      </div>
    );
  }

  // Labeled button variant
  if (variant === 'labeled') {
    return (
      <button
        className={`theme-toggle-with-label ${className}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        {...props}
      >
        <span>{getIcon()}</span>
        <span className="label-text">{getLabel()} Mode</span>
      </button>
    );
  }

  // Switch variant
  if (variant === 'switch') {
    return (
      <div 
        className={`theme-toggle-switch ${isDark ? 'dark' : 'light'} ${className}`}
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        aria-label="Toggle theme"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleTheme();
          }
        }}
        {...props}
      >
        <span className="theme-icon">{isDark ? '🌙' : '☀️'}</span>
        <div className="switch-track">
          <div className="switch-thumb" />
        </div>
        <span className="theme-label">{isDark ? 'Dark' : 'Light'}</span>
      </div>
    );
  }

  return null;
};

export default ThemeToggle;