import React, { useState, useEffect } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (idCD) => {
    const nuevoCarrito = carrito.filter(cd => cd.idCD !== idCD);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="carrito-container">
      <h2>Tu carrito de compras 🛒</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="carrito-lista">
          {carrito.map(cd => (
            <div key={cd.idCD} className="carrito-item">
              <img src={cd.ImagenURL} alt={cd.Titulo} />
              <div className="info">
                <h3>{cd.Titulo}</h3>
                <p>{cd.ArtistaNombre}</p>
                <p>${cd.Precio}</p>
                <button onClick={() => eliminarDelCarrito(cd.idCD)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carrito;
