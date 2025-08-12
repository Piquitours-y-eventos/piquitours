
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaMapMarkerAlt, FaUsers, FaEnvelope } from 'react-icons/fa';
import "./styles/Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo-container">
          <img 
            className="logo" 
            src="/logo_entero.png" 
            alt="Piquitours y Eventos" 
          />
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={closeMenu}>
              <FaHome style={{ marginRight: "6px" }} />
              Inicio
              </Link>
            </li>
            <li>
            <Link to="/destinos" onClick={closeMenu}>
              <FaMapMarkerAlt style={{ marginRight: "6px" }} />
              Destinos
            </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={closeMenu}>
                <FaUsers style={{ marginRight: "6px" }} />
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={closeMenu}>
                <FaEnvelope style={{ marginRight: "6px" }} />
                Contacto
              </Link>
            </li>
            <li>
              <button 
                className={`theme-toggle ${darkMode ? 'dark' : ''}`} 
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                <div className="toggle-thumb">
                  {darkMode ? <FaSun /> : <FaMoon />}
                </div>
              </button>
            </li>
          </ul>
        </nav>

        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}
