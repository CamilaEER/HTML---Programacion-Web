// Importa React para poder usar JSX y crear componentes
import React from 'react';
// Importa Link para navegar entre páginas sin recargar el navegador
import { Link } from 'react-router-dom';
// Importa los estilos específicos de esta página
import './LandingPage.css';

function LandingPage() {
  return (
    // Contenedor principal con clase CSS para estilos personalizados
    <div className="landing-container">
      {/* Título principal de bienvenida */}
      <h1 className="landing-title">Bienvenido a Venta de Cursos</h1>
      
      {/* Subtítulo o mensaje de instrucción */}
      <p className="landing-text">Accede o crea una cuenta para continuar</p>

      {/* Contenedor de botones de navegación */}
      <div>
        {/* Botón que redirige a la página de login */}
        <Link to="/login">
          <button className="landing-button">Iniciar Sesión</button>
        </Link>

        {/* Botón que redirige a la página de registro */}
        <Link to="/registro">
          <button className="landing-button">Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

// Exporta el componente para que pueda ser usado en otras partes del proyecto
export default LandingPage;
