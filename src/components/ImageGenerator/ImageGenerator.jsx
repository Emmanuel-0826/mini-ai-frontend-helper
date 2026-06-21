// src/components/ImageGenerator/ImageGenerator.jsx
import React, { useState } from 'react';
import { useAI } from '../../hooks/useAI';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('512x512');
  const { generateImageWithAI, loading, imageUrl, error, clearImage } = useAI();
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description for the image');
      return;
    }

    const result = await generateImageWithAI(prompt, imageSize);
    if (result) {
      setGeneratedImage(result);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'ai-generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="image-generator">
      <h2>🎨 AI Image Generator</h2>
      <p className="subtitle">Generate images using DALL-E AI</p>

      <div className="image-generator-form">
        <textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="3"
          className="prompt-input"
        />

        <div className="image-options">
          <label>
            Image Size:
            <select value={imageSize} onChange={(e) => setImageSize(e.target.value)}>
              <option value="256x256">256×256</option>
              <option value="512x512">512×512</option>
              <option value="1024x1024">1024×1024</option>
            </select>
          </label>
        </div>

        <button 
          className="generate-btn" 
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate Image 🚀'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {generatedImage && (
        <div className="image-result">
          <h3>Generated Image</h3>
          <img src={generatedImage} alt={prompt} />
          <div className="image-actions">
            <button className="download-btn" onClick={handleDownload}>
              💾 Download
            </button>
            <button className="clear-btn" onClick={() => {
              setGeneratedImage(null);
              clearImage();
            }}>
              ✖ Clear
            </button>
            <button className="variation-btn" onClick={handleGenerate}>
              🔄 Generate Variation
            </button>
          </div>
          <p className="prompt-text">Prompt: {prompt}</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;