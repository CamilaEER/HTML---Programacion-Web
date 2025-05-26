// src/pages/DetalleCD.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetalleCD() {
  const { id } = useParams();  // Obtener el id del CD de la URL
  const [cd, setCd] = useState(null);

  useEffect(() => {
    const fetchCdDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/cds/${id}`);
      const data = await response.json();
      setCd(data);
    };

    fetchCdDetails();
  }, [id]);

  if (!cd) {
    return <div>Cargando detalles...</div>;
  }

  return (
    <div>
      <h1>{cd.Titulo}</h1>
      <h3>{cd.ArtistaNombre}</h3>
      <p>{cd.Descripcion}</p>
      <img src={cd.ImagenURL} alt={cd.Titulo} />
    </div>
  );
}

export default DetalleCD;  // Asegúrate de usar `export default`
