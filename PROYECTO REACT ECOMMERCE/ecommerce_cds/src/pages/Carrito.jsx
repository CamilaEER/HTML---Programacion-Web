import React, { useState, useEffect } from 'react';  // Importa React, useState y useEffect para manejar estado y efectos
import './carrito.css';  // Importa los estilos CSS para la página del carrito
import { Link } from 'react-router-dom';  // Importa el componente Link para la navegación en React Router

// Componente del Carrito de compras
function Carrito() {
  const [carrito, setCarrito] = useState([]);  // Estado para almacenar los productos en el carrito

  // useEffect para cargar el carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];  // Obtener carrito desde localStorage (si existe)
    setCarrito(carritoGuardado);  // Actualizar el estado del carrito con los productos guardados
  }, []);  // Solo se ejecuta una vez, cuando el componente se monta

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (idCD) => {
    // Filtrar el carrito y eliminar el CD con el idCD proporcionado
    const nuevoCarrito = carrito.filter(cd => cd.idCD !== idCD);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));  // Guardar el nuevo carrito en localStorage
    setCarrito(nuevoCarrito);  // Actualizar el estado del carrito
  };

  // Calcular el total del carrito sumando los precios de los CDs
  const total = carrito.reduce((sum, cd) => sum + parseFloat(cd.Precio), 0);

  return (
    <div className="carrito-container">
      <h2>Tu carrito de compras</h2>
      {/* Verifica si el carrito está vacío */}
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>  // Si no hay productos, mostrar este mensaje
      ) : (
        <>
          <div className="carrito-lista">
            {/* Mapear los productos en el carrito y renderizar cada uno */}
            {carrito.map(cd => (
              <div key={cd.idCD} className="carrito-item">  {/* Cada producto tiene su propio contenedor */}
                <img src={cd.ImagenURL} alt={cd.Titulo} />  {/* Mostrar la imagen del CD */}
                <div className="info">
                  <h3>{cd.Titulo}</h3>  {/* Título del CD */}
                  <p>{cd.ArtistaNombre}</p>  {/* Nombre del artista */}
                  <p>${cd.Precio}</p>  {/* Precio del CD */}
                </div>
                {/* Botón para eliminar el producto del carrito */}
                <button className="eliminar-btn" onClick={() => eliminarDelCarrito(cd.idCD)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          
          {/* Mostrar el total del carrito */}
          <h4>Total: ${total.toFixed(2)}</h4>
          
          {/* Botón para ir a la página de pago */}
          <Link to="/checkout">
            <button className="btn btn-primary mt-3">Pagar</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Carrito;  // Exporta el componente para usarlo en otras partes de la aplicación
