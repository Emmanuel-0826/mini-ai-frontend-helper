import { useState } from 'react';
import { generateComponent, generateImage } from '../services/aiService';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const generateImageWithAI = async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateImage(prompt);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generate, generateImageWithAI, loading, error };
};