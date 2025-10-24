// Destinations.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle, X, Calendar, Users, MapPin, Clock, Phone, Mail } from 'lucide-react';
import toursData from '../data/tours.json';
import './styles/Destinations.css';
import './styles/TourModal.css';
import './styles/FormStyles.css';
import '../pages/styles/Contacto.css';
import { supabase } from '../utils/supabase';

const Destinations = () => {
  const [tours, setTours] = useState(toursData.tours);
  const [filteredTours, setFilteredTours] = useState(toursData.tours);
  const [searchQuery, setSearchQuery] = useState('');
  const [salida, setSalida] = useState('');
  const [duracion, setDuracion] = useState('');
  const [activeCats, setActiveCats] = useState(new Set());
  const [sort, setSort] = useState('pop');
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState(null); // Tour para el formulario

  // Estado para el formulario de reserva
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    personas: 1,
    mensaje: ''
  });
  const [formStep, setFormStep] = useState(1);
  const [formError, setFormError] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Nuevo estado para éxito

  useEffect(() => {
    filterAndSort();
  }, [searchQuery, salida, duracion, activeCats, sort]);

  const filterAndSort = () => {
    let res = tours.filter(d => {
      const byQ = !searchQuery || [d.nombre || d.title, d.resumen || d.description, ...(d.categorias || [])].join(' ').toLowerCase().includes(searchQuery.toLowerCase());
      const bySalida = !salida || (d.salida || []).includes(salida);
      const byDur = !duracion || (duracion === 'corta' && (d.duracion || parseInt(d.details.duration)) <= 3) || (duracion === 'media' && (d.duracion || parseInt(d.details.duration)) >= 4 && (d.duracion || parseInt(d.details.duration)) <= 7) || (duracion === 'larga' && (d.duracion || parseInt(d.details.duration)) >= 8);
      const byCat = activeCats.size === 0 || (d.categorias || []).some(c => activeCats.has(c));
      return byQ && bySalida && byDur && byCat;
    });

    switch (sort) {
      case 'precio-asc': res.sort((a, b) => (a.precio || parseInt((a.price || '').replace(/,/g, ''))) - (b.precio || parseInt((b.price || '').replace(/,/g, '')))); break;
      case 'precio-desc': res.sort((a, b) => (b.precio || parseInt((b.price || '').replace(/,/g, ''))) - (a.precio || parseInt((a.price || '').replace(/,/g, '')))); break;
      case 'duracion-asc': res.sort((a, b) => (a.duracion || parseInt(a.details.duration)) - (b.duracion || parseInt(b.details.duration))); break;
      case 'duracion-desc': res.sort((a, b) => (b.duracion || parseInt(b.details.duration)) - (a.duracion || parseInt(a.details.duration))); break;
      default: res.sort((a, b) => (b.popularidad || b.rating * 20) - (a.popularidad || a.rating * 20));
    }

    setFilteredTours(res);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSalida('');
    setDuracion('');
    setActiveCats(new Set());
    setSort('pop');
  };

  const toggleCategory = (cat) => {
    const newSet = new Set(activeCats);
    if (newSet.has(cat)) newSet.delete(cat);
    else newSet.add(cat);
    setActiveCats(newSet);
  };

  const openModal = (tour, tab = 'resumen') => {
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    
    setSelectedTour(tour);
    setActiveTab(tab);
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
    
    const scrollY = document.body.style.top;
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  const openFormModal = () => {
    if (!selectedTour) return;
    setIsFormModalOpen(true);
    setIsSubmitted(false);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    
    // Reset form
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      personas: 1,
      mensaje: ''
    });
    setFormStep(1);
    setFormError('');
    setIsSubmitted(false);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightbox = () => {
    const mediaArray = selectedTour.media || selectedTour.galeria || selectedTour.gallery || [];
    setLightboxIndex((prev) => (prev + 1) % mediaArray.length);
  };

  const prevLightbox = () => {
    const mediaArray = selectedTour.media || selectedTour.galeria || selectedTour.gallery || [];
    setLightboxIndex((prev) => (prev - 1 + mediaArray.length) % mediaArray.length);
  };

  const durBadge = (d) => {
    if (d <= 3) return '1–3 días';
    if (d <= 7) return '4–7 días';
    return '8+ días';
  };

  const fmtPrice = (n) => {
    if (typeof n === 'string') n = parseInt(n.replace(/,/g, ''));
    return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'Home') setLightboxIndex(0);
      if (e.key === 'End') {
        const mediaArray = selectedTour.media || selectedTour.galeria || selectedTour.gallery || [];
        setLightboxIndex(mediaArray.length - 1);
      }
      if (e.key.toLowerCase() === 'f') {
        const elem = document.getElementById('lbMedia');
        if (elem && elem.requestFullscreen) elem.requestFullscreen();
        else if (elem && elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem && elem.msRequestFullscreen) elem.msRequestFullscreen();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedTour, nextLightbox, prevLightbox, setLightboxIndex, closeLightbox, lightboxIndex]);

  // Manejo del formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formError) setFormError('');
  };

  const validateForm = () => {
    if (!formData.nombre) {
      setFormError('El nombre es requerido');
      return false;
    }
    if (!formData.email) {
      setFormError('El correo electrónico es requerido');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('Por favor ingresa un correo electrónico válido');
      return false;
    }
    if (!formData.telefono) {
      setFormError('El teléfono es requerido');
      return false;
    }
    if (!formData.fecha) {
      setFormError('Por favor selecciona una fecha');
      return false;
    }
    if (!formData.personas || formData.personas < 1) {
      setFormError('El número de personas debe ser al menos 1');
      return false;
    }
    if (!formData.mensaje) {
      setFormError('Por favor escribe un mensaje');
      return false;
    }
    setFormError('');
    return true;
  };

  const submitForm = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setBookingSubmitting(true);
    setFormError('');

    try {
      // Preparar payload para la tabla 'reservas'
      const payload = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        fecha: formData.fecha, // formato YYYY-MM-DD
        personas: parseInt(formData.personas, 10),
        mensaje: formData.mensaje,
        detalles: formData.mensaje, // compatibilidad si ya existe columna 'detalles'
        tour_id: selectedTour?.id ?? null,
        tour_nombre: selectedTour?.nombre || selectedTour?.title || null,
        precio: (selectedTour?.precio ?? (selectedTour?.price ? parseInt(String(selectedTour.price).replace(/,/g, ''), 10) : null))
      };

      const { error } = await supabase.from('reservas').insert([payload], { returning: 'minimal' });
      if (error) throw error;

      setIsSubmitted(true);
      // Cierra el modal después de 3 segundos
      setTimeout(() => {
        closeFormModal();
      }, 3000);
    } catch (e) {
      console.error('Error al crear reserva:', e);
      let errorMessage = 'Ocurrió un error al enviar tu reserva. Por favor, intenta nuevamente.';
      
      if (e.message && e.message.includes('Failed to fetch')) {
        errorMessage = 'No pudimos conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente.';
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      setFormError(errorMessage);
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <section className="destinations-section" id="destinos">
      <div className="wrap">
        <header className="destinations-header">
          <div className="header-content">
            <div className="tag" style={{ display: 'inline-block', background: 'linear-gradient(90deg,var(--g1),var(--g2),var(--g3))', color: '#111', fontWeight: 700, padding: '8px 20px', borderRadius: '999px', fontSize: '14px', letterSpacing: '.2px', marginBottom: '20px' }}>
              Explora Colombia con estilo
            </div>
            
            <h1 style={{ 
              fontFamily: "'Playfair Display',serif", 
              fontSize: 'clamp(36px,5vw,60px)', 
              fontWeight: 800, 
              margin: '0 0 20px', 
              letterSpacing: '.2px',
              lineHeight: '1.2'
            }}>
              Destinos destacados
            </h1>
            
            <p className="lead" style={{ 
              color: 'var(--muted)', 
              fontSize: 'clamp(16px,2vw,20px)', 
              margin: '0 0 30px',
              lineHeight: '1.6',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Experiencias pensadas para romper la rutina: naturaleza épica, gastronomía local y logística sin estrés. Elige un destino y descubre el plan completo.
            </p>
          </div>
        </header>

        <div style={{ maxWidth: '1000px', margin: '0 auto 28px' }}>
          <img src="/meta/portada_google.jpeg" alt="Paisaje Colombia" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 6px 28px rgba(0,0,0,.18)', objectFit: 'cover', aspectRatio: '16/5' }} />
        </div>

        <section className="filters" aria-label="Filtros">
          <input className="input" type="search" placeholder="Buscar destino o palabra clave…" aria-label="Buscar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="select" aria-label="Salida" value={salida} onChange={(e) => setSalida(e.target.value)}>
            <option value="">Salida (todas)</option>
            <option>Bogotá</option><option>Medellín</option><option>Barranquilla</option><option>Cali</option><option>Santa Marta</option>
          </select>
          <select className="select" aria-label="Duración" value={duracion} onChange={(e) => setDuracion(e.target.value)}>
            <option value="">Duración (todas)</option>
            <option value="corta">1–3 días</option>
            <option value="media">4–7 días</option>
            <option value="larga">8+ días</option>
          </select>
          <div className="chips" aria-label="Categorías">
            {['Aventura', 'Cultura', 'Playa', 'Montaña', 'Naturaleza', 'Astronomía', 'Café', 'Náutico', 'Ciudad'].map((cat) => (
              <button key={cat} className={`chip ${activeCats.has(cat) ? 'active' : ''}`} onClick={() => toggleCategory(cat)}>
                {cat === 'Aventura' ? '🔥' : cat === 'Cultura' ? '🏛️' : cat === 'Playa' ? '🌴' : cat === 'Montaña' ? '⛰️' : cat === 'Naturaleza' ? '🌿' : cat === 'Astronomía' ? '🌌' : cat === 'Café' ? '☕' : cat === 'Náutico' ? '🚤' : '🏙️'} {cat}
              </button>
            ))}
          </div>
          <button className="clearbtn" type="button" onClick={clearFilters}>Limpiar</button>
        </section>

        <div className="toolbar">
          <div className="count"><span>{filteredTours.length}</span> resultados</div>
          <div className="sort">
            <label htmlFor="sort" className="fade">Ordenar:</label>
            <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="pop">Popularidad</option>
              <option value="precio-asc">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
              <option value="duracion-asc">Duración (corta a larga)</option>
              <option value="duracion-desc">Duración (larga a corta)</option>
            </select>
          </div>
        </div>

        <section className="grid" aria-live="polite">
          {filteredTours.map((tour, index) => (
            <motion.article
              key={tour.id}
              className="card"
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -200px 0px" }}
              transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 90 }}
            >
              <div className="card-glow-effect"></div>
              <div className="card-shimmer"></div>
              <div className="media">
                { (tour.portada || {type: 'img', src: tour.image}).type === 'video' ? (
                  <video src={(tour.portada || {}).src} muted playsInline loop poster={(tour.portada || {}).poster} autoPlay />
                ) : (
                  <img loading="lazy" src={(tour.portada || {src: tour.image}).src} alt={tour.nombre || tour.title} />
                )}
                <div className="badge">
                  <span>⏱ {durBadge(tour.duracion || parseInt(tour.details.duration))}</span>
                  <span style={{ opacity: '.7' }}>•</span>
                  <span>★ {tour.popularidad || tour.rating * 20}</span>
                </div>
                <div className="rating-badge">
                  <Star className="star-icon" size={16} />
                  <span>{tour.rating || (tour.popularidad / 20).toFixed(1)}</span>
                </div>
              </div>
              <div className="body">
                <h3 className="h3">{tour.nombre || tour.title}</h3>
                <p className="desc">{tour.resumen || tour.description}</p>
                <div className="meta">
                  <span className="dot"></span><span>{fmtPrice(tour.precio || tour.price.replace(/,/g, ''))}</span>
                  <span className="dot"></span><span>{(tour.categorias || []).join(' · ')}</span>
                </div>
                <div className="actions">
                  <button className="button" onClick={() => openModal(tour)}>Conoce más</button>
                  <button className="button ghost" onClick={() => openModal(tour, 'galeria')}>Galería</button>
                </div>
              </div>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="golden-particle"
                  style={{
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${6 + Math.random() * 4}s`,
                    top: `${20 + i * 40}%`,
                    left: `${10 + i * 30}%`
                  }}
                />
              ))}
            </motion.article>
          ))}
        </section>

        <p className="footer-note">Tip: abre la galería y usa <span className="kbd">←</span>/<span className="kbd">→</span> para navegar o <span className="kbd">F</span> para fullscreen.</p>
      </div>

      {isModalOpen && selectedTour && (
        <motion.div 
          className="backdrop show" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="dlgTitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
          <motion.div 
            className="dialog improved-dialog"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <div className="headtitle">
                <span className="dotAccent"></span>
                <div>
                  <h2 id="dlgTitle">{selectedTour.nombre || selectedTour.title}</h2>
                  <p id="dlgSub" className="fade">{durBadge(selectedTour.duracion || parseInt(selectedTour.details.duration))} • {fmtPrice(selectedTour.precio || selectedTour.price.replace(/,/g, ''))} • {(selectedTour.categorias || []).join(' · ')}</p>
                </div>
              </div>
              <motion.button 
                className="close" 
                aria-label="Cerrar" 
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </header>

            <div className="cover">
              { (selectedTour.portada || {type: 'img', src: selectedTour.image}).type === 'video' ? (
                <video src={(selectedTour.portada || {}).src} muted autoPlay loop playsInline poster={(selectedTour.portada || {}).poster} />
              ) : (
                <img src={(selectedTour.portada || {src: selectedTour.image}).src} alt={selectedTour.nombre || selectedTour.title} />
              )}
            </div>

            <motion.div 
              className="tabs" 
              role="tablist" 
              aria-label="Contenido del destino"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {['resumen', 'itinerario', 'incluye', 'galeria', 'opiniones'].map((tab) => (
                <motion.button
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab === 'resumen' ? 'Resumen' : tab === 'itinerario' ? 'Itinerario' : tab === 'incluye' ? 'Incluye' : tab === 'galeria' ? 'Galería' : 'Opiniones'}
                </motion.button>
              ))}
            </motion.div>

            <main>
              <AnimatePresence mode="wait">
                {activeTab === 'resumen' && (
                  <motion.section
                    key="resumen"
                    className="section two panel improved-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="info">
                      <h4><span className="icon">📖</span> Una experiencia inolvidable 🌟</h4>
                      <p>{selectedTour.resumen || selectedTour.fullDescription} Descubre un viaje diseñado para sorprenderte, con cada detalle cuidadosamente planeado por Piquitours. Desde paisajes que quitan el aliento hasta experiencias culturales auténticas, este destino te invita a vivir momentos que recordarás para siempre. ¡No esperes más para reservar tu aventura! 🚀</p>
                      <ul className="list">
                        {(selectedTour.bullets || selectedTour.highlights.map(h => h.text)).map((b, i) => (
                          <li key={i}>
                            <span className="ok">✔</span> <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="info">
                      <h4><span className="icon">⚡</span> Por qué elegir este destino 💎</h4>
                      <ul className="list">
                        {(selectedTour.quick || Object.entries(selectedTour.detalles || selectedTour.details || {})).map(([k, v], i) => (
                          <li key={i}>
                            <span style={{ opacity: '.7' }}>{k}:</span>&nbsp;<strong>{v}</strong>
                          </li>
                        ))}
                        <li><span style={{ opacity: '.7' }}>Exclusividad:</span>&nbsp;<strong>Solo con Piquitours 🌟</strong></li>
                        <li><span style={{ opacity: '.7' }}>Soporte:</span>&nbsp;<strong>Atención personalizada 24/7 📞</strong></li>
                      </ul>
                    </div>
                  </motion.section>
                )}

                {activeTab === 'itinerario' && (
                  <motion.section
                    key="itinerario"
                    className="section panel improved-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">🗓️</span> Tu aventura día a día 📅</h4>
                    <div className="timeline">
                      {(selectedTour.itinerario || selectedTour.itinerary).map((st, i) => (
                        <motion.div
                          key={i}
                          className="step"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="icon">📍</span> {st.dia || st.day} • {st.titulo || st.title}
                          </div>
                          <div className="small">{st.detalle || st.description}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {activeTab === 'incluye' && (
                  <motion.section
                    key="incluye"
                    className="section panel improved-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">✅</span> Todo lo que incluye tu viaje 🎁</h4>
                    <ul className="list">
                      {(selectedTour.incluye || selectedTour.inclusions?.map(txt => ({ok: true, item: txt})) || []).map((x, i) => (
                        <li key={i}>
                          <span className={x.ok ? 'ok' : 'no'}>{x.ok ? '✔' : '✗'}</span> <span style={{color: '#fff'}}>{x.item || x.txt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {activeTab === 'galeria' && (
                  <motion.section
                    key="galeria"
                    className="section panel improved-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">🖼️</span> Galería Exclusiva: Vive la Aventura en Imágenes Antes de Reservar 🌟</h4>
                    <p className="gallery-intro">Sumérgete en estas imágenes cautivadoras que capturan la esencia de tu próximo viaje. Cada foto es una promesa de momentos inolvidables. ¡Reserva ahora y hazlas realidad! 📸✨</p>
                    <div className="gallery">
                      {(selectedTour.media || selectedTour.galeria || selectedTour.gallery || []).map((m, i) => {
                        const media = typeof m === 'string' ? {type: 'img', src: m} : m;
                        return (
                          <motion.div
                            key={i}
                            className={`ph ${i % 5 === 0 ? 'span-8' : (i % 3 === 0 ? 'span-6' : 'span-4')}`}
                            onClick={() => openLightbox(i)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            {media.type === 'img' ? (
                              <img loading="lazy" src={media.src} alt={`${selectedTour.nombre || selectedTour.title} media ${i + 1}`} />
                            ) : (
                              <video preload="metadata" src={media.src} poster={media.poster} muted />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>
                )}

                {activeTab === 'opiniones' && (
                  <motion.section
                    key="opiniones"
                    className="section panel improved-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">💬</span> Lo que dicen nuestros viajeros 🗣️</h4>
                    <div className="reviews">
                      {(selectedTour.reviews || []).map((review, i) => {
                        const {nombre, ubicacion, rating, comentario, verificado} = review;
                        return (
                          <motion.div
                            key={i}
                            className="rev"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <div className="avatar" style={{ background: `linear-gradient(90deg, var(--g1), var(--g2))` }}>{nombre?.charAt(0)}</div>
                            <div>
                              <div style={{ fontWeight: 700 }}>{nombre} <span className="tag">{ubicacion}</span></div>
                              <div className="stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
                              <div style={{ marginTop: '6px' }}>{comentario}</div>
                            </div>
                            {verificado && <div><span className="tag">Verificado ✅</span></div>}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
              <motion.button
                className="book-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const tourParaReservar = selectedTour;
                  setBookingTour(tourParaReservar);
                  setIsModalOpen(false);
                  document.body.classList.remove('modal-open');
                  setTimeout(() => {
                    setIsFormModalOpen(true);
                    setIsSubmitted(false);
                  }, 350);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Reserva tu aventura ahora! 🚀
              </motion.button>
            </main>
          </motion.div>
        </motion.div>
      )}

      {/* Modal separado para el formulario de reserva */}
      {isFormModalOpen && bookingTour && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center p-4 overflow-y-auto"
          style={{ 
            zIndex: 999999,
            display: 'flex',
            visibility: 'visible',
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,0.85)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="formTitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeFormModal}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.98) 0%, rgba(30, 30, 30, 0.95) 100%)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 138, 64, 0.2)',
              overflow: 'hidden',
              margin: '40px 20px 20px 20px',
              backdropFilter: 'blur(20px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: 'linear-gradient(180deg, rgba(18,18,26,0.95), rgba(15,15,21,0.95))',
              borderBottom: '1px solid rgba(255,138,64,0.15)',
              padding: '24px',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'}}>
                <div style={{flex: 1, minWidth: 0}}>
                  <h2 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    background: 'linear-gradient(90deg, #ff8a40, #ffa25c, #ff6b40)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    margin: 0,
                    marginBottom: '8px'
                  }}>Reserva tu Aventura</h2>
                  <p style={{fontSize: '14px', color: '#999', margin: 0, fontFamily: "'Inter', sans-serif"}}>{bookingTour.nombre || bookingTour.title}</p>
                </div>
                <motion.button 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,138,64,0.1)',
                    border: '1px solid rgba(255,138,64,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ff8a40',
                    flexShrink: 0
                  }}
                  onClick={closeFormModal}
                  whileHover={{ scale: 1.1, background: 'rgba(255,138,64,0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <div className="premium-form-container">
              {!isSubmitted ? (
                <>
                  <div style={{
                    marginBottom: '24px',
                    padding: '16px 20px',
                    background: 'linear-gradient(135deg, rgba(255,138,64,0.1), rgba(255,162,92,0.05))',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,138,64,0.2)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <Calendar size={18} style={{color: '#ff8a40', flexShrink: 0, marginTop: '2px'}} />
                    <p style={{fontSize: '14px', color: '#ccc', margin: 0, fontFamily: "'Inter', sans-serif", lineHeight: '1.5'}}>
                      Completa el formulario y te contactaremos para confirmar tu reserva en menos de 24 horas.
                    </p>
                  </div>

                  {formError && (
                    <motion.div 
                      className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 text-xs font-bold">!</span>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300 font-['Inter']">{formError}</p>
                    </motion.div>
                  )}

                  <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                    <div className="premium-form-grid">
                      <div className="premium-form-field">
                        <label htmlFor="nombre" className="premium-form-label">Nombre Completo *</label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleFormChange}
                          className={`premium-form-input ${formError && !formData.nombre ? 'error' : ''}`}
                          placeholder="Juan Pérez"
                          required
                        />
                        <Users size={18} className="premium-form-icon" />
                      </div>
                      <div className="premium-form-field">
                        <label htmlFor="telefono" className="premium-form-label">Teléfono *</label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleFormChange}
                          className={`premium-form-input ${formError && !formData.telefono ? 'error' : ''}`}
                          placeholder="+57 300 123 4567"
                          required
                        />
                        <Phone size={18} className="premium-form-icon" />
                      </div>
                    </div>

                    <div className="premium-form-grid">
                      <div className="premium-form-field">
                        <label htmlFor="email" className="premium-form-label">Correo Electrónico *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className={`premium-form-input ${formError && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) ? 'error' : ''}`}
                          placeholder="tu@email.com"
                          required
                        />
                        <Mail size={18} className="premium-form-icon" />
                      </div>
                      <div className="premium-form-field">
                        <label htmlFor="fecha" className="premium-form-label">Fecha Preferida *</label>
                        <input
                          type="date"
                          id="fecha"
                          name="fecha"
                          value={formData.fecha}
                          onChange={handleFormChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`premium-form-input ${formError && !formData.fecha ? 'error' : ''}`}
                          required
                        />
                        <Calendar size={18} className="premium-form-icon" />
                      </div>
                    </div>

                    <div className="premium-form-field">
                      <label htmlFor="personas" className="premium-form-label">Número de Personas *</label>
                      <input
                        type="number"
                        id="personas"
                        name="personas"
                        min="1"
                        max="20"
                        value={formData.personas}
                        onChange={handleFormChange}
                        className={`premium-form-input ${formError && formData.personas < 1 ? 'error' : ''}`}
                        required
                      />
                      <Users size={18} className="premium-form-icon" />
                      <p style={{marginTop: '8px', fontSize: '12px', color: '#666'}}>Máximo 20 personas por reserva</p>
                    </div>

                    <div className="premium-form-field">
                      <label htmlFor="mensaje" className="premium-form-label">Mensaje *</label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleFormChange}
                        className={`premium-form-textarea ${formError && !formData.mensaje ? 'error' : ''}`}
                        placeholder="Especifica detalles: ciudad de salida, fechas flexibles, presupuesto, preferencias especiales..."
                        maxLength="500"
                        required
                      ></textarea>
                      <div className={`char-counter ${formData.mensaje.length > 450 ? 'warning' : ''}`}>
                        <span style={{fontSize: '12px', color: '#666'}}>Comparte tus preferencias para personalizar tu experiencia</span>
                        <span style={{fontSize: '12px', fontWeight: '600'}}>{formData.mensaje.length}/500</span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="premium-submit-button"
                      disabled={bookingSubmitting}
                      whileHover={{ scale: bookingSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: bookingSubmitting ? 1 : 0.98 }}
                    >
                      {bookingSubmitting ? (
                        <>
                          <div style={{width: '20px', height: '20px', border: '3px solid #000', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}></div>
                          <span>Enviando reserva...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={20} />
                          <span>Confirmar Reserva</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="success-icon-wrapper">
                    <CheckCircle size={48} color="#fff" strokeWidth={2.5} />
                  </div>
                  <h3>¡Solicitud enviada con éxito!</h3>
                  <p>
                    Hemos recibido tu reserva para <strong style={{color: '#ff8a40'}}>{bookingTour.nombre || bookingTour.title}</strong>.
                  </p>
                  <div className="success-badge">
                    <Clock size={16} />
                    <span>Te contactaremos en menos de 24 horas</span>
                  </div>
                  <motion.button
                    onClick={closeFormModal}
                    className="success-close-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cerrar
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {lightboxOpen && selectedTour && (
        <motion.div
          className="lightbox show"
          aria-hidden="false"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="lbbtn lbclose"
            aria-label="Cerrar"
            onClick={closeLightbox}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
          <div className="nav">
            <motion.button
              className="lbbtn"
              aria-label="Anterior"
              onClick={prevLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              className="lbbtn"
              aria-label="Siguiente"
              onClick={nextLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
          <motion.div
            id="lbMedia"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            { (() => {
              const mediaArray = selectedTour.media || selectedTour.galeria || selectedTour.gallery || [];
              const item = mediaArray[lightboxIndex];
              const media = typeof item === 'string' ? {type: 'img', src: item} : item;
              return media.type === 'img' ? (
                <img src={media.src} alt={`media ${lightboxIndex + 1}`} />
              ) : (
                <video src={media.src} controls autoPlay poster={media.poster || ''} />
              );
            })() }
          </motion.div>
        </motion.div>
      )}

    </section>
  );
};

export default Destinations;