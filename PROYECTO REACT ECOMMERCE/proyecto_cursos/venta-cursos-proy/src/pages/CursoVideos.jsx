// src/pages/CursoVideos.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckYDetalles.css';

export default function CursoVideos() {
  const location = useLocation();
  const navigate = useNavigate();
  const curso = location.state?.curso;

  const handleComprar = () => {
    navigate('/checkout', { state: { curso } });
  };

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
          // Si tema es un string solo mostrar texto
          if (typeof tema === 'string') {
            return <li key={i}>{tema}</li>;
          }
          // Si tema es objeto, mostrar título y video
          return (
            <li key={i} style={{ marginBottom: '30px' }}>
              <h4>{tema.titulo}</h4>
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
