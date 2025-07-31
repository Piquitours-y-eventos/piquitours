import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTiktok, FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import Footer from "../components/Footer";
import './styles/Contacto.css';

export default function Contacto() {
  return (
    <main className="contacto-container">
      {/* HERO SECTION */}
      <section className="contacto-hero">
        <div className="hero-overlay" />
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Conecta con <span className="highlight">nuestra pasión</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Estamos aquí para hacer realidad tu próxima aventura colombiana
          </motion.p>
        </motion.div>
      </section>

      {/* CONTACT GRID */}
      <section className="contact-grid-section">
        <div className="section-container">
          <motion.div 
            className="contact-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>¿Cómo prefieres comunicarte?</h2>
            <p>Elige el método que más te convenga</p>
          </motion.div>

          <div className="contact-grid">
            {/* FORM CARD */}
            <motion.div 
              className="contact-card form-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="card-icon">
                <FaPaperPlane />
              </div>
              <h3>Envíanos un mensaje</h3>
              
              <form className="contact-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    className="form-input"
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="form-input"
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
                
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Asunto" 
                    className="form-input"
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
                
                <div className="form-group">
                  <textarea 
                    placeholder="Tu mensaje..." 
                    rows="4"
                    className="form-input"
                    required
                  ></textarea>
                  <div className="input-highlight"></div>
                </div>
                
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar mensaje
                  <FaPaperPlane className="btn-icon" />
                </motion.button>
              </form>
            </motion.div>

            {/* CONTACT METHODS */}
            <div className="contact-methods">
              {/* PHONE CARD */}
              <motion.div 
                className="contact-card method-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="card-icon">
                  <FaPhoneAlt />
                </div>
                <h3>Llámanos</h3>
                <p>Disponibles de lunes a sábado de 8am a 6pm</p>
                <a href="tel:+573111234567" className="contact-link">
                  +57 311 123 4567
                </a>
                <div className="whatsapp-option">
                  <FaWhatsapp className="whatsapp-icon" />
                  <span>También por WhatsApp</span>
                </div>
              </motion.div>

              {/* EMAIL CARD */}
              <motion.div 
                className="contact-card method-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="card-icon">
                  <FaEnvelope />
                </div>
                <h3>Escríbenos</h3>
                <p>Respondemos en menos de 24 horas</p>
                <a href="mailto:info@piquitours.com" className="contact-link">
                  info@piquitours.com
                </a>
                <div className="contact-extra">
                  <span>Para propuestas comerciales:</span>
                  <a href="mailto:comercial@piquitours.com" className="contact-link small">
                    comercial@piquitours.com
                  </a>
                </div>
              </motion.div>

              {/* VISIT CARD */}
              <motion.div 
                className="contact-card method-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="card-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Visítanos</h3>
                <p>Nuestra oficina en El Espinal</p>
                <address className="contact-address">
                  Cra 9 #5-20, El Espinal, Tolima, Colombia
                </address>
                <div className="contact-extra">
                  <span>Horario de atención:</span>
                  <p>Lunes a Viernes: 8am - 12pm / 2pm - 6pm</p>
                </div>
              </motion.div>

              {/* SUPPORT CARD */}
              <motion.div 
                className="contact-card method-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="card-icon">
                  <RiCustomerService2Fill />
                </div>
                <h3>Soporte en viaje</h3>
                <p>Emergencias durante tu aventura</p>
                <a href="tel:+573011234567" className="contact-link emergency">
                  +57 301 123 4567
                </a>
                <div className="contact-note">
                  Disponible 24/7 para viajeros PiquiTours
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL SECTION */}
      <section className="social-section">
        <div className="section-container">
          <motion.div 
            className="social-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Síguenos en redes</h2>
            <p>Conoce nuestras últimas aventuras y ofertas especiales</p>
          </motion.div>

          <div className="social-grid">
            <motion.a 
              href="https://facebook.com/piquitours" 
              target="_blank" 
              rel="noreferrer"
              className="social-card facebook"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <FaFacebookF className="social-icon" />
              <span>Facebook</span>
              <p>@piquitours</p>
              <div className="social-followers">+15k seguidores</div>
            </motion.a>

            <motion.a 
              href="https://instagram.com/piquitours" 
              target="_blank" 
              rel="noreferrer"
              className="social-card instagram"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <FaInstagram className="social-icon" />
              <span>Instagram</span>
              <p>@piquitours</p>
              <div className="social-followers">+28k seguidores</div>
            </motion.a>

            <motion.a 
              href="https://tiktok.com/@piquitours" 
              target="_blank" 
              rel="noreferrer"
              className="social-card tiktok"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <FaTiktok className="social-icon" />
              <span>TikTok</span>
              <p>@piquitours</p>
              <div className="social-followers">+45k seguidores</div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <div className="section-container">
          <motion.div 
            className="map-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Encuéntranos fácilmente</h2>
            <p>Visita nuestra oficina principal en El Espinal</p>
          </motion.div>

          <motion.div 
            className="map-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.234391843344!2d-74.88578892468654!3d4.152876841943651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f2f45e8e6f5a5%3A0x3b3b3b3b3b3b3b3b!2sEl%20Espinal%2C%20Tolima!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Ubicación PiquiTours"
            ></iframe>
            
            <div className="map-info">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Dirección</h4>
                  <p>Cra 9 #5-20, El Espinal, Tolima</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <div>
                  <h4>Teléfono</h4>
                  <p>+57 311 123 4567</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>info@piquitours.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}