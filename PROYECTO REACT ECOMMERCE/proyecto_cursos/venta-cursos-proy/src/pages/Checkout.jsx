// Importa React y el hook useState para gestionar estados locales
import React, { useState } from 'react';
// Importa hooks para acceder a la ubicación actual y navegar entre rutas
import { useLocation, useNavigate } from 'react-router-dom';
// Importa los estilos CSS para este componente
import './CheckYDetalles.css';

export default function Checkout() {
  // Hook para obtener los datos enviados desde otra página
  const location = useLocation();
  // Hook para redirigir al usuario a otra ruta
  const navigate = useNavigate();
  // Se obtiene el objeto del curso desde el estado de navegación
  const curso = location.state?.curso;

  // Estados para controlar el flujo del pago y los datos del cliente
  const [pagado, setPagado] = useState(false); // Indica si ya se pagó
  const [error, setError] = useState(''); // Mensaje de error en caso de fallos
  const [nombreCliente, setNombreCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  // Se obtiene el token del localStorage (para autenticación)
  const token = localStorage.getItem('token');

  // Si no hay información del curso, se muestra un mensaje y se detiene el render
  if (!curso) return <p>No hay información del curso para pagar.</p>;

  // Función que se ejecuta al enviar el formulario
  const handlePago = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setError(''); // Reinicia el mensaje de error

    try {
      // Se puede obtener el ID del usuario desde el backend/token en producción
      const idUsuario = 1;

      // Se hace una petición POST al backend para registrar la compra
      const res = await fetch('http://localhost:5000/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Se incluye el token para autenticación
        },
        body: JSON.stringify({
          idCertificado: curso.idCertificado, // ID del certificado que se va a comprar
        }),
      });

      // Se parsea la respuesta
      const data = await res.json();

      // Si la respuesta no fue exitosa, se muestra el mensaje de error
      if (!res.ok) {
        setError(data.message || 'Error al procesar la compra');
      } else {
        // Si todo salió bien, se muestra el mensaje de éxito
        setPagado(true);
        // Redirige al usuario al inicio después de 3 segundos
        setTimeout(() => navigate('/home'), 3000);
      }
    } catch {
      // Si hubo un problema de conexión
      setError('Error en la conexión con el servidor');
    }
  };

  // Render del componente
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Si el pago aún no se ha hecho */}
      {!pagado ? (
        <>
          <p>Estás comprando el certificado para:</p>
          <h2>{curso.titulo}</h2>
          <p>Precio: ${curso.precioCertificado}</p>

          {/* Formulario para recoger los datos del cliente */}
          <form onSubmit={handlePago} className="checkout-form">
            <input
              type="text"
              placeholder="Nombre Completo"
              value={nombreCliente}
              onChange={e => setNombreCliente(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={correoCliente}
              onChange={e => setCorreoCliente(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefonoCliente}
              onChange={e => setTelefonoCliente(e.target.value)}
              required
            />
            <button type="submit" className="button-primary">
              Pagar
            </button>
          </form>

          {/* Muestra el mensaje de error si existe */}
          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        // Si el pago fue exitoso, se muestra este mensaje
        <div className="success-message">
          <h2>¡Pago exitoso!</h2>
          <p>Gracias por tu compra.</p>
          <p>Serás redirigido al inicio en breve...</p>
        </div>
      )}
    </div>
  );
}
