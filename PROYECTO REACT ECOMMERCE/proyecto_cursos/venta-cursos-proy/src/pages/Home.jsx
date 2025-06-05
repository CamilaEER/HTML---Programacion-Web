// Componente funcional Home
export default function Home() {
  return (
    <div>
      {/* Barra de navegación en la parte superior */}
      <Navbar />

      {/* Contenedor principal del catálogo */}
      <div className="home-container">
        <h1>Catálogo de Cursos</h1>

        {/* Grid para mostrar todos los cursos */}
        <div className="cursos-grid">
          {cursos.map((curso) => (
            // Tarjeta individual por curso
            <div key={curso.id} className="curso-card">
              <h3>{curso.titulo}</h3>
              <p>{curso.descripcion}</p>
              {/* Botón para ver más detalles del curso */}
              <Link to={`/curso/${curso.id}`}>
                <button>Ver Detalle</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
