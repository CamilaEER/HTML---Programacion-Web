// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a Ecommerce CDs</h1>
      <p>¿Ya tienes una cuenta?</p>
      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>
      <p>¿No tienes cuenta?</p>
      <Link to="/registro">
        <button>Registrarse</button>
      </Link>
    </div>
  );
}

export default LandingPage;
