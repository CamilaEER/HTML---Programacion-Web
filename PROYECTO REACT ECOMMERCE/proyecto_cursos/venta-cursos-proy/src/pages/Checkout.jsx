import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckYDetalles.css';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const curso = location.state?.curso;

  const [pagado, setPagado] = useState(false);
  const [error, setError] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  const token = localStorage.getItem('token');
  if (!curso) return <p>No hay información del curso para pagar.</p>;

  const handlePago = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const idUsuario = 1;

      const res = await fetch('http://localhost:5000/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          idCertificado: curso.idCertificado,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Error al procesar la compra');
      } else {
        setPagado(true);
        setTimeout(() => navigate('/home'), 3000);
      }
    } catch {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {!pagado ? (
        <>
          <p>Estás comprando el certificado para:</p>
          <h2>{curso.titulo}</h2>
          <p>Precio: ${curso.precioCertificado}</p>

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

          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <div className="success-message">
          <h2>¡Pago exitoso!</h2>
          <p>Gracias por tu compra.</p>
          <p>Serás redirigido al inicio en breve...</p>
        </div>
      )}
    </div>
  );
}