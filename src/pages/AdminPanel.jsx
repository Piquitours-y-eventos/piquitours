import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { motion } from 'framer-motion';
import './styles/AdminPanel.css';

export default function AdminPanel() {
  const [contactos, setContactos] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) return navigate('/login');
      fetchContactos();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchContactos = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('contactos')
      .select('*')
      .order('created_at', { ascending: false });

    setLoading(false);
    if (fetchError) return setError(fetchError.message);
    setContactos(data);
  };

  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from('contactos').delete().eq('id', id);
    if (deleteError) return setError(deleteError.message);
    fetchContactos();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!session || loading) return (
    <div className="panel-loading">
      <div className="spinner"></div>
      <p>Cargando panel...</p>
    </div>
  );

  return (
    <motion.div 
      className="panel-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="panel-header">
        <h1>Panel Admin</h1>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </header>

      {error && <p className="panel-error">{error}</p>}

      <div className="table-wrapper">
        {/* Desktop / Tablet */}
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Asunto</th>
              <th>Mensaje</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td>{c.asunto}</td>
                <td>{c.mensaje}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(c.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="contact-cards">
          {contactos.map(c => (
            <div key={c.id} className="contact-card">
              <div className="card-row"><strong>ID:</strong> {c.id}</div>
              <div className="card-row"><strong>Nombre:</strong> {c.nombre}</div>
              <div className="card-row"><strong>Email:</strong> {c.email}</div>
              <div className="card-row"><strong>Teléfono:</strong> {c.telefono}</div>
              <div className="card-row"><strong>Asunto:</strong> {c.asunto}</div>
              <div className="card-row"><strong>Mensaje:</strong> {c.mensaje}</div>
              <div className="card-row"><strong>Fecha:</strong> {new Date(c.created_at).toLocaleString()}</div>
              <button className="delete-btn" onClick={() => handleDelete(c.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
