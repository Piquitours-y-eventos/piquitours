import React, { useState, useEffect, useRef } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Nuevos iconos para prev/next
import { TbWorld } from 'react-icons/tb';
import './styles/Hero.css';
import carrosel_1 from './../../public/carrosel_1.jpg'
import carrosel_2 from './../../public/carrosel_2.png'

const TEXTS = [
  "Viajes inolvidables en Colombia",
  "Experiencias únicas en Colombia",
  "Aventuras personalizadas",
  "Turismo sostenible y responsable"
];

const IMAGES = [
  // carrosel_1,
  // carrosel_2,
  'https://i0.wp.com/blog.vivaaerobus.com/wp-content/uploads/2022/04/playas-colombia-1.jpg?fit=1920%2C1080&ssl=1',
  'https://www.portafolio.co/files/article_new_multimedia/uploads/2024/02/05/65c10956b22b1.jpeg',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTROPZcm-a6wLqgCBijhU_BDQcgrSU7czuPAA&s',
  'https://wallpapers.com/images/featured/colombia-lznwnf00i3uafytz.jpg',
  'https://denomades-blog.imgix.net/blog/wp-content/uploads/2017/10/19150237/Colombia_cartagena-de-indias.jpg?auto=compress%2Cformat&ixlib=php-3.3.1'
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
        <FaArrowLeft /> {/* Icono nuevo, centrado vía CSS */}
      </button>
      <button className="hero-button next" onClick={goToNext} aria-label="Imagen siguiente">
        <FaArrowRight /> {/* Icono nuevo, centrado vía CSS */}
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
        <a href="https://www.facebook.com/profile.php?id=100068920613548" target="_blank" rel="noreferrer noopener">
          <FaFacebook />
          <span>Facebook</span>
        </a>
        <a href="https://www.instagram.com/piquitours/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer noopener">
          <FaInstagram />
          <span>Instagram</span>
        </a>
        <a href="https://wa.me/573115776477?text=Hola%2C%20quisiera%20saber%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20tours%20de%20Piquitours" target="_blank" rel="noreferrer noopener">
          <FaWhatsapp />
          <span>Contáctanos</span>
        </a>
      </div>
    </section>
  );
}