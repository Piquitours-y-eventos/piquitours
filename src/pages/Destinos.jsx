import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiStar, FiChevronRight } from "react-icons/fi";
import { FaUmbrellaBeach, FaMountain, FaCity, FaTree } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './styles/Destinos.css';

const destinations = [
  {
    id: 1,
    title: "Guatapé",
    description: "El famoso Peñón de Guatapé y sus coloridas calles",
    image: "/guatape.jpg",
    rating: 4.9,
    type: "aventura",
    highlights: ["Peñón de Guatapé", "Pueblo colorido", "Paseo en lancha"]
  },
  {
    id: 2,
    title: "Cartagena",
    description: "La heroica ciudad amurallada y sus playas caribeñas",
    image: "/cartagena.jpg",
    rating: 4.8,
    type: "playa",
    highlights: ["Ciudad amurallada", "Playas de Barú", "Historia colonial"]
  },
  {
    id: 3,
    title: "Eje Cafetero",
    description: "Paisajes cafeteros y termales para relajarse",
    image: "/cafetero.jpg",
    rating: 4.7,
    type: "naturaleza",
    highlights: ["Tour cafetero", "Termales", "Valle de Cocora"]
  },
  {
    id: 4,
    title: "San Andrés",
    description: "Paraíso caribeño con aguas cristalinas",
    image: "/sanandres.jpg",
    rating: 4.8,
    type: "playa",
    highlights: ["Johnny Cay", "Hoyo Soplador", "Snorkeling"]
  },
  {
    id: 5,
    title: "Tayrona",
    description: "Naturaleza virgen y playas paradisíacas",
    image: "/tayrona.jpg",
    rating: 4.9,
    type: "naturaleza",
    highlights: ["Cabo San Juan", "Pueblito", "Senderismo"]
  },
  {
    id: 6,
    title: "Bogotá",
    description: "La capital cultural de Colombia",
    image: "/bogota.jpg",
    rating: 4.5,
    type: "ciudad",
    highlights: ["Monserrate", "Museo del Oro", "Zona G"]
  }
];

const categories = [
  { id: "all", name: "Todos", icon: <FiMapPin /> },
  { id: "playa", name: "Playas", icon: <FaUmbrellaBeach /> },
  { id: "aventura", name: "Aventura", icon: <FaMountain /> },
  { id: "ciudad", name: "Ciudades", icon: <FaCity /> },
  { id: "naturaleza", name: "Naturaleza", icon: <FaTree /> }
];

export default function Destinos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = activeCategory === "all" || dest.type === activeCategory;
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="destinos-page">
      <Header />
      
      {/* Hero Section */}
      <section className="destinos-hero">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Descubre los <span className="highlight">destinos</span> de Colombia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explora los lugares más mágicos que tenemos para ofrecerte
          </motion.p>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="container">
          <motion.div 
            className="search-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar destinos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="categories">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-grid">
        <div className="container">
          {filteredDestinations.length > 0 ? (
            <div className="grid">
              {filteredDestinations.map((destination, index) => (
                <motion.div 
                  key={destination.id}
                  className="destination-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="card-image">
                    <img src={destination.image} alt={destination.title} />
                    <div className="card-rating">
                      <FiStar className="star-icon" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{destination.title}</h3>
                    <p>{destination.description}</p>
                    
                    <div className="card-highlights">
                      {destination.highlights.map((highlight, i) => (
                        <span key={i} className="highlight-tag">{highlight}</span>
                      ))}
                    </div>
                    
                    <button className="explore-btn">
                      Explorar <FiChevronRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No encontramos destinos con esos criterios</h3>
              <p>Intenta con otra búsqueda o categoría</p>
              <button 
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="reset-btn"
              >
                Mostrar todos los destinos
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="destinos-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2>¿No encuentras lo que buscas?</h2>
            <p>Diseñamos experiencias personalizadas para ti</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 191, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="cta-btn"
            >
              Solicitar tour personalizado
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}