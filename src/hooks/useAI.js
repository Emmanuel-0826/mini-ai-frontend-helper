// src/hooks/useAI.js
import { useState } from 'react';
import { generateComponent, generateImage, generateImageVariation } from '../services/aiService';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Component generation
  const generate = async (prompt, type) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateComponent(prompt, type);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Image generation
  const generateImageWithAI = async (prompt, size = '512x512') => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateImage(prompt, size);
      setImageUrl(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Image variation
  const generateVariation = async (imageUrl) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateImageVariation(imageUrl);
      setImageUrl(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear image
  const clearImage = () => {
    setImageUrl(null);
  };

  return { 
    generate, 
    generateImageWithAI, 
    generateVariation,
    clearImage,
    loading, 
    error,
    imageUrl
  };
};