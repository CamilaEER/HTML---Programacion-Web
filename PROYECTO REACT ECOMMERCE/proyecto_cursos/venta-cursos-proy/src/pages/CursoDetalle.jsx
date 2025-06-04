// src/pages/CursoDetalle.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cursos from '../data/cursos';
import './CheckYDetalles.css';

export default function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const curso = cursos.find(c => c.id === parseInt(id));

  if (!curso) return <p>Curso no encontrado.</p>;

  const handleVerCurso = () => {
    navigate('/curso-videos', { state: { curso } });
  };

  return (
    <div className="curso-container">
      <h1>{curso.titulo}</h1>
      <p>{curso.descripcion}</p>

      <h3>Contenido del curso:</h3>
      <ul>
        {curso.contenido.map((tema, i) => (
          <li key={i}>{tema.titulo}</li>
        ))}
      </ul>


      <button className="button-primary" onClick={handleVerCurso}>
        Ver Curso
      </button>
    </div>
  );
}
