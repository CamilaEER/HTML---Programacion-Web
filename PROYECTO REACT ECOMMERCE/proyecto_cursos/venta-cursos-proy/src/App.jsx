import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import CursoDetalle from './pages/CursoDetalle';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import CursoVideos from './pages/CursoVideos';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas, solo accesibles si está logueado */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/curso/:id" 
          element={
            <ProtectedRoute>
              <CursoDetalle />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/curso-videos"
          element={
            <ProtectedRoute>
              <CursoVideos />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
