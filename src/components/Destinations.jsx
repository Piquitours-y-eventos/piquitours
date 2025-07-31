import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
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
      {/* Efectos visuales */}
      {[...Array(2)].map((_, i) => (
        <div 
          key={i}
          className="glow-effect"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `scale(${0.5 + Math.random() * 0.5})`
          }}
        />
      ))}

      <div className="image-container">
        <img 
          src={destination.image} 
          alt={destination.title}
          loading="lazy"
        />

        <div className="rating-badge">
          ⭐
          <span>{destination.rating}</span>
        </div>
      </div>

      <div className="content-container">
        <div className="card-header">
          <h3>{destination.title}</h3>
          <motion.div 
            className="price-tag"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            ${destination.price}
          </motion.div>
        </div>

        <p className="card-description">{destination.description}</p>

        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCardClick(destination)}
        >
          Conoce más
          <FiArrowUpRight style={{ fontSize: '1.4rem' }} />
        </motion.button>
      </div>

      {/* Partículas flotantes */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="floating-particle"
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${8 + Math.random() * 8}s`
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  return (
    <section className="destinations-section" id="destinos">
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
      
      <TourDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour}
      />
    </section>
  );
};

export default Destinations;

