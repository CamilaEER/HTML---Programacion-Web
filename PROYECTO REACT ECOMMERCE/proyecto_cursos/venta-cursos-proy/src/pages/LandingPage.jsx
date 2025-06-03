// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Bienvenido a Venta de Cursos</h1>
      <p>Accede o crea una cuenta para continuar</p>
      <Link to="/login"><button style={{ marginRight: 10 }}>Iniciar Sesión</button></Link>
      <Link to="/registro"><button>Registrarse</button></Link>
    </div>
  );
}

export default LandingPage;
