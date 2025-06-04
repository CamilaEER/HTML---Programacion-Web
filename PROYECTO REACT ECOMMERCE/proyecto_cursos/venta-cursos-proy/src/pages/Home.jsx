// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cursos from '../data/cursos';
import './Home.css';


export default function Home() {
  return (
    <div className="home-container">
      <h1>Catálogo de Cursos</h1>
      <div className="cursos-grid">
        {cursos.map((curso) => (
          <div key={curso.id} className="curso-card">
            <h3>{curso.titulo}</h3>
            <p>{curso.descripcion}</p>
            <Link to={`/curso/${curso.id}`}>
              <button>Ver Detalle</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

