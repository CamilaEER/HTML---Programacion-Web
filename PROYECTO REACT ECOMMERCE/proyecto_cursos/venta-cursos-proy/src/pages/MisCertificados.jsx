import React, { useEffect, useState } from 'react';
import './CheckYDetalles.css';
import Navbar from '../components/Navbar';

export default function MisCertificados() {
  const [certificados, setCertificados] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    fetch('http://localhost:5000/mis-certificados', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCertificados(data))
      .catch(err => {
        console.error(err);
        setError('Error al obtener los certificados');
      });
  }, []);


  if (error) return <p>{error}</p>;

  return (
    <div><Navbar />
      <div className="curso-container">
        <h1>Mis Certificados</h1>
        {certificados.length === 0 ? (
          <p>No has comprado certificados aún.</p>
        ) : (
          <ul>
            {certificados.map(cert => (
              <li key={cert.idCertificado}>
                <strong>{cert.nombre}</strong> - ${cert.precio}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
