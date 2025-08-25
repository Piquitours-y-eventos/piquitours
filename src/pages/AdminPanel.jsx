import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { motion } from 'framer-motion';

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

  if (!session || loading) return <div className="text-center mt-10">Cargando...</div>;

  return (
    <motion.div 
      className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel Admin</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Teléfono</th>
              <th className="px-4 py-2 border">Asunto</th>
              <th className="px-4 py-2 border">Mensaje</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{c.id}</td>
                <td className="px-4 py-2 border">{c.nombre}</td>
                <td className="px-4 py-2 border">{c.email}</td>
                <td className="px-4 py-2 border">{c.telefono}</td>
                <td className="px-4 py-2 border">{c.asunto}</td>
                <td className="px-4 py-2 border">{c.mensaje}</td>
                <td className="px-4 py-2 border">{new Date(c.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 border">
                  <button 
                    onClick={() => handleDelete(c.id)} 
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}