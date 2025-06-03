import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

  if (!curso) {
    return <p>No hay información del curso para pagar.</p>;
  }


  
  const handlePago = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Supongamos que el idUsuario está guardado en el token o localStorage
      // Aquí simulamos obtenerlo (ajusta según tu autenticación real)
      const idUsuario = 1; // Reemplaza por lógica real para obtener el usuario logueado

      const res = await fetch('http://localhost:5000/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // <-- aquí envías el token JWT
        },
        body: JSON.stringify({
          idCertificado: curso.idCertificado,  // asegúrate de que `curso` tenga idCertificado
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
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Checkout</h1>

      {!pagado ? (
        <>
          <p>Estás comprando el certificado para:</p>
          <h2>{curso.titulo}</h2>
          <p>Precio: ${curso.precioCertificado}</p>

          <form onSubmit={handlePago} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1.2rem' }}>
              Pagar
            </button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>¡Pago exitoso!</h2>
          <p>Gracias por tu compra.</p>
          <p>Serás redirigido al inicio en breve...</p>
        </div>
      )}
    </div>
  );
}
