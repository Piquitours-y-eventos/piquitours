// Destinations.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import toursData from '../data/tours.json';
import './styles/Destinations.css';
import ReservaForm from "../componentes/ReservaForm";


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
  const [reservaAbierta, setReservaAbierta] = useState(false);


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

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % (selectedTour.media || selectedTour.gallery).length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + (selectedTour.media || selectedTour.gallery).length) % (selectedTour.media || selectedTour.gallery).length);
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
      if (e.key === 'End') setLightboxIndex((selectedTour.media || selectedTour.gallery).length - 1);
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
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" alt="Paisaje Colombia" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 6px 28px rgba(0,0,0,.18)', objectFit: 'cover', aspectRatio: '16/5' }} />
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
                  <FiStar className="star-icon" />
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
            className="dialog"
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
                    className="section two panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="info">
                      <h4><span className="icon">📖</span> Una experiencia inolvidable</h4>
                      <p>{selectedTour.resumen || selectedTour.fullDescription} Descubre un viaje diseñado para sorprenderte, con cada detalle cuidadosamente planeado por Piquitours. Desde paisajes que quitan el aliento hasta experiencias culturales auténticas, este destino te invita a vivir momentos que recordarás para siempre.</p>
                      <ul className="list">
                        {(selectedTour.bullets || selectedTour.highlights.map(h => h.text)).map((b, i) => (
                          <li key={i}>
                            <span className="ok">✔</span> <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="info">
                      <h4><span className="icon">⚡</span> Por qué elegir este destino</h4>
                      <ul className="list">
                        {(selectedTour.quick || Object.entries(selectedTour.details)).map(([k, v], i) => (
                          <li key={i}>
                            <span style={{ opacity: '.7' }}>{k}:</span>&nbsp;<strong>{v}</strong>
                          </li>
                        ))}
                        <li><span style={{ opacity: '.7' }}>Exclusividad:</span>&nbsp;<strong>Solo con Piquitours</strong></li>
                        <li><span style={{ opacity: '.7' }}>Soporte:</span>&nbsp;<strong>Atención personalizada 24/7</strong></li>
                      </ul>
                    </div>
                  </motion.section>
                )}

                {activeTab === 'itinerario' && (
                  <motion.section
                    key="itinerario"
                    className="section panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">🗓️</span> Tu aventura día a día</h4>
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
                    className="section panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">✅</span> Todo lo que incluye tu viaje</h4>
                    <ul className="list">
                      {(selectedTour.incluye || selectedTour.inclusions.map(txt => ({ok: true, txt}))).map((x, i) => (
                        <li key={i}>
                          <span className={x.ok ? 'ok' : 'no'}>{x.ok ? '✔' : '✗'}</span> <span>{x.txt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {activeTab === 'galeria' && (
                  <motion.section
                    key="galeria"
                    className="section panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">🖼️</span> Explora en imágenes</h4>
                    <div className="gallery">
                      {(selectedTour.media || selectedTour.gallery.map(src => ({type: 'img', src}))).map((m, i) => (
                        <motion.div
                          key={i}
                          className={`ph ${i % 5 === 0 ? 'span-8' : (i % 3 === 0 ? 'span-6' : 'span-4')}`}
                          onClick={() => openLightbox(i)}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {m.type === 'img' ? (
                            <img loading="lazy" src={m.src} alt={`${selectedTour.nombre || selectedTour.title} media ${i + 1}`} />
                          ) : (
                            <video preload="metadata" src={m.src} poster={m.poster} muted />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {activeTab === 'opiniones' && (
                  <motion.section
                    key="opiniones"
                    className="section panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4><span className="icon">💬</span> Lo que dicen nuestros viajeros</h4>
                    <div className="reviews">
                      {(selectedTour.reviews || []).map(([name, flag, stars, text], i) => (
                        <motion.div
                          key={i}
                          className="rev"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div className="avatar" style={{ background: `linear-gradient(90deg, var(--g1), var(--g2))` }}></div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{name} <span className="tag">{flag}</span></div>
                            <div className="stars">{'★'.repeat(+stars)}{'☆'.repeat(5 - +stars)}</div>
                            <div style={{ marginTop: '6px' }}>{text}</div>
                          </div>
                          <div><span className="tag">Verificado</span></div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
              <motion.button
                className="book-btn"
                onClick={() => setReservaAbierta(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              ¡Reserva tu aventura ahora!
              </motion.button>

            </main>
          </motion.div>
        </motion.div>
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
              <FiChevronLeft size={24} />
            </motion.button>
            <motion.button
              className="lbbtn"
              aria-label="Siguiente"
              onClick={nextLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>
          <motion.div
            id="lbMedia"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            { (selectedTour.media || selectedTour.gallery.map(src => ({type: 'img', src})))[lightboxIndex].type === 'img' ? (
              <img src={(selectedTour.media || selectedTour.gallery.map(src => ({type: 'img', src})))[lightboxIndex].src} alt={`media ${lightboxIndex + 1}`} />
            ) : (
              <video src={(selectedTour.media || [])[lightboxIndex].src} controls autoPlay poster={(selectedTour.media || [])[lightboxIndex].poster || ''} />
            )}
          </motion.div>
        </motion.div>
      )}
      {reservaAbierta && (
  <ReservaForm onClose={() => setReservaAbierta(false)} />
)}

    </section>
  );
};

export default Destinations;
