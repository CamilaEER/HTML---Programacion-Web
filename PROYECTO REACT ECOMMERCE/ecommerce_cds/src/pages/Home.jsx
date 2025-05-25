// src/pages/Home.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  // Verificar si hay un token JWT en el localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // Redirigir a Login si no hay token
  }

  return (
    <div>
      <h1>Bienvenido al Catálogo de Discos</h1>
      {/* Aquí mostrarías el catálogo de CDs */}
    </div>
  );
}

export default Home;
