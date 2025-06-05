// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/mis-certificados" className="navbar-link">Ver Certificados</Link>
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout} className="navbar-button">Cerrar Sesión</button>
      </div>
    </nav>
  );
}