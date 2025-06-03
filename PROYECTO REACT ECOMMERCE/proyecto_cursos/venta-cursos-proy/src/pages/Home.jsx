// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

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
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Catálogo de Cursos</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {cursos.map((curso) => (
          <div 
            key={curso.id} 
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 20,
              width: 270,
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{curso.titulo}</h3>
            <p>{curso.descripcion}</p>
            <Link to={`/curso/${curso.id}`}>
              <button style={{ padding: '0.5rem 1rem' }}>
                Ver Detalle
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
