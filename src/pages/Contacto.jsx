import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTiktok, FaPaperPlane, FaWhatsapp, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import Footer from "../components/Footer";
import { supabase } from '../utils/supabase';
import './styles/Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    hasError: false,
    errorMessage: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es requerido';
    }
    
    if (!formData.asunto.trim()) {
      errors.asunto = 'El asunto es requerido';
    }
    
    if (!formData.mensaje.trim()) {
      errors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    return errors;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormStatus({ isSubmitting: true, isSubmitted: false, hasError: false, errorMessage: '' });
    
    try {
      const { error } = await supabase
        .from('contactos')
        .insert([{
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          asunto: formData.asunto,
          mensaje: formData.mensaje
        }], { returning: 'minimal' });
      
      if (error) {
        throw error;
      }
      
      setFormStatus({ isSubmitting: false, isSubmitted: true, hasError: false, errorMessage: '' });
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
      setFormErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Error al enviar:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        hasError: true,
        errorMessage: error.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      });
    }
  };
  
  return (
    <main className="contacto-container">
      {/* HERO SECTION */}
      <section className="contacto-hero">
        <div className="hero-overlay" />
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <motion.div
          className="hero-content-contacto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span>Contacto Profesional</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Conecta con <span className="highlight">Nuestra Experiencia</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Transformamos tus sueños de viaje en experiencias inolvidables.
            <br />Contáctanos y descubre por qué somos líderes en turismo colombiano.
          </motion.p>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="stat">
              <span className="stat-number">15K+</span>
              <span className="stat-label">Viajeros Felices</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Soporte</span>
            </div>
            <div className="stat">
              <span className="stat-number">5⭐</span>
              <span className="stat-label">Calificación</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
      {/* MAIN CONTACT SECTION */}
      <section className="main-contact-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="header-badge">
              <span>Múltiples Canales</span>
            </div>
            <h2>Elige Tu Método de <span className="text-gradient">Contacto Preferido</span></h2>
            <p>Estamos disponibles a través de múltiples canales para brindarte la mejor atención personalizada</p>
          </motion.div>
          <div className="contact-main-grid">
            {/* PREMIUM CONTACT FORM */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <div className="form-icon">
                  <FaPaperPlane />
                </div>
                <h3>Envíanos un Mensaje</h3>
                <p>Completa el formulario y te responderemos en menos de 2 horas</p>
              </div>
              
              {formStatus.isSubmitted && (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaCheckCircle className="success-icon" />
                  <span>¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
                </motion.div>
              )}
              
              {formStatus.hasError && (
                <motion.div
                  className="form-error"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaExclamationTriangle className="error-icon" />
                  <span>{formStatus.errorMessage}</span>
                </motion.div>
              )}
              
              <form className="premium-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.nombre ? 'error' : ''}`}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {formErrors.nombre && <span className="error-message">{formErrors.nombre}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono *</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.telefono ? 'error' : ''}`}
                      placeholder="+57 300 123 4567"
                    />
                    {formErrors.telefono && <span className="error-message">{formErrors.telefono}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="asunto">Asunto *</label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.asunto ? 'error' : ''}`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {formErrors.asunto && <span className="error-message">{formErrors.asunto}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows="5"
                    className={`form-input ${formErrors.mensaje ? 'error' : ''}`}
                    placeholder="Cuéntanos sobre tu viaje soñado, fechas, número de personas, presupuesto aproximado..."
                    maxLength="500"
                  ></textarea>
                  {formErrors.mensaje && <span className="error-message">{formErrors.mensaje}</span>}
                  <div className="char-counter">
                    {formData.mensaje.length}/500 caracteres
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  className="premium-submit-btn"
                  disabled={formStatus.isSubmitting}
                  whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: formStatus.isSubmitting ? 1 : 0.98 }}
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <FaPaperPlane className="btn-icon" />
                    </>
                  )}
                </motion.button>
                
                <div className="form-footer">
                  <p>Al enviar este formulario, aceptas nuestros términos de privacidad</p>
                </div>
              </form>
            </motion.div>
            {/* CONTACT METHODS GRID */}
            <div className="contact-methods-grid">
              {/* PHONE CONTACT */}
              <motion.div
                className="contact-method-card phone-card clickable-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://wa.me/573111234567?text=Hola%20PiquiTours,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20turísticos.', '_blank')}
              >
                <div className="method-icon phone-icon">
                  <FaPhoneAlt />
                </div>
                <div className="method-content">
                  <h4>Llamada Directa</h4>
                  <p>Atención personalizada inmediata</p>
                  <div className="method-link-display">
                    +57 311 123 4567
                  </div>
                  <div className="method-schedule">
                    <FaClock className="schedule-icon" />
                    <span>Lun - Sáb: 8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="click-hint">
                    <FaWhatsapp className="whatsapp-icon-small" />
                    <span>Click para WhatsApp</span>
                  </div>
                </div>
                <div className="whatsapp-badge pulsing">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </div>
              </motion.div>
              {/* EMAIL CONTACT */}
              <motion.div
                className="contact-method-card email-card clickable-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('mailto:info@piquitours.com?subject=Consulta%20sobre%20servicios%20turísticos&body=Hola%20equipo%20de%20PiquiTours,%0A%0AMe%20interesa%20conocer%20más%20información%20sobre%20sus%20servicios%20turísticos.%0A%0ASaludos.', '_blank')}
              >
                <div className="method-icon email-icon">
                  <MdEmail />
                </div>
                <div className="method-content">
                  <h4>Correo Electrónico</h4>
                  <p>Respuesta garantizada en 2 horas</p>
                  <div className="method-link-display">
                    info@piquitours.com
                  </div>
                  <div className="method-extra">
                    <span>Comercial:</span>
                    <div className="method-link-small-display">
                      comercial@piquitours.com
                    </div>
                  </div>
                  <div className="click-hint">
                    <MdEmail className="email-icon-small" />
                    <span>Click para enviar email</span>
                  </div>
                </div>
              </motion.div>
              {/* LOCATION CONTACT */}
              <motion.div
                className="contact-method-card location-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="method-icon location-icon">
                  <MdLocationOn />
                </div>
                <div className="method-content">
                  <h4>Visita Nuestra Oficina</h4>
                  <p>Asesoría presencial especializada</p>
                  <address className="method-address">
                    Cra 9 #5-20, El Espinal<br />
                    Tolima, Colombia
                  </address>
                  <div className="method-schedule">
                    <FaClock className="schedule-icon" />
                    <span>Lun - Vie: 8:00 AM - 12:00 PM / 2:00 PM - 6:00 PM</span>
                  </div>
                </div>
              </motion.div>
              {/* EMERGENCY SUPPORT */}
              <motion.div
                className="contact-method-card emergency-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="method-icon emergency-icon">
                  <RiCustomerService2Fill />
                </div>
                <div className="method-content">
                  <h4>Soporte de Emergencia</h4>
                  <p>Asistencia 24/7 durante tu viaje</p>
                  <a href="tel:+573011234567" className="method-link emergency-link">
                    +57 301 123 4567
                  </a>
                  <div className="emergency-note">
                    <span>Exclusivo para viajeros PiquiTours</span>
                  </div>
                </div>
                <div className="emergency-badge">
                  <span>24/7</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* PREMIUM SOCIAL SECTION */}
      <section className="premium-social-section">
        <div className="social-background-effects">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        
        <div className="section-container">
          <motion.div
            className="premium-social-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="social-badge">
              <span>Comunidad Digital</span>
            </div>
            <h2>Únete a Nuestra <span className="text-gradient">Comunidad Viajera</span></h2>
            <p>Más de 88K viajeros ya forman parte de nuestra familia digital. Descubre destinos, ofertas exclusivas y experiencias únicas.</p>
          </motion.div>
          <div className="premium-social-grid">
            <motion.a
              href="https://facebook.com/piquitours"
              target="_blank"
              rel="noreferrer"
              className="premium-social-card facebook-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="social-card-background"></div>
              <div className="social-card-content">
                <div className="social-icon-container facebook-icon">
                  <FaFacebookF className="social-icon" />
                </div>
                <div className="social-info">
                  <h3>Facebook</h3>
                  <p>@piquitours</p>
                  <div className="follower-count">
                    <span className="count">15.2K</span>
                    <span className="label">Seguidores</span>
                  </div>
                  <div className="social-description">
                    Fotos exclusivas, testimonios reales y ofertas especiales para nuestra comunidad
                  </div>
                </div>
              </div>
              <div className="social-card-footer">
                <span>Síguenos</span>
                <div className="arrow-icon">→</div>
              </div>
            </motion.a>
            <motion.a
              href="https://instagram.com/piquitours"
              target="_blank"
              rel="noreferrer"
              className="premium-social-card instagram-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="social-card-background"></div>
              <div className="social-card-content">
                <div className="social-icon-container instagram-icon">
                  <FaInstagram className="social-icon" />
                </div>
                <div className="social-info">
                  <h3>Instagram</h3>
                  <p>@piquitours</p>
                  <div className="follower-count">
                    <span className="count">28.7K</span>
                    <span className="label">Seguidores</span>
                  </div>
                  <div className="social-description">
                    Stories diarias, reels de aventuras y los paisajes más increíbles de Colombia
                  </div>
                </div>
              </div>
              <div className="social-card-footer">
                <span>Síguenos</span>
                <div className="arrow-icon">→</div>
              </div>
            </motion.a>
            <motion.a
              href="https://tiktok.com/@piquitours"
              target="_blank"
              rel="noreferrer"
              className="premium-social-card tiktok-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="social-card-background"></div>
              <div className="social-card-content">
                <div className="social-icon-container tiktok-icon">
                  <FaTiktok className="social-icon" />
                </div>
                <div className="social-info">
                  <h3>TikTok</h3>
                  <p>@piquitours</p>
                  <div className="follower-count">
                    <span className="count">45.1K</span>
                    <span className="label">Seguidores</span>
                  </div>
                  <div className="social-description">
                    Videos virales, tips de viaje y momentos únicos que solo Colombia puede ofrecer
                  </div>
                </div>
              </div>
              <div className="social-card-footer">
                <span>Síguenos</span>
                <div className="arrow-icon">→</div>
              </div>
            </motion.a>
          </div>
          <motion.div
            className="social-stats-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stats-content">
              <div className="stat-item">
                <span className="stat-number">88K+</span>
                <span className="stat-label">Seguidores Totales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2.5M+</span>
                <span className="stat-label">Visualizaciones Mensuales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Engagement Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* PREMIUM MAP SECTION */}
      <section className="premium-map-section">
        <div className="map-background-effects">
          <div className="map-floating-element element-1"></div>
          <div className="map-floating-element element-2"></div>
          <div className="map-floating-element element-3"></div>
          <div className="map-floating-element element-4"></div>
        </div>
        
        <div className="section-container">
          <motion.div
            className="premium-map-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="location-badge">
              <FaMapMarkerAlt className="badge-icon" />
              <span>Ubicación Estratégica</span>
            </div>
            <h2>Encuéntranos en el <span className="text-gradient">Corazón de Colombia</span></h2>
            <p>Nuestra oficina principal está ubicada estratégicamente en El Espinal, Tolima - el punto perfecto para comenzar tu aventura colombiana.</p>
          </motion.div>
          <div className="premium-map-layout">
            <motion.div
              className="interactive-map-container"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="map-frame">
                <div className="map-overlay">
                  <div className="location-pin">
                    <FaMapMarkerAlt className="pin-icon" />
                    <div className="pin-pulse"></div>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.234391843344!2d-74.88578892468654!3d4.152876841943651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f2f45e8e6f5a5%3A0x3b3b3b3b3b3b3b3b!2sEl%20Espinal%2C%20Tolima!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Ubicación PiquiTours"
                ></iframe>
              </div>
              
              <div className="map-coordinates">
                <span className="coord-label">Coordenadas:</span>
                <span className="coord-value">4.1529°N, 74.8858°W</span>
              </div>
            </motion.div>
            <motion.div
              className="location-info-panel"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="info-panel-header">
                <h3>Información de Contacto</h3>
                <p>Estamos aquí para ayudarte</p>
              </div>
              <div className="premium-info-grid">
                <motion.div
                  className="premium-info-card address-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="info-card-icon address-icon">
                    <MdLocationOn />
                  </div>
                  <div className="info-card-content">
                    <h4>Dirección Oficial</h4>
                    <p>Cra 9 #5-20, El Espinal</p>
                    <span className="location-detail">Tolima, Colombia</span>
                    <div className="distance-info">
                      <span>📍 Centro de la ciudad</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="premium-info-card phone-card clickable-info-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('tel:+573111234567', '_self')}
                >
                  <div className="info-card-icon phone-icon">
                    <MdPhone />
                  </div>
                  <div className="info-card-content">
                    <h4>Línea Directa</h4>
                    <p className="contact-number">+57 311 123 4567</p>
                    <span className="availability">Disponible 24/7</span>
                    <div className="click-action">
                      <span>📞 Toca para llamar</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="premium-info-card email-card clickable-info-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:info@piquitours.com?subject=Consulta%20sobre%20servicios%20turísticos&body=Hola%20PiquiTours,%0A%0AMe%20interesa%20conocer%20más%20sobre%20sus%20servicios%20turísticos.%0A%0AGracias.', '_blank')}
                >
                  <div className="info-card-icon email-icon">
                    <MdEmail />
                  </div>
                  <div className="info-card-content">
                    <h4>Email Corporativo</h4>
                    <p className="contact-email">info@piquitours.com</p>
                    <span className="response-time">Respuesta en 2 horas</span>
                    <div className="click-action">
                      <span>✉️ Toca para escribir</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="premium-info-card schedule-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="info-card-icon schedule-icon">
                    <FaClock />
                  </div>
                  <div className="info-card-content">
                    <h4>Horarios de Atención</h4>
                    <div className="schedule-details">
                      <div className="schedule-item">
                        <span className="day">Lun - Vie:</span>
                        <span className="time">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="schedule-item">
                        <span className="day">Sábados:</span>
                        <span className="time">9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="schedule-item closed">
                        <span className="day">Domingos:</span>
                        <span className="time">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="visit-cta-banner"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="cta-content">
                  <h4>¿Prefieres una visita presencial?</h4>
                  <p>Nuestros expertos en turismo te esperan con café colombiano y las mejores ofertas</p>
                  <div className="cta-features">
                    <span>☕ Café de bienvenida</span>
                    <span>🗺️ Asesoría personalizada</span>
                    <span>💰 Descuentos exclusivos</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}