import React from 'react';
import { motion } from 'framer-motion';
import Destinations from '../components/Destinations';
import Footer from '../components/Footer';

const Destinos = () => {
  return (
    <div className="destinos-page">
      {/* Minimal Intro Section */}
      <section style={{ 
        padding: '80px 20px 60px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(218, 165, 32, 0.1) 0%, rgba(255, 140, 0, 0.1) 50%, rgba(220, 20, 60, 0.1) 100%)',
          zIndex: 1
        }} />
        
        <motion.div
          style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #DAA520, #FF8C00, #DC143C)',
              color: '#fff',
              padding: '8px 24px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px',
              letterSpacing: '0.5px'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ✈️ Destinos únicos en Colombia
          </motion.div>
          
          <motion.h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explora Colombia con <span style={{ 
              background: 'linear-gradient(90deg, #DAA520, #FF8C00, #DC143C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>PiquiTours</span>
          </motion.h1>
          
          <motion.p
            style={{
              fontSize: '18px',
              color: '#ccc',
              lineHeight: '1.6',
              marginBottom: '0'
            }}
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