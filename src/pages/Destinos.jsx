import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiStar, FiChevronRight } from 'react-icons/fi';
import { FaUmbrellaBeach, FaMountain, FaCity, FaTree } from 'react-icons/fa';
import Destinations from '../components/Destinations';
import './styles/Destinos.css';
// import {Footer} from '../components/Footer';
import Footer from "../components/Footer";

const Destinos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos", icon: <FiMapPin /> },
    { id: "playa", name: "Playas", icon: <FaUmbrellaBeach /> },
    { id: "aventura", name: "Aventura", icon: <FaMountain /> },
    { id: "ciudad", name: "Ciudades", icon: <FaCity /> },
    { id: "naturaleza", name: "Naturaleza", icon: <FaTree /> }
  ];

  return (
    <div className="destinos-page">
      {/* Hero Section - Totalmente renovado */}
      <section className="hero-destinos">
        <div className="hero-video-overlay"></div>
        <video autoPlay loop muted playsInline className="hero-video-bg">
          <source src="/videos/colombia-tour.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-content-destinos">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title-destinos"
          >
            <span className="text-gradient">Explora Colombia</span> <br />como nunca antes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-subtitle-destinos"
          >
            Descubre los destinos más auténticos y experiencias únicas
          </motion.p>
        </div>
      </section>

      {/* Sección de Introducción - Diseño nuevo */}
      <section className="intro-destinos-section">
        <motion.div 
          className="intro-destinos-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="intro-destinos-text">
            <h2>Por qué elegir nuestros destinos</h2>
            <p>Cada rincón de Colombia tiene una historia que contar. Nos especializamos en mostrarte los lugares más auténticos, lejos de los caminos trillados.</p>
          </div>
          
          <div className="intro-destinos-features">
            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">✈️</div>
              <h3>Experiencias únicas</h3>
              <p>Vive momentos que solo encontrarás en Colombia</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">🏨</div>
              <h3>Alojamientos exclusivos</h3>
              <p>Desde eco-lodges hasta boutique hotels con encanto</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Guias locales</h3>
              <p>Conoce los destinos de la mano de quienes mejor los conocen</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Sección de Búsqueda - Mejorada */}
      <section className="search-destinos-section">
        <div className="search-destinos-container">
          <motion.div 
            className="search-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Busca tu destino ideal..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
          
          <div className="category-filters">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="filter-icon">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Destinos - Manteniendo tu componente */}
      <section className="destinos-list-section">
        <Destinations />
      </section>

      {/* Sección CTA - Rediseñada */}
      <section className="cta-destinos-section">
        <div className="cta-destinos-content">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ¿Necesitas ayuda para elegir tu próximo destino?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Nuestros expertos en viajes pueden crear el itinerario perfecto para ti
          </motion.p>
          
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Hablar con un experto <FiChevronRight />
          </motion.button>
        </div>
      </section>
      {/* <Footer /> */}
      <Footer />
    </div>
    
  );
};

export default Destinos;