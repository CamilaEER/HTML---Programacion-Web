import React, { useState, useEffect } from 'react';  // Importa React y hooks de estado y efecto
import { useParams } from 'react-router-dom';  // Importa useParams para acceder a los parámetros de la URL
import './DetalleCD.css';  // Importa los estilos CSS para la página de detalles del CD
import Navbar from '../components/Navbar';  // Importa el componente Navbar

// Componente para mostrar los detalles de un CD específico
function DetalleCD() {
  // Extraer el id del CD de los parámetros de la URL
  const { id } = useParams();
  
  // Definir estados locales
  const [cd, setCd] = useState(null);  // Estado para almacenar los detalles del CD
  const [error, setError] = useState(null);  // Estado para manejar errores al cargar los detalles

  // useEffect para cargar los detalles del CD al iniciar el componente
  useEffect(() => {
    const fetchCdDetails = async () => {
      try {
        // Hacer una solicitud GET a la API para obtener los detalles del CD
        const response = await fetch(`http://localhost:5000/api/cds/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener el CD');  // Si la respuesta no es exitosa, lanzar un error
        const data = await response.json();  // Parsear la respuesta JSON
        setCd(data);  // Guardar los detalles del CD en el estado
      } catch (err) {
        setError('Error al cargar el CD.');  // Establecer mensaje de error si hay un problema
      }
    };

    fetchCdDetails();  // Ejecutar la función para obtener los detalles del CD
  }, [id]);  // El efecto se ejecuta cada vez que el parámetro `id` cambia en la URL

  // Mostrar el mensaje de error si ocurre alguno
  if (error) return <div className="detalle-container"><h3>{error}</h3></div>;

  // Mostrar mensaje de carga mientras se obtienen los detalles del CD
  if (!cd) return <div className="detalle-container"><h3>Cargando detalles...</h3></div>;

  return (
    <div>
      <Navbar />  {/* Renderiza el componente Navbar */}

      <div className="detalle-container">  {/* Contenedor principal para mostrar el CD */}
        <div className="detalle-card">
          {/* Mostrar imagen del CD */}
          <img src={cd.ImagenURL} alt={cd.Titulo} className="detalle-img" />
          
          <div className="detalle-info">  {/* Contenedor de la información del CD */}
            <h1>{cd.Titulo}</h1>  {/* Título del CD */}
            <h3>{cd.ArtistaNombre}</h3>  {/* Nombre del artista */}
            <p>{cd.Descripcion}</p>  {/* Descripción del CD */}
            <p><strong>Precio:</strong> ${cd.Precio}</p>  {/* Precio del CD */}
          </div>
          
          <div>
            {/* Botón para agregar el CD al carrito */}
            <button className="carrito-btn" onClick={() => agregarAlCarrito(cd)}>
              Agregar al carrito 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función para agregar un CD al carrito
const agregarAlCarrito = (cdSeleccionado) => {
  // Obtener el carrito del localStorage o un arreglo vacío si no existe
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el CD ya está en el carrito
  const existe = carrito.find((item) => item.idCD === cdSeleccionado.idCD);
  
  if (!existe) {
    // Si no está, agregarlo al carrito
    carrito.push(cdSeleccionado);
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar el carrito actualizado en localStorage
    alert(`"${cdSeleccionado.Titulo}" fue agregado al carrito.`);  // Mostrar mensaje de éxito
  } else {
    alert(`"${cdSeleccionado.Titulo}" ya está en el carrito.`);  // Mostrar mensaje si el CD ya está en el carrito
  }
};

export default DetalleCD;  // Exporta el componente para usarlo en otras partes de la aplicación
