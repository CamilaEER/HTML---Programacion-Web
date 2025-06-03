import React, { useState, useEffect } from 'react';
import CardCD from '../components/CardCD';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
  const [cds, setCds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState("Todos");

  // Cargar géneros
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/generos');
        const data = await response.json();
        setGeneros(data);
      } catch (error) {
        console.error('Error al cargar los géneros:', error);
      }
    };

    fetchGeneros();
  }, []);

  useEffect(() => {
    const fetchCds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cds');
        const data = await response.json();
        setCds(data);
      } catch (err) {
        setError('Hubo un problema al cargar los CDs');
      } finally {
        setLoading(false);
      }
    };

    fetchCds();
  }, []);

  // Filtrar los CDs según el género seleccionado
  const cdsFiltrados = generoSeleccionado === "Todos"
    ? cds
    : cds.filter(cd => cd.GeneroNombre === generoSeleccionado);

  if (loading) return <div className="home-container text-center text-white"><h3>Cargando...</h3></div>;
  if (error) return <div className="home-container text-center text-white"><h3>{error}</h3></div>;

  // Extraer géneros únicos para las opciones del select
  const generosUnicos = [...new Set(cds.map(cd => cd.GeneroNombre))];

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Catálogo de Discos</h1>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label htmlFor="filtro-genero"><strong>Filtrar por género:</strong></label>
          <select
            id="filtro-genero"
            value={generoSeleccionado}
            onChange={(e) => setGeneroSeleccionado(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="Todos">Todos</option>
            {generos.map((genero) => (
              <option key={genero.idGenero} value={genero.Nombre}>
                {genero.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="card-grid">
          {cdsFiltrados.map((cd) => (
            <CardCD key={cd.idCD} cd={cd} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;