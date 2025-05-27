import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetalleCD.css';

function DetalleCD() {
  const { id } = useParams();
  const [cd, setCd] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCdDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cds/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener el CD');
        const data = await response.json();
        setCd(data);
      } catch (err) {
        setError('Error al cargar el CD.');
      }
    };

    fetchCdDetails();
  }, [id]);

  if (error) return <div className="detalle-container"><h3>{error}</h3></div>;
  if (!cd) return <div className="detalle-container"><h3>Cargando detalles...</h3></div>;

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <img src={cd.ImagenURL} alt={cd.Titulo} className="detalle-img" />
        <div className="detalle-info">
          <h1>{cd.Titulo}</h1>
          <h3>{cd.ArtistaNombre}</h3>
          <p>{cd.Descripcion}</p>
          <p><strong>Precio:</strong> ${cd.Precio}</p>
        </div>
        <div>
          <button className="carrito-btn" onClick={() => agregarAlCarrito(cd)}>
            Agregar al carrito 🛒
          </button>

        </div>
      </div>
    </div>
  );
}
const agregarAlCarrito = (cdSeleccionado) => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Opcional: verifica si ya está en el carrito
  const existe = carrito.find((item) => item.idCD === cdSeleccionado.idCD);
  if (!existe) {
    carrito.push(cdSeleccionado);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`"${cdSeleccionado.Titulo}" fue agregado al carrito.`);
  } else {
    alert(`"${cdSeleccionado.Titulo}" ya está en el carrito.`);
  }
};

export default DetalleCD;
