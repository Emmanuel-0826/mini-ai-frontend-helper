import React from 'react';
import './Card.css';

const Card = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  onGenerate,
  generatedContent 
}) => {
  return (
    <div className="card-custom" style={{ background: bgColor || '#f8f9fa' }}>
      <div className="card-icon">{icon || '🎯'}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      
      {generatedContent && (
        <div className="card-generated-content">
          <p>{generatedContent}</p>
        </div>
      )}
      
      <button className="card-button" onClick={onGenerate}>
        Generate with AI
      </button>
    </div>
  );
};

export default Card;