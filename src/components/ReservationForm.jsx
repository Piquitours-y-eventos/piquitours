// ReservationForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, FiUsers, FiMessageSquare } from 'react-icons/fi';
import './styles/ReservationForm.css';

const ReservationForm = ({ selectedTour, onClose, onSubmitted }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    personas: 1,
    mensaje: ''
  });
  const [formStep, setFormStep] = useState(1);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (formStep === 1) {
      if (!formData.nombre || !formData.email || !formData.telefono) {
        setFormError('Por favor completa todos los campos personales.');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setFormError('Email inválido.');
        return false;
      }
    } else if (formStep === 2) {
      if (!formData.fecha || formData.personas < 1) {
        setFormError('Por favor selecciona fecha y número de personas.');
        return false;
      }
    }
    setFormError('');
    return true;
  };

  const nextFormStep = () => {
    if (validateStep()) setFormStep(prev => Math.min(prev + 1, 3));
  };

  const prevFormStep = () => setFormStep(prev => Math.max(prev - 1, 1));

  const submitForm = async () => {
    if (!validateStep()) return;
    try {
      setSubmitting(true);
      // Simulación de envío (reemplazar con API real si aplica)
      await new Promise(r => setTimeout(r, 800));
      if (onSubmitted) onSubmitted({ ...formData, tour: selectedTour?.nombre || selectedTour?.title });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="reserva-overlay"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
    >
      <button className="reserva-close" aria-label="Cerrar formulario" onClick={onClose}>✕</button>

      <h4 className="reserva-title"><span className="icon">📅</span> Reserva Tu Viaje: ¡Comienza la Aventura! 🌍</h4>
      <p className="reserva-intro">
        Completa este formulario rápido y seguro para reservar {selectedTour?.nombre || selectedTour?.title}. Nuestro equipo te contactará en menos de 24 horas.
      </p>

      <div className="reserva-stepper" aria-label="Progreso de la reserva">
        <div className={`step-indicator ${formStep >= 1 ? 'active' : ''}`} aria-current={formStep === 1 ? 'step' : undefined}>1</div>
        <div className={`step-indicator ${formStep >= 2 ? 'active' : ''}`} aria-current={formStep === 2 ? 'step' : undefined}>2</div>
        <div className={`step-indicator ${formStep === 3 ? 'active' : ''}`} aria-current={formStep === 3 ? 'step' : undefined}>3</div>
      </div>

      {formError && <p className="reserva-error" role="alert">{formError}</p>}

      <AnimatePresence mode="wait">
        {formStep === 1 && (
          <motion.div
            key="step1"
            className="reserva-step reserva-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <label className="form-group">
              <FiUser className="form-icon" />
              <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleFormChange} aria-label="Nombre completo" />
            </label>
            <label className="form-group">
              <FiMail className="form-icon" />
              <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleFormChange} aria-label="Correo electrónico" />
            </label>
            <label className="form-group">
              <FiPhone className="form-icon" />
              <input type="tel" name="telefono" placeholder="Teléfono (con código de país)" value={formData.telefono} onChange={handleFormChange} aria-label="Teléfono" />
            </label>
          </motion.div>
        )}

        {formStep === 2 && (
          <motion.div
            key="step2"
            className="reserva-step reserva-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <label className="form-group">
              <FiCalendar className="form-icon" />
              <input type="date" name="fecha" placeholder="Fecha preferida" value={formData.fecha} onChange={handleFormChange} aria-label="Fecha preferida" />
            </label>
            <label className="form-group">
              <FiUsers className="form-icon" />
              <input type="number" name="personas" min="1" placeholder="Número de personas" value={formData.personas} onChange={handleFormChange} aria-label="Número de personas" />
            </label>
            <label className="form-group">
              <FiMessageSquare className="form-icon" />
              <textarea name="mensaje" placeholder="Mensaje adicional (ej. requerimientos especiales)" value={formData.mensaje} onChange={handleFormChange} aria-label="Mensaje adicional" />
            </label>
          </motion.div>
        )}

        {formStep === 3 && (
          <motion.div
            key="step3"
            className="reserva-step confirmation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h5>Resumen de tu Reserva 📋</h5>
            <p><strong>Destino:</strong> {selectedTour?.nombre || selectedTour?.title}</p>
            <p><strong>Nombre:</strong> {formData.nombre}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Teléfono:</strong> {formData.telefono}</p>
            <p><strong>Fecha:</strong> {formData.fecha}</p>
            <p><strong>Personas:</strong> {formData.personas}</p>
            <p><strong>Mensaje:</strong> {formData.mensaje || 'Ninguno'}</p>
            <p className="confirmation-note">¡Todo listo! Presiona "Enviar" para confirmar.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="reserva-actions">
        {formStep > 1 && (
          <button className="button ghost" onClick={prevFormStep} disabled={submitting}>Anterior</button>
        )}
        {formStep < 3 ? (
          <button className="button" onClick={nextFormStep} disabled={submitting}>Siguiente</button>
        ) : (
          <button className="button" onClick={submitForm} disabled={submitting}>
            {submitting ? 'Enviando…' : 'Enviar Reserva ✅'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ReservationForm;
