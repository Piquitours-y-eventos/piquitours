import React, { useState, useEffect, useRef } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import './styles/Hero.css';

const TEXTS = [
  "Viajes inolvidables en Colombia",
  "Experiencias únicas en Colombia",
  "Aventuras personalizadas",
  "Turismo sostenible y responsable"
];

const IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://i0.wp.com/blog.vivaaerobus.com/wp-content/uploads/2022/04/playas-colombia-1.jpg?fit=1920%2C1080&ssl=1',
  'https://www.portafolio.co/files/article_new_multimedia/uploads/2024/02/05/65c10956b22b1.jpeg'
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % TEXTS.length);
    }, 4000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % IMAGES.length);
    }, 5000);

    return () => {
      clearInterval(textInterval);
      clearInterval(imageInterval);
    };
  }, []);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const handleScroll = () => {
    try {
      const destination = document.querySelector('.destinations-section');
      if (destination && destination.offsetParent !== null) {
        destination.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback: scroll to next section or a reasonable position
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      console.warn('Error scrolling to destination:', error);
      // Fallback scroll
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      className="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-images">
        {IMAGES.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Destino ${index + 1}`}
            className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
            loading="lazy"
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-gradient" />
      <button className="hero-button prev" onClick={goToPrevious} aria-label="Imagen anterior">
        ←
      </button>
      <button className="hero-button next" onClick={goToNext} aria-label="Imagen siguiente">
        →
      </button>
      <div className="hero-dots">
        {IMAGES.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
      <div className="hero-content">
        <h1>
          <span>Explora los lugares más <br /> hermosos</span><br />
          con <span className="piquitours-text">Piquitours</span>
        </h1>
        <div className="animated-text-container">
          {TEXTS.map((text, index) => (
            <div
              key={text}
              className={`animated-text ${index === currentTextIndex ? 'active' : ''}`}
              aria-hidden={index !== currentTextIndex}
            >
              {text}
            </div>
          ))}
        </div>
        <button
          className="button-continue"
          onClick={handleScroll}
          aria-label="Explorar destinos"
        >
          Descubre tu próxima aventura
          <span className="arrow-down">↓</span>
        </button>
      </div>
      <div className="redes-sociales">
        <a href="https://www.facebook.com/share/1AiMVjLLDs/" target="_blank" rel="noreferrer noopener">
          <FaFacebook />
          <span>Facebook</span>
        </a>
        <a href="https://www.instagram.com/piquitours?igsh=OThpM2EyajhwaGNt" target="_blank" rel="noreferrer noopener">
          <FaInstagram />
          <span>Instagram</span>
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noreferrer noopener">
          <FaWhatsapp />
          <span>Contáctanos</span>
        </a>
        <a href="https://piquitours.com" target="_blank" rel="noreferrer noopener">
          <TbWorld />
          <span>Website</span>
        </a>
      </div>
    </section>
  );
}