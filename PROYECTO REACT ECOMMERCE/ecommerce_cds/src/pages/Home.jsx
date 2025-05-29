import React, { useState, useEffect } from 'react';
import CardCD from '../components/CardCD';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
  const [cds, setCds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="home-container text-center text-white"><h3>Cargando...</h3></div>;
  if (error) return <div className="home-container text-center text-white"><h3>{error}</h3></div>;

  return (
    <div>
      <Navbar /> 
      <div className="home-container">
        <h1 className="home-title">Catálogo de Discos</h1>
        <div className="card-grid">
          {cds.map((cd) => (
            <CardCD key={cd.idCD} cd={cd} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
