// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook de React Router para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { correo, password };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.status !== 200) {
        setError(data.message);
      } else {
        // Guardar el token JWT en localStorage
        localStorage.setItem('token', data.token);

        // Redirigir a la página de Home después de iniciar sesión correctamente
        navigate('/');  // '/' lleva a la página principal (Home)
      }
    } catch (err) {
      console.error('Error al intentar iniciar sesión:', err);
      setError('Hubo un problema con la conexión');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
