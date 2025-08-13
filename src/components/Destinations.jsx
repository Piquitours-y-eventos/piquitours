import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import TourDetailsModal from './TourDetailsModal';
import toursData from '../data/tours.json';
import './styles/Destinations.css';

const DestinationCard = React.memo(({ destination, index, onCardClick }) => {
  return (
    <motion.div
      className="destination-card"
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -200px 0px" }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 90
      }}
    >
      {/* Efectos visuales premium */}
      <div className="card-glow-effect"></div>
      <div className="card-shimmer"></div>

      <div className="image-container">
        <img 
          src={destination.image} 
          alt={destination.title}
          loading="lazy"
        />
        <div className="image-overlay"></div>

        <div className="rating-badge">
          <FiStar className="star-icon" />
          <span>{destination.rating}</span>
        </div>

        <div className="quick-info">
          <div className="info-item">
            <FiMapPin className="info-icon" />
            <span>{destination.location || 'El Espinal'}</span>
          </div>
          <div className="info-item">
            <FiClock className="info-icon" />
            <span>{destination.duration || '3 días'}</span>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="card-header">
          <h3 className="card-title">{destination.title}</h3>
          <motion.div 
            className="price-tag"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <span className="price-currency">$</span>
            <span className="price-amount">{destination.price}</span>
            <span className="price-unit">COP</span>
          </motion.div>
        </div>

        <p className="card-description">{destination.description}</p>

        <div className="card-features">
          <div className="feature-item">
            <FiUsers className="feature-icon" />
            <span>Hasta {destination.maxPeople || 12} personas</span>
          </div>
        </div>

        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCardClick(destination)}
        >
          <span>Conoce más</span>
          <FiArrowUpRight className="cta-icon" />
        </motion.button>
      </div>

      {/* Partículas doradas */}
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="golden-particle"
          style={{
            animationDelay: `${i * 2}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
    </motion.div>
  );
});

const Destinations = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  };

  // Efecto para manejar el scroll cuando se monta/desmonta el componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section className="destinations-section" id="destinos">
      <div className="destinations-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-accent">Descubre</span>
            <span className="title-main">Nuestros Destinos</span>
          </h2>
          <p className="section-subtitle">
            Experiencias únicas que transformarán tu forma de viajar
          </p>
        </motion.div>

        <div className="destinations-grid">
          {toursData.tours.map((tour, index) => (
            <DestinationCard
              key={tour.id}
              destination={tour}
              index={index}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      
      <TourDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour}
      />
    </section>
  );
};

export default Destinations;

