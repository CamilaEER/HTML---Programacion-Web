// src/components/CardCD.jsx
import React from 'react';  // Importa React
import { Link } from 'react-router-dom';  // Importa Link para la navegación entre páginas en React Router

// Componente CardCD que recibe un objeto `cd` como prop
function CardCD({ cd }) {
  return (
    <div className="card-custom">  {/* Contenedor para el diseño de la tarjeta del CD */}
      
      {/* Imagen del CD con una URL predeterminada si no está disponible */}
      <img 
        src={cd.ImagenURL || 'https://via.placeholder.com/150'}  // Usa la imagen del CD o una imagen de reemplazo
        alt={cd.Titulo}  // Texto alternativo para la imagen
        style={{ width: '100%', borderRadius: '8px' }}  // Estilo: ancho completo y bordes redondeados
      />
      
      {/* Título del CD */}
      <h4>{cd.Titulo}</h4>

      {/* Nombre del artista */}
      <p><strong>Artista:</strong> {cd.ArtistaNombre}</p>

      {/* Precio del CD */}
      <p><strong>Precio:</strong> ${cd.Precio}</p>

      {/* Enlace para ver más detalles del CD. Navega a la página de detalles usando el id del CD */}
      <Link to={`/cd/${cd.idCD}`}>Ver detalles</Link>
    </div>
  );
}

export default CardCD;  // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
