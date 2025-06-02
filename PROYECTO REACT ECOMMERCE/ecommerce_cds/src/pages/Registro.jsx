import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = { nombre, edad, correo, password };

    try {
      const response = await fetch('http://localhost:5000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.status !== 201) {
        setError(data.message);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      setError('Hubo un problema con la conexión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Registro</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <label>Edad</label>
          <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required />

          <label>Correo</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-btn secondary">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;