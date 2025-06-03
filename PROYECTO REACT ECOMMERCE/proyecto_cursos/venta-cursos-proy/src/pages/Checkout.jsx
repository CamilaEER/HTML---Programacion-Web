// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const curso = location.state?.curso;

  const [pagado, setPagado] = useState(false);

  if (!curso) {
    return <p>No hay información del curso para pagar.</p>;
  }

  const handlePago = () => {
    // Aquí puedes integrar lógica real de pago o backend.
    setPagado(true);

    // Opcional: redirigir después de unos segundos
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem', textAlign: 'center' }}>
      <h1>Checkout</h1>
      {!pagado ? (
        <>
          <p>Estás comprando el certificado para:</p>
          <h2>{curso.titulo}</h2>
          <p>Precio: ${curso.precioCertificado}</p>
          <button 
            onClick={handlePago} 
            style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', marginTop: '1rem' }}
          >
            Pagar
          </button>
        </>
      ) : (
        <div>
          <h2>¡Pago exitoso!</h2>
          <p>Gracias por tu compra.</p>
          <p>Serás redirigido al inicio en breve...</p>
        </div>
      )}
    </div>
  );
}
