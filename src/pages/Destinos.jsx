import React from 'react';
import { motion } from 'framer-motion';
import Destinations from '../components/Destinations';
import Footer from '../components/Footer';
import './styles/Destinos.css';

const Destinos = () => {
  return (
    <div className="destinos-page">
      {/* Minimal Intro Section */}
      <section className="destinos-intro-section">
        <div className="intro-gradient-overlay" />
        
        <motion.div
          style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="intro-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ✈️ Destinos únicos en Colombia
          </motion.div>
          
          <motion.h1
            className="intro-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explora Colombia con <span className="intro-gradient-text">PiquiTours</span>
          </motion.h1>
          
          <motion.p
            className="intro-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Descubre experiencias auténticas y destinos extraordinarios diseñados para crear recuerdos inolvidables
          </motion.p>
        </motion.div>
      </section>

      {/* Main Destinations Component */}
      <Destinations />
      
      <Footer />
    </div>
  );
};

export default Destinos;