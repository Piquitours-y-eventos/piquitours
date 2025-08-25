import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <motion.div
        className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-gray-100"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo o título */}
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">PiquiTours Admin</h1>
        <p className="text-gray-500 text-center mb-6">Inicia sesión con tu correo y contraseña</p>

        {/* Error */}
        {error && (
          <motion.div
            className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-all"
              required
            />
          </div>

          {/* Botón */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 PiquiTours. Todos los derechos reservados.
        </p>
      </motion.div>
    </div>
  );
}
