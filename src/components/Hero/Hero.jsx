// src/components/Hero/Hero.jsx
import React from 'react';
import { useUser } from '../../context/UserContext';
import './Hero.css';

const Hero = ({ title, subtitle, ctaText, onCtaClick }) => {
  const { user } = useUser();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          {title || 'Welcome to AI Frontend Helper'}
        </h1>
        {user.name !== 'Guest' && (
          <p className="hero-greeting">👋 Welcome back, {user.name}!</p>
        )}
        <p className="hero-subtitle">
          {subtitle || 'Generate amazing UI components with the power of AI'}
        </p>
        <button className="hero-cta" onClick={onCtaClick}>
          {ctaText || 'Get Started'}
        </button>
      </div>
      <div className="hero-image">
        <div className="hero-ai-animation">
          <span className="ai-emoji">✨</span>
          <span className="ai-emoji">🧠</span>
          <span className="ai-emoji">💡</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;