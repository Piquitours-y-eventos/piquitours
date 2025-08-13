
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaArrowUp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaAward, FaUsers, FaGlobeAmericas } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import './styles/Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/+573208126905', '_blank');
  };

  return (
    <footer className="footer">
      <div className="back-to-top" onClick={scrollToTop}>
        <FaArrowUp className="arrow-icon" />
      </div>

      <div className="floating-whatsapp" onClick={openWhatsApp}>
        <FaWhatsapp className="whatsapp-icon" />
      </div>
      
      <div className="footer-content">
        <div className="footer-section company-info">
          <img 
            src="/logo_entero.png" 
            alt="Piquitours Logo" 
            className="footer-logo"
          />
          <p className="company-description">Expertos en experiencias turísticas auténticas y memorables en El Espinal, Tolima. Tu aventura perfecta nos espera.</p>
          
          <div className="company-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div>
                <span className="stat-number">500+</span>
                <span className="stat-label">Clientes Felices</span>
              </div>
            </div>
            <div className="stat-item">
              <FaAward className="stat-icon" />
              <div>
                <span className="stat-number">5+</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
            </div>
            <div className="stat-item">
              <FaGlobeAmericas className="stat-icon" />
              <div>
                <span className="stat-number">20+</span>
                <span className="stat-label">Destinos Únicos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>Nuestros Servicios</h4>
          <ul className="footer-links">
            <li><a href="/destinos">Tours Personalizados</a></li>
            <li><a href="/paquetes">Paquetes Todo Incluido</a></li>
            <li><a href="/eventos">Organización de Eventos</a></li>
            <li><a href="/transporte">Transporte Turístico</a></li>
            <li><a href="/guias">Guías Especializados</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>El Espinal, Tolima - Colombia</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+57 320 812 6905</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>info@piquitours.com</span>
            </div>
          </div>
          
          <div className="rating-section">
            <div className="rating-stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="rating-text">Calificación 5.0 estrellas</p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1AiMVjLLDs/" className="social-icon facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" className="social-icon twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://wa.me/+573208126905" className="social-icon whatsapp" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>
          
          <div className="newsletter-section">
            <h5>Newsletter Exclusivo</h5>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Suscribirse</button>
            </form>
            <p className="newsletter-text">Ofertas especiales y destinos únicos</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Piquitours & Eventos. Todos los derechos reservados.</p>
        <p>El Espinal, Tolima - Colombia | NIT: xxxxx | RNT: xxxxx</p>
      </div>
    </footer>
  );
}
