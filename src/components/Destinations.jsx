
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import './styles/Destinations.css';

const DestinationCard = React.memo(({ destination, index }) => {
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
          loading="lazy" // Carga perezosa
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
            ${destination.price.toLocaleString()}
          </motion.div>
        </div>

        <p id='card-description-01'>{destination.description}</p>

        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Conoce más
          <FiArrowUpRight style={{ fontSize: '1.4rem' }} />
        </motion.button>
      </div>

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
  const destinations = [
    {
      title: "ARRÁS DE CIELO",
      description: "Peñol y Guatapé, dos razones para enamorarte de Antioquia.",
      image: "/guatap2.jpeg",
      rating: 4.9,
      price: "420,000"
    },
    {
      title: "SABOR CARIBE",
      description: "Barú, Rodadero y Cartagena: tres joyas, un solo paraíso.",
      image: "/baru.jpeg", // Reemplaza con una URL válida
      rating: 4.8,
      price: "850,000"
    },
    {
      title: "MAR DE SIETE COLORES",
      description: "Entre corales y brisa, San Andrés te enamora",
      image: "sanandres2.jpeg", // Reemplaza con una URL válida
      rating: 5.0,
      price: "1,700,000"
    },
    {
      title: "TRES DESTINOS",
      description: "Paisajes que inspiran, emociones que aceleran: así se vive el Quindío.",
      image: "quindio.jpg", // Reemplaza con una URL válida
      rating: 5.0,
      price: "450,000"
    },
    {
      title: "VAMOS PA'L PUEBLO",
      description: "Boyacá: Donde cada rincón tiene una historia, y cada paisaje, un suspiro",
      image: "", // Reemplaza con una URL válida
      rating: 5.0,
      price: 0
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
      image: "https://via.placeholder.com/600x400?text=Destino+6", // Reemplaza con una URL válida
      rating: 5.0,
      price: 0
    }
  ];

  return (
    <section className="destinations-section" id="destinos">
      <div className="destinations-grid">
        {destinations.map((destination, index) => (
          <DestinationCard
            key={index}
            destination={destination}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Destinations;

