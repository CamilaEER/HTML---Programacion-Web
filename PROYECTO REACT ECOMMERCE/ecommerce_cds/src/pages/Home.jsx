import React, { useState, useEffect } from 'react';  // Importa React y los hooks useState y useEffect
import CardCD from '../components/CardCD';  // Importa el componente para mostrar cada CD
import Navbar from '../components/Navbar';  // Importa el componente Navbar
import './Home.css';  // Importa los estilos CSS para la página de inicio

// Componente Home
function Home() {
  // Definir estados locales
  const [cds, setCds] = useState([]);  // Estado para almacenar la lista de CDs
  const [loading, setLoading] = useState(true);  // Estado para controlar el estado de carga
  const [error, setError] = useState(null);  // Estado para manejar errores
  const [generos, setGeneros] = useState([]);  // Estado para almacenar los géneros de CDs
  const [generoSeleccionado, setGeneroSeleccionado] = useState("Todos");  // Estado para controlar el género seleccionado

  // useEffect para cargar los géneros desde la API al iniciar el componente
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/generos');  // Solicitud para obtener géneros
        const data = await response.json();  // Parsear la respuesta JSON
        setGeneros(data);  // Guardar los géneros en el estado
      } catch (error) {
        console.error('Error al cargar los géneros:', error);  // Manejo de errores si la solicitud falla
      }
    };

    fetchGeneros();  // Ejecutar la función para cargar los géneros
  }, []);  // El arreglo vacío asegura que solo se ejecute una vez cuando el componente se monta

  // useEffect para cargar los CDs desde la API al iniciar el componente
  useEffect(() => {
    const fetchCds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cds');  // Solicitud para obtener CDs
        const data = await response.json();  // Parsear la respuesta JSON
        setCds(data);  // Guardar los CDs en el estado
      } catch (err) {
        setError('Hubo un problema al cargar los CDs');  // Mostrar un mensaje de error si la solicitud falla
      } finally {
        setLoading(false);  // Marcar como cargado (ya sea exitoso o con error)
      }
    };

    fetchCds();  // Ejecutar la función para cargar los CDs
  }, []);  // Al igual que el anterior, se ejecuta solo una vez al montar el componente

  // Filtrar los CDs según el género seleccionado
  const cdsFiltrados = generoSeleccionado === "Todos"
    ? cds  // Si el género seleccionado es "Todos", no se filtra
    : cds.filter(cd => cd.GeneroNombre === generoSeleccionado);  // Filtrar por el género seleccionado

  // Mostrar un mensaje mientras los datos están cargando
  if (loading) return <div className="home-container text-center text-white"><h3>Cargando...</h3></div>;

  // Si hay un error en la carga de los CDs, mostrar el error
  if (error) return <div className="home-container text-center text-white"><h3>{error}</h3></div>;

  // Extraer géneros únicos de los CDs para las opciones del filtro
  const generosUnicos = [...new Set(cds.map(cd => cd.GeneroNombre))];

  return (
    <div>
      <Navbar />  {/* Renderiza el componente Navbar */}

      <div className="home-container">  {/* Contenedor principal de la página */}
        <h1 className="home-title">Catálogo de Discos</h1>  {/* Título principal */}

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>  {/* Contenedor para el filtro de género */}
          <label htmlFor="filtro-genero"><strong>Filtrar por género:</strong></label>
          <select
            id="filtro-genero"
            value={generoSeleccionado}  // Valor seleccionado del filtro
            onChange={(e) => setGeneroSeleccionado(e.target.value)}  // Actualiza el estado con el género seleccionado
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="Todos">Todos</option>  {/* Opción para mostrar todos los géneros */}
            {generos.map((genero) => (  // Mapear los géneros y crear opciones para el select
              <option key={genero.idGenero} value={genero.Nombre}>
                {genero.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="card-grid">  {/* Contenedor para mostrar los CDs */}
          {cdsFiltrados.map((cd) => (  // Mapear los CDs filtrados y renderizar un componente CardCD para cada uno
            <CardCD key={cd.idCD} cd={cd} />  // Pasar los datos del CD al componente CardCD
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;  // Exportar el componente para su uso en otras partes de la aplicación
