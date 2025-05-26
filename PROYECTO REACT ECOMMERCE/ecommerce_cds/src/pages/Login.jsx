import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        navigate('/');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Hubo un problema con la conexión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center auth-title mb-4">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-grid">
            <button type="submit" className="btn btn-info">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
