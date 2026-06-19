// src/components/common/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * @param {Object} props
 * @param {string} props.size - Size of spinner ('sm', 'md', 'lg', 'xl')
 * @param {string} props.color - Color of spinner
 * @param {string} props.label - Accessibility label
 * @param {boolean} props.fullPage - Whether to center on full page
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.text - Text to display below spinner
 * @param {React.ReactNode} props.children - Custom children
 */
const LoadingSpinner = ({
  size = 'md',
  color = '#667eea',
  label = 'Loading...',
  fullPage = false,
  className = '',
  text = '',
  children,
}) => {
  // Size mapping
  const sizeMap = {
    sm: '20px',
    md: '40px',
    lg: '60px',
    xl: '80px',
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  // Container classes
  const containerClasses = `loading-spinner-container ${fullPage ? 'full-page' : ''} ${className}`;

  return (
    <div className={containerClasses} role="status" aria-label={label}>
      {children || (
        <div className="loading-spinner-wrapper">
          <div
            className="loading-spinner"
            style={{
              width: spinnerSize,
              height: spinnerSize,
              borderColor: `${color} transparent transparent transparent`,
            }}
          />
          {text && <p className="loading-text">{text}</p>}
        </div>
      )}
    </div>
  );
};

/**
 * Dots Loading Spinner
 * @param {Object} props
 * @param {string} props.color - Color of dots
 * @param {string} props.size - Size of dots
 */
export const DotsSpinner = ({ color = '#667eea', size = '12px' }) => {
  return (
    <div className="dots-spinner" style={{ '--dot-color': color, '--dot-size': size }}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

/**
 * Pulse Loading Spinner
 * @param {Object} props
 * @param {string} props.color - Color of pulse
 * @param {string} props.size - Size of pulse
 */
export const PulseSpinner = ({ color = '#667eea', size = '40px' }) => {
  return (
    <div className="pulse-spinner" style={{ '--pulse-color': color, '--pulse-size': size }}>
      <div className="pulse-ring"></div>
    </div>
  );
};

/**
 * Skeleton Loading Placeholder
 * @param {Object} props
 * @param {string} props.width - Width of skeleton
 * @param {string} props.height - Height of skeleton
 * @param {string} props.borderRadius - Border radius of skeleton
 * @param {number} props.count - Number of skeleton items
 */
export const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  count = 1,
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        marginBottom: count > 1 && index < count - 1 ? '10px' : '0',
      }}
    />
  ));

  return <div className="skeleton-wrapper">{skeletons}</div>;
};

export default LoadingSpinner;