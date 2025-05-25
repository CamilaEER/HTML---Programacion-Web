// src/components/Navbar.jsx (o en Home.jsx)
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');

    // Redirigir al login después de cerrar sesión
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Navbar;
