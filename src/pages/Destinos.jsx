import React from 'react';
import { motion } from 'framer-motion';
import Destinations from '../components/Destinations';
import Footer from '../components/Footer';
import './styles/Destinos.css';

const Destinos = () => {
  return (
    <div className="destinos-page">
      {/* Premium Hero Section - Updated for better responsiveness and professionalism */}
      <section className="premium-hero-destinos">
        <div className="floating-shapes">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>
        <div className="hero-gradient-overlay" />
        
        <motion.div className="premium-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ✈️ Destinos únicos en Colombia
          </motion.div>
          
          <motion.h1 className="premium-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explora Colombia con <span className="gradient-text">PiquiTours</span>
          </motion.h1>
          
          <motion.p className="premium-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Descubre experiencias auténticas y destinos extraordinarios diseñados para crear recuerdos inolvidables
          </motion.p>
          
          {/* Added hero stats for more engaging and professional look */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">🌍</div>
              <div className="stat-value">50+</div>
              <div className="stat-label">Destinos</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">4.9</div>
              <div className="stat-label">Calificación</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-value">10k+</div>
              <div className="stat-label">Viajeros Felices</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Destinations Component */}
      <Destinations />
      
      <Footer />
    </div>
  );
};

export default Destinos;