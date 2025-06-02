import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './AuthPages.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        localStorage.setItem('idPersona', decoded.idPersona);
        navigate('/home');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Hubo un problema con la conexión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <label>Correo</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-btn primary">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;