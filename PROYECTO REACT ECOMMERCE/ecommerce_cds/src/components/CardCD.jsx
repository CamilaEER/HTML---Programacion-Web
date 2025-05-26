// src/components/CardCD.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CardCD({ cd }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10, width: 200 }}>
      <img 
        src={cd.ImagenURL || 'https://via.placeholder.com/150'} 
        alt={cd.Titulo} 
        style={{ width: '100%', height: 'auto' }} 
      />
      <h3>{cd.Titulo}</h3>
      <p><strong>Artista:</strong> {cd.ArtistaNombre}</p>
      <p><strong>Precio:</strong> ${cd.Precio}</p>
      <Link to={`/cd/${cd.idCD}`}>Ver detalles</Link>
    </div>
  );
}

export default CardCD;
