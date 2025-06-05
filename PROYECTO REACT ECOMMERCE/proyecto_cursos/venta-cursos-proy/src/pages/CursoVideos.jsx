// Importación de React y hooks de React Router
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Importación de estilos
import './CheckYDetalles.css';

export default function CursoVideos() {
  const location = useLocation(); // Recupera el estado pasado desde la navegación anterior
  const navigate = useNavigate(); // Para redirigir al usuario
  const curso = location.state?.curso; // Extrae el curso desde el estado

  const handleComprar = () => {
    // Navega al checkout con la información del curso
    navigate('/checkout', { state: { curso } });
  };

  // Si no hay información del curso, muestra mensaje
  if (!curso) {
    return <p>No se encontró la información del curso.</p>;
  }

  return (
    <div className="curso-container">
      <h1>{curso.titulo} - Videos</h1>
      <p>{curso.descripcion}</p>

      <h3>Temas:</h3>
      <ul className="video-list">
        {curso.contenido.map((tema, i) => {
          return (
            <li key={i} style={{ marginBottom: '30px' }}>
              <h4>{tema.titulo}</h4>

              {/* Muestra descripción si está disponible */}
              {tema.descripcion && (
                <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
                  {tema.descripcion}
                </p>
              )}

              {/* Muestra video si está disponible */}
              {tema.videoUrl && (
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    title={`video-${i}`}
                    src={tema.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  ></iframe>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <button className="button-primary" onClick={handleComprar}>
        Comprar Certificado (${curso.precioCertificado})
      </button>
    </div>
  );
}