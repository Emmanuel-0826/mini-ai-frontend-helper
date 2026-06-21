// src/pages/Home.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Form from '../components/Form';
import ImageGenerator from '../components/ImageGenerator/ImageGenerator'; // ✅ ADD THIS
import { useUser } from '../context/UserContext';
import './Home.css';

const Home = () => {
  const { user, updateUser } = useUser();
  const [generatedContent, setGeneratedContent] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGenerate = (type) => {
    setLoading(true);
    setTimeout(() => {
      const content = {
        navbar: 'AI-generated Navbar with dark theme and dropdown',
        hero: 'Hero section with animated gradient background',
        card: 'Card component with hover effects and shadow'
      };
      setGeneratedContent(prev => ({
        ...prev,
        [type]: content[type] || 'AI-generated component content'
      }));
      setLoading(false);
    }, 1500);
  };

  const handleFormSubmit = (formData) => {
    updateUser({ name: formData.name });
    handleGenerate(formData.componentType);
  };

  return (
    <div className="home">
      <Navbar />
      <Hero 
        title="Build Components with AI"
        subtitle="Generate React components instantly using artificial intelligence"
        ctaText="Start Building"
        onCtaClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
      />
      
      <section className="features-section" id="features">
        <h2 className="section-title">AI-Generated Components</h2>
        <div className="cards-grid">
          <Card
            title="AI Navbar"
            description="Generate a responsive navigation bar with custom styles"
            icon="🧭"
            bgColor="#f0f4ff"
            generatedContent={generatedContent.navbar}
            onGenerate={() => handleGenerate('navbar')}
          />
          <Card
            title="AI Hero"
            description="Create an eye-catching hero section for your landing page"
            icon="🚀"
            bgColor="#f5f0ff"
            generatedContent={generatedContent.hero}
            onGenerate={() => handleGenerate('hero')}
          />
          <Card
            title="AI Card"
            description="Design modern cards with hover effects and animations"
            icon="🎴"
            bgColor="#fff5f0"
            generatedContent={generatedContent.card}
            onGenerate={() => handleGenerate('card')}
          />
        </div>
      </section>

      {/* ✅ ADD THIS SECTION */}
      <section className="image-generator-section">
        <ImageGenerator />
      </section>

      <section className="form-section" id="form">
        <Form onSubmit={handleFormSubmit} loading={loading} />
      </section>

      <footer className="footer">
        <p>Made with 🤖 by AI Frontend Helper</p>
      </footer>
    </div>
  );
};

export default Home;