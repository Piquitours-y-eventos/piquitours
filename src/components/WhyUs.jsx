// whyus.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import './styles/WhyUs.css';

export default function WhyUs() {
  const [activeTab, setActiveTab] = useState('experiencia');

  const tabs = [
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'tecnologia', label: 'Tecnología' },
  ];

  const features = {
    experiencia: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/2583/2583346.png',
        title: 'Premios Nacionales',
        desc: 'Reconocidos por asociaciones turísticas como una de las mejores agencias locales del Tolima.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/846/846449.png',
        title: '+10,000 Viajeros Felices',
        desc: 'Turistas nacionales e internacionales han confiado en nosotros para crear recuerdos únicos.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
        title: 'Guías Locales Expertos',
        desc: 'Nuestro equipo conoce cada rincón de Colombia para ofrecerte una experiencia auténtica.',
      },
    ],
    servicios: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/888/888064.png',
        title: 'Tours Personalizados',
        desc: 'Elige tu destino y armamos la ruta perfecta según tus intereses y presupuesto.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/814/814513.png',
        title: 'Experiencias Exclusivas',
        desc: 'Acceso a destinos únicos, actividades privadas y alianzas con hoteles de primera.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
        title: 'Sostenibilidad',
        desc: 'Apoyamos a comunidades locales y promovemos un turismo responsable.',
      },
    ],
    tecnologia: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827504.png',
        title: 'Reservas en Línea',
        desc: 'Reserva tu experiencia en minutos desde nuestra página o app móvil.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png',
        title: 'Soporte 24/7',
        desc: 'Atención inmediata vía WhatsApp, correo o llamada, en cualquier momento de tu viaje.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/609/609361.png',
        title: 'Tecnología Innovadora',
        desc: 'Usamos herramientas avanzadas para garantizar una experiencia fluida y segura.',
      },
    ],
  };

  return (
    <section className="why-us" id="why-us-x">
      <div className="why-us-container">
        {/* Texto */}
        <motion.div
          className="why-us-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
        >
          <h2>
            ¿Por qué elegir <span className="highlight">Piquitours</span>?
          </h2>
          <p className="intro-text">
            Más que una agencia, somos tu compañero de viaje en El Espinal y toda Colombia. 
            Combinamos tradición, hospitalidad y tecnología para experiencias que no olvidarás. 
            ¡Únete a miles de viajeros felices y descubre Colombia con nosotros!
          </p>
          <div className="why-us-rating">
            <FiStar className="star-icon" />
            <span>Mas de +5,000 clientes que han viajado con nosotros</span>
          </div>

          {/* Tabs */}
          <div className="why-us-tabs" role="tablist" aria-label="Razones para elegir Piquitours">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`why-us-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Contenido dinámico */}
          <div className="tab-content-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="tab-content active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p id="feature-text-x">
                  {activeTab === 'experiencia'
                    ? 'Con más de 15 años de trayectoria, hemos guiado a miles de turistas por los paisajes del Tolima y Colombia. Somos reconocidos por la calidad de nuestro servicio y el calor humano de nuestra gente.'
                    : activeTab === 'servicios'
                    ? 'Diseñamos experiencias personalizadas: desde tours culturales hasta aventuras extremas. Nuestro equipo garantiza comodidad, seguridad y precios justos.'
                    : 'Innovamos constantemente para ofrecer reservas rápidas, pagos seguros y comunicación en tiempo real.'}
                </p>
                <div className="feature-grid">
                  {features[activeTab].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="feature-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="feature-icon"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img src={feature.icon} alt={feature.title} loading="lazy" />
                      </motion.div>
                      <h3>{feature.title}</h3>
                      <p>{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.button
            className="book-btn"
            onClick={() => {
              window.location.href = '/contacto';
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ¡Reserva tu experiencia ahora!
          </motion.button>
        </motion.div>

        {/* Imagen */}
        <motion.div
          className="why-us-visual"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 80 }}
        >
          <motion.img
            src="/meta/portada_google.jpeg"
            alt="Turismo en Colombia"
            className="why-us-image"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />

          <div className="why-us-badge">
            <span>+15 Años</span>
            <span>de Excelencia</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}