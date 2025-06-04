// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const cursos = [
  {
    id: 1,
    titulo: 'Curso de React Básico',
    descripcion: 'Aprende los fundamentos de React.',
  },
  {
    id: 2,
    titulo: 'JavaScript Moderno',
    descripcion: 'Domina ES6+ y conceptos modernos de JS.',
  },
  {
    id: 3,
    titulo: 'Python para Principiantes',
    descripcion: 'Introducción a Python paso a paso.',
  },
];

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

