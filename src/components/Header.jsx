import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes, FaGem, FaGlobeAmericas, FaUserTie, FaPaperPlane } from 'react-icons/fa';
import "./styles/Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const navRef = useRef(null);

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

  useEffect(() => {
    if (menuOpen && navRef.current && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      navRef.current.style.top = `${headerHeight}px`;
      navRef.current.style.height = `calc(100vh - ${headerHeight}px)`;
    }
  }, [menuOpen, scrolled]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo-container">
          <img 
            className="logo" 
            src="/logo.png" 
            alt="Piquitours y Eventos" 
          />
        </div>

        <nav ref={navRef} className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={closeMenu}>
                <FaGem />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/destinos" onClick={closeMenu}>
                <FaGlobeAmericas />
                <span>Destinos</span>
              </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={closeMenu}>
                <FaUserTie />
                <span>Nosotros</span>
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={closeMenu}>
                <FaPaperPlane />
                <span>Contacto</span>
              </Link>
            </li>
          </ul>
          
          <div className="theme-toggle-container">
            <button 
              className={`theme-toggle ${darkMode ? 'dark' : ''}`} 
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              <div className="toggle-thumb">
                {darkMode ? <FaSun /> : <FaMoon />}
              </div>
            </button>
          </div>
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