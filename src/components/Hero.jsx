
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
  'https://images.unsplash.com/photo-1519046904884-5315520b5817?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

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
    const destination = document.querySelector('.destinations-section');
    if (destination) {
      destination.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="hero">
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
        ❮
      </button>
      <button className="hero-button next" onClick={goToNext} aria-label="Imagen siguiente">
        ❯
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
          <span>Explora los lugares mas hermosos</span><br />
          con Piquitours
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
        <a href="https://www.facebook.com/share/1AiMVjLLDs/" target="_blank" rel="noreferrer">
          <FaFacebook />
          <span>Facebook</span>
        </a>
        <a href="https://www.instagram.com/piquitours?igsh=OThpM2EyajhwaGNt" target="_blank" rel="noreferrer">
          <FaInstagram />
          <span>Instagram</span>
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
          <FaWhatsapp />
          <span>Contáctanos</span>
        </a>
        <a href="https://piquitours.com" target="_blank" rel="noreferrer">
          <TbWorld />
          <span>Nuestra Web</span>
        </a>
      </div>
    </section>
  );
}
