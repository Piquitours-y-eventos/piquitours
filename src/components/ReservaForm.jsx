import { useState } from "react";

export default function ReservaForm({ onClose }) {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
        {!success ? (
          <>
            <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
              Reserva tu Tour
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre completo"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="date"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-red-500 to-orange-500 text-white font-semibold py-2 rounded-xl shadow hover:opacity-90 transition"
              >
                Reservar
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-3">
              ✅ Reserva realizada correctamente
            </h3>
            <p className="text-gray-700 mb-4">
              Su reserva ha sido procesada y será atendida en las próximas{" "}
              <span className="font-bold">24 horas</span>.
            </p>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              Cerrar
            </button>
          </div>
        )}

        {!success && (
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
