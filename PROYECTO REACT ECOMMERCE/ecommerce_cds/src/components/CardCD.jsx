// src/components/CardCD.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CardCD({ cd }) {
  return (
    <div className="card-custom">
      <img 
        src={cd.ImagenURL || 'https://via.placeholder.com/150'} 
        alt={cd.Titulo} 
        style={{ width: '100%', borderRadius: '8px' }} 
      />
      <h4>{cd.Titulo}</h4>
      <p><strong>Artista:</strong> {cd.ArtistaNombre}</p>
      <p><strong>Precio:</strong> ${cd.Precio}</p>
      <Link to={`/cd/${cd.idCD}`}>Ver detalles</Link>
    </div>
  );
}

export default CardCD;
