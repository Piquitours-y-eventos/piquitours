import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiCalendar, 
  FiCheckCircle, 
  FiMapPin, 
  FiClock, 
  FiMaximize, 
  FiMinimize,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiUsers,
  FiHome,
  FiCoffee,
  FiNavigation,
  FiHeart,
  FiShare2,
  FiDownload
} from 'react-icons/fi';
import { FaRegCalendarAlt, FaRegSun, FaRegSnowflake, FaUmbrellaBeach } from 'react-icons/fa';
import { GiPathDistance, GiMountains, GiRiver, GiMeal } from 'react-icons/gi';

const iconComponents = {
  FiMapPin: FiMapPin,
  FiUsers: FiUsers,
  FiHome: FiHome,
  FiCoffee: FiCoffee,
  FiNavigation: FiNavigation,
  FaRegCalendarAlt: FaRegCalendarAlt,
  FaRegSun: FaRegSun,
  FaRegSnowflake: FaRegSnowflake,
  FaUmbrellaBeach: FaUmbrellaBeach,
  GiPathDistance: GiPathDistance,
  GiMountains: GiMountains,
  GiRiver: GiRiver,
  GiMeal: GiMeal
};

const difficultyIcons = {
  'Fácil': { icon: '😊', color: 'bg-green-100 text-green-800' },
  'Moderada': { icon: '😅', color: 'bg-yellow-100 text-yellow-800' },
  'Difícil': { icon: '🥵', color: 'bg-red-100 text-red-800' }
};

