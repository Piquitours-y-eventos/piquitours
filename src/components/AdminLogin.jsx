import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import './styles/AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Título */}
        <h1 className="login-title">PiquiTours Admin</h1>
        <p className="login-subtitle">Accede a tu cuenta para administrar el panel</p>

        {/* Error */}
        {error && (
          <motion.div
            className="login-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Email */}
          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {/* Password */}
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {/* Botón */}
          <motion.button
            type="submit"
            disabled={loading}
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span> Cargando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="login-footer">
          © 2025 PiquiTours. Todos los derechos reservados.
        </p>
      </motion.div>
    </div>
  );
}
