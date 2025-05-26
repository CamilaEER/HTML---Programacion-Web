// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

function LandingPage() {
  return (
    <div className="landing-container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center landing-box p-5 rounded shadow">
        <h1 className="mb-4 text-gradient">Bienvenido a Ecommerce CDs</h1>
        <p className="mb-3">¿Ya tienes una cuenta?</p>
        <Link to="/login">
          <button className="btn btn-outline-info me-2 mb-3">Iniciar sesión</button>
        </Link>
        <p className="mb-3">¿No tienes cuenta?</p>
        <Link to="/registro">
          <button className="btn btn-success">Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
