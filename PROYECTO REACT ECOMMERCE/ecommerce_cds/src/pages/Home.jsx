// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import CardCD from '../components/CardCD';

function Home() {
  const [cds, setCds] = useState([]);  // Estado para almacenar los CDs
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Estado para manejar errores

  // Usamos useEffect para hacer la llamada a la API cuando el componente se monte
  useEffect(() => {
    const fetchCds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cds');
        const data = await response.json();
        setCds(data);  // Guardar los CDs en el estado
      } catch (err) {
        setError('Hubo un problema al cargar los CDs');
      } finally {
        setLoading(false);  // Dejar de cargar cuando se obtengan los datos
      }
    };

    fetchCds();  // Llamar la función para obtener los CDs
  }, []);  // El array vacío asegura que solo se ejecute una vez, cuando el componente se monte

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Catálogo de Discos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cds.map((cd) => (
          <CardCD key={cd.idCD} cd={cd} />
        ))}
      </div>
    </div>
  );
}

export default Home;