// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import DetalleCD from './pages/DetalleCD';  // Importación correcta
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';

<Route path="/carrito" element={<Carrito />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cd/:id" element={<DetalleCD />} />  {/* Asegúrate de que este sea el componente correcto */}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;