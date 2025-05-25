// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import DetalleCD from './pages/DetalleCD';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />               {/* Página principal con catálogo */}
        <Route path="/login" element={<Login />} />         {/* Login */}
        <Route path="/registro" element={<Registro />} />   {/* Registro */}
        <Route path="/cd/:id" element={<DetalleCD />} />    {/* Detalle del disco */}
        <Route path="/carrito" element={<Carrito />} />     {/* Carrito */}
        <Route path="/checkout" element={<Checkout />} />   {/* Pago */}
      </Routes>
    </Router>
  );
}

export default App;
