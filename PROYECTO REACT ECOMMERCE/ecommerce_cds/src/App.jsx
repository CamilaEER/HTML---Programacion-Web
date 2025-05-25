// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';  // Página de inicio
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import DetalleCD from './pages/DetalleCD';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Si hay un token, redirige a Home */}
        <Route path="/" element={token ? <Home /> : <LandingPage />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cd/:id" element={<DetalleCD />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
