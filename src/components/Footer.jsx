// Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, MessageCircle, ArrowUp, Phone, Mail, MapPin, Star } from 'lucide-react';
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
      {/* Floating Action Buttons */}
      <div className="back-to-top" onClick={scrollToTop}>
        <ArrowUp className="arrow-icon" size={20} strokeWidth={2.5} />
      </div>

      <div className="floating-whatsapp" onClick={openWhatsApp}>
        <MessageCircle className="whatsapp-icon" size={24} strokeWidth={2} />
      </div>
      
      <div className="footer-content">
        {/* Company Section */}
        <motion.div 
          className="footer-section company-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img 
            src="/logo.png" 
            alt="Piquitours Logo" 
            className="footer-logo"
          />
          <p className="company-description">
            Expertos en experiencias turísticas auténticas y memorables en El Espinal, Tolima. 
            Tu aventura perfecta nos espera.
          </p>
          
          <div className="trust-indicators">
            <div className="rating-display">
              <div className="rating-stars">
                <Star size={16} fill="#ffd700" strokeWidth={0} />
                <Star size={16} fill="#ffd700" strokeWidth={0} />
                <Star size={16} fill="#ffd700" strokeWidth={0} />
                <Star size={16} fill="#ffd700" strokeWidth={0} />
                <Star size={16} fill="#ffd700" strokeWidth={0} />
              </div>
              <span className="rating-text">5.0 • 500+ clientes satisfechos</span>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4>Servicios</h4>
          <ul className="footer-links">
            <li><a href="/destinos">Tours Personalizados</a></li>
            <li><a href="/paquetes">Paquetes Todo Incluido</a></li>
            <li><a href="/eventos">Organización de Eventos</a></li>
            <li><a href="/transporte">Transporte Turístico</a></li>
            <li><a href="/guias">Guías Especializados</a></li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4>Contacto</h4>
          <div className="contact-info">
            <div className="contact-item">
              <MapPin className="contact-icon" size={18} strokeWidth={2} />
              <span>El Espinal, Tolima - Colombia</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" size={18} strokeWidth={2} />
              <span>+57 320 812 6905</span>
            </div>
            <div className="contact-item">
              <Mail className="contact-icon" size={18} strokeWidth={2} />
              <span>info@piquitours.com</span>
            </div>
          </div>
        </motion.div>

        {/* Social & Newsletter Section */}
        <motion.div 
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4>Conecta con nosotros</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1AiMVjLLDs/" className="social-icon facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={22} strokeWidth={2} />
            </a>
            <a href="https://instagram.com" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={22} strokeWidth={2} />
            </a>
            <a href="https://twitter.com" className="social-icon twitter" target="_blank" rel="noopener noreferrer">
              <Twitter size={22} strokeWidth={2} />
            </a>
            <a href="https://wa.me/+573208126905" className="social-icon whatsapp" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={22} strokeWidth={2} />
            </a>
          </div>
          
          <div className="newsletter-section">
            <h5>Newsletter</h5>
            <p className="newsletter-description">Recibe ofertas exclusivas y descubre nuevos destinos</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Suscribirse</button>
            </form>
          </div>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} Piquitours & Eventos. Todos los derechos reservados.</p>
          <p>El Espinal, Tolima - Colombia</p>
        </div>
      </div>
    </footer>
  );
}