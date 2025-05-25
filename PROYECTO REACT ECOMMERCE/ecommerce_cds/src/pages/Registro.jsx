// src/pages/Registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        navigate('/login');  // Redirige al login después de un registro exitoso
      }
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      setError('Hubo un problema con la conexión');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Registro;
