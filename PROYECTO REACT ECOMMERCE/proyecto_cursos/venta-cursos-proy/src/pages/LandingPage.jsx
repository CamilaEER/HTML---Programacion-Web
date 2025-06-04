// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Bienvenido a Venta de Cursos</h1>
      <p className="landing-text">Accede o crea una cuenta para continuar</p>
      <div>
        <Link to="/login">
          <button className="landing-button">Iniciar Sesión</button>
        </Link>
        <Link to="/registro">
          <button className="landing-button">Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
