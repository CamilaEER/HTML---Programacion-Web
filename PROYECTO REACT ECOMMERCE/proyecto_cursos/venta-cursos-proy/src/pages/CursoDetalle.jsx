// Importación de React
import React from 'react';
// Importa hooks de React Router para obtener parámetros de la URL y navegar
import { useParams, useNavigate } from 'react-router-dom';
// Importa los datos de cursos desde un archivo local
import cursos from '../data/cursos';
// Importa los estilos para esta vista
import './CheckYDetalles.css';

export default function CursoDetalle() {
  // Extrae el parámetro 'id' de la URL (ej: /curso/3 → id = 3)
  const { id } = useParams();
  // Hook para redirigir programáticamente a otra ruta
  const navigate = useNavigate();

  // Busca el curso con el ID correspondiente (se convierte a entero para asegurar comparación)
  const curso = cursos.find(c => c.id === parseInt(id));

  // Si no se encuentra el curso, se muestra un mensaje
  if (!curso) return <p>Curso no encontrado.</p>;

  // Función que redirige a la página de videos del curso, pasando la info del curso por estado
  const handleVerCurso = () => {
    navigate('/curso-videos', { state: { curso } });
  };

  // Renderizado del contenido del curso
  return (
    <div className="curso-container">
      {/* Título del curso */}
      <h1>{curso.titulo}</h1>

      {/* Descripción general del curso */}
      <p>{curso.descripcion}</p>

      {/* Sección de temas o contenidos del curso */}
      <h3>Contenido del curso:</h3>
      <ul>
        {/* Muestra cada tema/título del contenido */}
        {curso.contenido.map((tema, i) => (
          <li key={i}>{tema.titulo}</li>
        ))}
      </ul>

      {/* Botón para ver los videos del curso */}
      <button className="button-primary" onClick={handleVerCurso}>
        Ver Curso
      </button>
    </div>
  );
}
