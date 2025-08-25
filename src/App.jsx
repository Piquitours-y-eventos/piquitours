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
import NotFound from './pages/NotFound';

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
          
          {/* Catch-all para rutas públicas */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* Catch-all para rutas admin */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;

