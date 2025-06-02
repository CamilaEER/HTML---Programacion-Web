// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-box">
        <div className="landing-icon">🎶</div>
        <h1 className="landing-title">Bienvenido a Ecommerce CDs</h1>
        <p className="landing-sub">Descubre, escucha y compra tus discos favoritos</p>

        <div className="landing-actions">
          <Link to="/login" className="landing-btn primary">Iniciar sesión</Link>
          <Link to="/registro" className="landing-btn secondary">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
