import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Páginas públicas
import Home from "./pages/Home";
import Destinos from "./pages/Destinos";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";

// Páginas admin
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout público */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;

