// Importa React y los hooks useEffect y useState
import React, { useEffect, useState } from 'react';
// Importa los estilos CSS personalizados para esta vista
import './CheckYDetalles.css';
// Importa el componente de navegación superior
import Navbar from '../components/Navbar';

export default function MisCertificados() {
  // Estado para almacenar los certificados obtenidos del servidor
  const [certificados, setCertificados] = useState([]);
  // Estado para manejar errores en la solicitud
  const [error, setError] = useState('');

  // Hook useEffect que se ejecuta una vez al montar el componente
  useEffect(() => {
    // Obtiene el token JWT desde el almacenamiento local
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, no se realiza la solicitud
      return;
    }

    // Realiza una solicitud GET al backend para obtener los certificados del usuario autenticado
    fetch('http://localhost:5000/mis-certificados', {
      headers: {
        // Envía el token en la cabecera Authorization para autenticación
        Authorization: `Bearer ${token}`
      }
    })
      // Convierte la respuesta en JSON
      .then(res => res.json())
      // Almacena los datos de certificados en el estado
      .then(data => setCertificados(data))
      // En caso de error, lo muestra en consola y en pantalla
      .catch(err => {
        console.error(err);
        setError('Error al obtener los certificados');
      });
  }, []); // [] significa que esto solo se ejecuta una vez al cargar el componente

  // Si ocurrió un error, se muestra el mensaje correspondiente
  if (error) return <p>{error}</p>;

  // Renderizado del componente
  return (
    <div>
      {/* Barra de navegación en la parte superior */}
      <Navbar />

      <div className="curso-container">
        <h1>Mis Certificados</h1>

        {/* Si no hay certificados en el arreglo, muestra un mensaje alternativo */}
        {certificados.length === 0 ? (
          <p>No has comprado certificados aún.</p>
        ) : (
          // Si hay certificados, los lista usando un map
          <ul>
            {certificados.map(cert => (
              <li key={cert.idCertificado}>
                {/* Muestra nombre y precio del certificado */}
                <strong>{cert.nombre}</strong> - ${cert.precio}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
