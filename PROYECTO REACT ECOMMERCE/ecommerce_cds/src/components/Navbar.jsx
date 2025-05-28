// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#333',
      color: '#fff'
    }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
          🎵 CD Store
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/carrito" style={{ color: '#fff', textDecoration: 'none' }}>🛒 Carrito</Link>
        <button onClick={handleLogout} style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
