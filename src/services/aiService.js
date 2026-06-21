// src/services/aiService.js
import axios from 'axios';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = import.meta.env.VITE_AI_API_URL || 'https://api.openai.com/v1/chat/completions';

/**
 * Generate a React component using OpenAI
 * @param {string} prompt - Description of the component
 * @param {string} type - Type of component (navbar, hero, card, etc.)
 * @returns {string} - Generated component code
 */
export const generateComponent = async (prompt, type) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a React component generator. Generate clean, modern React components with CSS styling.'
          },
          {
            role: 'user',
            content: `Generate a ${type} component: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Generation Error:', error);
    return 'Failed to generate component. Please try again.';
  }
};

/**
 * ✅ ADD THIS FUNCTION HERE ✅
 * Generate an image using DALL-E
 * @param {string} prompt - Description of the image to generate
 * @param {string} size - Image size (256x256, 512x512, or 1024x1024)
 * @param {number} n - Number of images to generate
 * @returns {string} - URL of the generated image
 */
export const generateImage = async (prompt, size = '512x512', n = 1) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: n,
        size: size
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.data[0].url;
  } catch (error) {
    console.error('Image Generation Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return null;
  }
};

/**
 * Generate multiple images using DALL-E
 * @param {string} prompt - Description of the images to generate
 * @param {number} count - Number of images to generate (1-10)
 * @param {string} size - Image size (256x256, 512x512, or 1024x1024)
 * @returns {string[]} - Array of image URLs
 */
export const generateMultipleImages = async (prompt, count = 4, size = '512x512') => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: count,
        size: size
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.data.map(item => item.url);
  } catch (error) {
    console.error('Multiple Images Generation Error:', error);
    return [];
  }
};

/**
 * Generate an image variation using DALL-E
 * @param {string} imageUrl - URL of the image to vary
 * @param {string} size - Image size (256x256, 512x512, or 1024x1024)
 * @returns {string} - URL of the generated variation
 */
export const generateImageVariation = async (imageUrl, size = '512x512') => {
  try {
    // Fetch the image as a blob
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    
    const formData = new FormData();
    formData.append('image', imageBlob, 'image.png');
    formData.append('n', '1');
    formData.append('size', size);
    
    const response = await axios.post(
      'https://api.openai.com/v1/images/variations',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data.data[0].url;
  } catch (error) {
    console.error('Image Variation Generation Error:', error);
    return null;
  }
};

// Export all functions as default
export default {
  generateComponent,
  generateImage,
  generateMultipleImages,
  generateImageVariation
};