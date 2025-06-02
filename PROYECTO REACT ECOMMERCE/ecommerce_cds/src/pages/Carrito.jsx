import React, { useState, useEffect } from 'react';
import './carrito.css';
import { Link } from 'react-router-dom';

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

  const total = carrito.reduce((sum, cd) => sum + parseFloat(cd.Precio), 0);

  return (
    <div className="carrito-container">
      <h2>Tu carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <div className="carrito-lista">
            {carrito.map(cd => (
              <div key={cd.idCD} className="carrito-item">
                <img src={cd.ImagenURL} alt={cd.Titulo} />
                <div className="info">
                  <h3>{cd.Titulo}</h3>
                  <p>{cd.ArtistaNombre}</p>
                  <p>${cd.Precio}</p>
                </div>
                <button className="eliminar-btn" onClick={() => eliminarDelCarrito(cd.idCD)}>Eliminar</button>
              </div>
            ))}

          </div>
          <h4>Total: ${total.toFixed(2)}</h4>
          <Link to="/checkout">
            <button className="btn btn-primary mt-3">Pagar</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Carrito;