const TourDetailsModal = ({ isOpen, onClose, tour }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  // Bloquear scroll del body cuando el modal está abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Compensar scrollbar
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!tour) return null;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // No cambiar el overflow aquí, ya se maneja en useEffect
  };

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareTour = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBrochure = () => {
    // Lógica para descargar brochure
    alert('Descargando brochure del tour...');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-[998] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          
          <motion.div
            className={`fixed z-[999] ${isFullScreen ? 'inset-0' : 'left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl'} mx-auto`}
            style={{
              top: isFullScreen ? 'clamp(85px, 12vh, 110px)' : 'calc(clamp(85px, 12vh, 110px) + 2vh)',
              maxHeight: isFullScreen ? 'calc(100vh - clamp(85px, 12vh, 110px))' : 'calc(90vh - clamp(85px, 12vh, 110px))',
              position: 'fixed'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className={`bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col ${
              isFullScreen ? 'w-full h-full rounded-none' : 'w-full h-full'
            }`}>
              
              {/* Header con imagen */}
              <div className="relative h-72 md:h-96 w-full bg-gradient-to-r from-blue-900 to-purple-900">
                <img
                  src={tour.gallery[currentImage]}
                  alt={`${tour.title} - Imagen ${currentImage + 1}`}
                  className="w-full h-full object-cover opacity-90"
                />
                
                {/* Navegación de imágenes */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all group"
                >
                  <FiChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all group"
                >
                  <FiChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Contador de imágenes */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                  {currentImage + 1} / {tour.gallery.length}
                </div>
                
                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Info del tour */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <FiStar className="text-xs" />
                          <span>{tour.rating}</span>
                        </div>
                        <span className="text-white/80 text-sm">{tour.details.difficulty}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">{tour.title}</h2>
                      <p className="text-white/90 mt-2 max-w-2xl">{tour.description}</p>
                    </div>
                    <div className="bg-white/90 text-gray-900 px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm">
                      <div className="text-sm text-gray-600">Desde</div>
                      <div className="font-bold text-3xl text-blue-600">${tour.price}</div>
                      <div className="text-xs text-gray-500">por persona</div>
                    </div>
                  </div>
                </div>
                
                {/* Controles superiores */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                    onClick={toggleFavorite}
                  >
                    <FiHeart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                    onClick={shareTour}
                  >
                    <FiShare2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                    onClick={downloadBrochure}
                  >
                    <FiDownload size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                    onClick={toggleFullScreen}
                  >
                    {isFullScreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                    onClick={onClose}
                  >
                    <FiX size={20} />
                  </motion.button>
                </div>
              </div>
              
              {/* Contenido principal */}
              <div className="flex-1 overflow-y-auto">
                {/* Pestañas de navegación */}
                <div className="border-b border-gray-200 sticky top-0 bg-white z-[2]">
                  <nav className="flex overflow-x-auto scrollbar-hide">
                    {[
                      { id: 'overview', label: 'Resumen', icon: <FiStar className="mr-2" /> },
                      { id: 'itinerary', label: 'Itinerario', icon: <FiCalendar className="mr-2" /> },
                      { id: 'inclusions', label: 'Incluye', icon: <FiCheckCircle className="mr-2" /> },
                      { id: 'gallery', label: 'Galería', icon: <FiMaximize className="mr-2" /> },
                      { id: 'reviews', label: 'Opiniones', icon: <FiUsers className="mr-2" /> }
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
                            layoutId="tabIndicator"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </nav>
                </div>
                
                {/* Contenido de las pestañas */}
                <div className="p-6 md:p-8">
                  {activeTab === 'overview' && (
                    <div className="space-y-10">
                      <section>
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center gap-3">
                          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            <FiStar />
                          </span>
                          Descripción del Tour
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{tour.fullDescription}</p>
                      </section>
                      
                      <section>
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center gap-3">
                          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            <FiMapPin />
                          </span>
                          Lo más destacado
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {tour.highlights.map((highlight, index) => {
                            const IconComponent = iconComponents[highlight.icon];
                            return (
                              <motion.div 
                                key={index} 
                                className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                whileHover={{ y: -5 }}
                              >
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                                  <IconComponent size={20} />
                                </div>
                                <p className="text-gray-700 font-medium">{highlight.text}</p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </section>
                      
                      <section>
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center gap-3">
                          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            <FiCheckCircle />
                          </span>
                          Detalles clave
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                          <motion.div 
                            className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm text-center"
                            whileHover={{ scale: 1.03 }}
                          >
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                              <GiPathDistance size={24} />
                            </div>
                            <h4 className="font-medium text-gray-500 mb-1">Duración</h4>
                            <p className="text-lg font-bold text-gray-800">{tour.details.duration}</p>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm text-center"
                            whileHover={{ scale: 1.03 }}
                          >
                            <div className={`${difficultyIcons[tour.details.difficulty]?.color || 'bg-blue-100 text-blue-600'} p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 text-2xl`}>
                              {difficultyIcons[tour.details.difficulty]?.icon || '🏞️'}
                            </div>
                            <h4 className="font-medium text-gray-500 mb-1">Dificultad</h4>
                            <p className="text-lg font-bold text-gray-800">{tour.details.difficulty}</p>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm text-center"
                            whileHover={{ scale: 1.03 }}
                          >
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                              <FiUsers size={24} />
                            </div>
                            <h4 className="font-medium text-gray-500 mb-1">Tamaño grupo</h4>
                            <p className="text-lg font-bold text-gray-800">{tour.details.groupSize}</p>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm text-center"
                            whileHover={{ scale: 1.03 }}
                          >
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                              {tour.details.bestSeason.includes('Diciembre') ? (
                                <FaRegSnowflake size={20} />
                              ) : tour.details.bestSeason.includes('Todo') ? (
                                <FaRegSun size={20} />
                              ) : (
                                <FaUmbrellaBeach size={20} />
                              )}
                            </div>
                            <h4 className="font-medium text-gray-500 mb-1">Mejor época</h4>
                            <p className="text-lg font-bold text-gray-800">{tour.details.bestSeason}</p>
                          </motion.div>
                        </div>
                      </section>
                    </div>
                  )}
                  
                  {activeTab === 'itinerary' && tour.itinerary && (
                    <div className="space-y-10">
                      <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <FiCalendar />
                        </span>
                        Itinerario detallado
                      </h3>
                      <div className="space-y-8">
                        {tour.itinerary.map((day, index) => (
                          <motion.div 
                            key={index} 
                            className="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="flex-shrink-0 w-full md:w-40">
                              <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-xl text-center shadow-md">
                                <div className="font-bold text-sm uppercase tracking-wider">DÍA</div>
                                <div className="text-3xl font-bold">{day.day.split(' ')[1]}</div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold mb-3 text-gray-800">{day.title}</h4>
                              <p className="text-gray-600 mb-4">{day.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-3 text-gray-700 bg-blue-50/50 p-3 rounded-lg">
                                  <FiClock className="text-blue-500 flex-shrink-0" size={20} />
                                  <div>
                                    <div className="text-xs text-gray-500">HORARIO</div>
                                    <div className="font-medium">{day.time}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 bg-blue-50/50 p-3 rounded-lg">
                                  <FiMapPin className="text-blue-500 flex-shrink-0" size={20} />
                                  <div>
                                    <div className="text-xs text-gray-500">UBICACIÓN</div>
                                    <div className="font-medium">{day.location}</div>
                                  </div>
                                </div>
                              </div>
                              
                              {day.activities && (
                                <div className="mt-4">
                                  <h5 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                                    <FiCheckCircle className="text-blue-500" />
                                    Actividades incluidas:
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {day.activities.map((activity, i) => (
                                      <motion.span 
                                        key={i} 
                                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        <FiCheckCircle className="text-blue-500" size={14} />
                                        {activity}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'inclusions' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div>
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center gap-3">
                          <span className="bg-green-100 text-green-600 p-2 rounded-lg">
                            <FiCheckCircle />
                          </span>
                          Qué incluye
                        </h3>
                        <ul className="space-y-4">
                          {tour.inclusions.map((item, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-4 p-4 bg-green-50/50 rounded-lg border border-green-100"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                              <span className="text-gray-700 font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center gap-3">
                          <span className="bg-red-100 text-red-600 p-2 rounded-lg">
                            <FiX />
                          </span>
                          No incluye
                        </h3>
                        <ul className="space-y-4">
                          {tour.exclusions.map((item, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-4 p-4 bg-red-50/50 rounded-lg border border-red-100"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <FiX className="text-red-500 flex-shrink-0 mt-1" size={20} />
                              <span className="text-gray-700 font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'gallery' && (
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <FiMaximize />
                        </span>
                        Galería de fotos
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {tour.gallery.map((image, index) => (
                          <motion.div
                            key={index}
                            className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer transition-all ${currentImage === index ? 'ring-4 ring-blue-500 scale-105 z-10' : 'hover:scale-102'}`}
                            onClick={() => setCurrentImage(index)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <img
                              src={image}
                              alt={`Galería ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {currentImage === index && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white font-medium bg-blue-500 px-4 py-2 rounded-full flex items-center gap-2">
                                  <FiMaximize size={16} />
                                  Vista actual
                                </span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <FiUsers />
                        </span>
                        Opiniones de viajeros
                      </h3>
                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 text-center">
                        <div className="text-5xl mb-2">⭐ {tour.rating}</div>
                        <div className="text-gray-600 mb-4">Basado en 24 opiniones</div>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Ver todas las opiniones
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer con CTA */}
              <div className="border-t border-gray-200 bg-white p-6 sticky bottom-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
                  <div>
                    <div className="text-xl font-bold text-gray-800">${tour.price}</div>
                    <div className="text-gray-500 text-sm">por persona</div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Preguntar
                    </button>
                    <button className="flex-1 md:flex-none bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                      Reservar ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Notificación de compartir */}
          <AnimatePresence>
            {copied && (
              <motion.div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[1002] flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheckCircle size={20} />
                ¡Enlace copiado al portapapeles!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default TourDetailsModal;