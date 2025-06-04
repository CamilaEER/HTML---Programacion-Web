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
      backgroundColor: '#f8f8f8',
      borderBottom: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      fontFamily: 'Helvetica Neue, sans-serif'
    }}>
      <div>
        <Link to="/" style={{
          color: '#222',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '22px',
          letterSpacing: '1px'
        }}>
          CD Boutique
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        
        <Link to="/MisPedidos" style={{
          color: '#333',
          textDecoration: 'none',
          fontSize: '16px',
          transition: 'color 0.2s ease'
        }}>
          Mis pedidos
        </Link>

        <Link to="/carrito" style={{
          color: '#333',
          textDecoration: 'none',
          fontSize: '16px',
          transition: 'color 0.2s ease'
        }}>
          🛒 Carrito
        </Link>
        
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#444')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#222')}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
