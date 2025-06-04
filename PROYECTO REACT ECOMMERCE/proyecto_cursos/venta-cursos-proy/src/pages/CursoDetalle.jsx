// src/pages/CursoDetalle.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CheckYDetalles.css';

const cursos = [
  {
    id: 1,
    titulo: 'Curso de React Básico',
    descripcion: 'Aprende los fundamentos de React.',
    contenido: [
      'Introducción a React',
      'Componentes y Props',
      'Estado y Eventos',
      'Hooks Básicos',
    ],
    precioCertificado: 50,
    idCertificado: 1,
  },
  {
    id: 2,
    titulo: 'JavaScript Moderno',
    descripcion: 'Domina ES6+ y conceptos modernos de JS.',
    contenido: [
      'Variables y Tipos',
      'Funciones flecha',
      'Clases y Módulos',
      'Promesas y Async/Await',
    ],
    precioCertificado: 40,
    idCertificado: 2,
  },
  {
    id: 3,
    titulo: 'Python para Principiantes',
    descripcion: 'Introducción a Python paso a paso.',
    contenido: [
      'Sintaxis básica',
      'Control de flujo',
      'Funciones y módulos',
      'Manejo de archivos',
    ],
    precioCertificado: 30,
    idCertificado: 3,
  },
];

export default function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const curso = cursos.find(c => c.id === parseInt(id));

  if (!curso) return <p>Curso no encontrado.</p>;

  const handleComprar = () => {
    navigate('/checkout', { state: { curso } });
  };

  return (
    <div className="curso-container">
      <h1>{curso.titulo}</h1>
      <p>{curso.descripcion}</p>

      <h3>Contenido del curso:</h3>
      <ul>
        {curso.contenido.map((tema, i) => (
          <li key={i}>{tema}</li>
        ))}
      </ul>

      <button className="button-primary" onClick={handleComprar}>
        Comprar Certificado (${curso.precioCertificado})
      </button>
    </div>
  );
}
