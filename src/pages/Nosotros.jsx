import { motion } from "framer-motion";
import { FaUsers, FaGlobeAmericas, FaMapSigns, FaBolt, FaHeart, FaLeaf, FaHandshake, FaMedal } from "react-icons/fa";
import { GiColombia } from "react-icons/gi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './styles/Nosotros.css';

export default function Nosotros() {
  return (
    <main className="nosotros-container">
      {/* <Header /> */}
      
      {/* HERO SECTION CON EFECTO PARALLAX */}
      <section className="hero-nosotros">
        <div className="video-overlay" />
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/video_colombia.mp4" type="video/mp4" />
        </video>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="hero-title">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Descubre el corazón
              </motion.span>
              <motion.br 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <motion.span 
                className="highlight-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                de Colombia
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Más que viajes, creamos conexiones auténticas con nuestra tierra y su gente
          </motion.p>
          
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="mouse"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* MÉTRICAS INTERACTIVAS */}
      <section className="hero-stats">
        <motion.div 
          className="stats-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="stat">
            <motion.div 
              className="icon-container"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <FaUsers className="icon pulse" />
            </motion.div>
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              +15,000
            </motion.h3>
            <p>Viajeros felices</p>
          </div>
          
          <div className="stat">
            <motion.div 
              className="icon-container"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <GiColombia className="icon pulse" />
            </motion.div>
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              +50
            </motion.h3>
            <p>Rincones mágicos</p>
          </div>
          
          <div className="stat">
            <motion.div 
              className="icon-container"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <FaMapSigns className="icon pulse" />
            </motion.div>
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              11 años
            </motion.h3>
            <p>Tejiendo historias</p>
          </div>
        </motion.div>
      </section>

      {/* HISTORIA CON TIMELINE */}
      <section className="history-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nuestra <span className="highlight">Historia</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Un viaje de pasión que comenzó en El Espinal y hoy recorre toda Colombia
          </motion.p>
        </div>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2012 - Los inicios</h3>
              <p>Nace PiquiTours con un pequeño grupo de apasionados por mostrar la belleza oculta del Tolima.</p>
            </div>
            <div className="timeline-dot"></div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2015 - Primera expansión</h3>
              <p>Llegamos a la región cafetera, incorporando comunidades locales en nuestras experiencias.</p>
            </div>
            <div className="timeline-dot"></div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2018 - Reconocimiento</h3>
              <p>Ganamos el premio al Mejor Operador de Turismo Sostenible en Colombia.</p>
            </div>
            <div className="timeline-dot"></div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>2023 - Hoy</h3>
              <p>+50 destinos en todo el país, impactando positivamente a más de 100 comunidades.</p>
            </div>
            <div className="timeline-dot"></div>
          </div>
        </div>
      </section>

      {/* VALORES CON EFECTO 3D */}
      <section className="values-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Lo que nos <span className="highlight">define</span>
          </motion.h2>
        </div>
        
        <div className="valores-grid">
          <motion.div 
            className="valor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
          >
            <div className="valor-icon">
              <FaHeart />
            </div>
            <h4>Pasión Auténtica</h4>
            <p>No somos guías, somos narradores de historias que laten al ritmo de Colombia.</p>
          </motion.div>
          
          <motion.div 
            className="valor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="valor-icon">
              <FaLeaf />
            </div>
            <h4>Sostenibilidad Radical</h4>
            <p>Cada experiencia está diseñada para proteger y regenerar los destinos que visitamos.</p>
          </motion.div>
          
          <motion.div 
            className="valor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
          >
            <div className="valor-icon">
              <FaHandshake />
            </div>
            <h4>Impacto Comunitario</h4>
            <p>+70% de nuestros proveedores son negocios locales y comunidades indígenas.</p>
          </motion.div>
          
          <motion.div 
            className="valor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -10 }}
          >
            <div className="valor-icon">
              <FaBolt />
            </div>
            <h4>Innovación Constante</h4>
            <p>Creamos experiencias que no encontrarás en ningún otro lugar.</p>
          </motion.div>
          
          <motion.div 
            className="valor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -10 }}
          >
            <div className="valor-icon">
              <FaMedal />
            </div>
            <h4>Excelencia</h4>
            <p>Detalles cuidadosamente diseñados para superar tus expectativas.</p>
          </motion.div>
          
          <motion.div 
            className="valor-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ y: -10 }}
          >
            <div className="valor-icon">
              <FaGlobeAmericas />
            </div>
            <h4>Conciencia Global</h4>
            <p>Promovemos un turismo responsable que celebra la diversidad cultural.</p>
          </motion.div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="team-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Conoce al <span className="highlight">equipo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Apasionados exploradores, guías certificados y expertos en cultura colombiana
          </motion.p>
        </div>
        
        <div className="team-grid">
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="member-photo photo1"></div>
            <h3>Carlos Piqui</h3>
            <p>Fundador & Guía Master</p>
          </motion.div>
          
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="member-photo photo2"></div>
            <h3>María González</h3>
            <p>Directora de Experiencias</p>
          </motion.div>
          
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="member-photo photo3"></div>
            <h3>Diego Rodríguez</h3>
            <p>Especialista en Aventura</p>
          </motion.div>
          
          <motion.div 
            className="team-member"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="member-photo photo4"></div>
            <h3>Ana Morales</h3>
            <p>Coordinadora Comunitaria</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>¿Listo para vivir Colombia como nunca?</h2>
          <p>Déjanos ser parte de tu próxima aventura inolvidable</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 191, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Crear mi experiencia
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
