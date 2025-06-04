import React, { useState } from 'react';  // Importa React y el hook useState para gestionar el estado
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate para redirigir a otras rutas
import { jwtDecode } from 'jwt-decode';  // Importa jwt-decode para decodificar el token JWT
import './AuthPages.css';  // Importa los estilos CSS para la página de autenticación

// Componente de Login
function Login() {
  // Definir los estados locales para correo, contraseña y error
  const [correo, setCorreo] = useState('');  // Estado para el correo del usuario
  const [password, setPassword] = useState('');  // Estado para la contraseña del usuario
  const [error, setError] = useState('');  // Estado para almacenar el mensaje de error (si hay alguno)

  // hook useNavigate para redirigir al usuario a una página después de iniciar sesión
  const navigate = useNavigate();

  // Función que maneja el inicio de sesión cuando se envía el formulario
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevenir que la página se recargue al enviar el formulario
    const user = { correo, password };  // Crear un objeto con los datos del usuario

    try {
      // Hacer la solicitud POST al servidor de Flask para autenticar al usuario
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },  // Establecer el tipo de contenido a JSON
        body: JSON.stringify(user),  // Enviar los datos del usuario como JSON en el cuerpo de la solicitud
      });

      const data = await response.json();  // Parsear la respuesta del servidor a formato JSON
      if (response.status !== 200) {  // Si la respuesta no es exitosa (status 200), mostrar el error
        setError(data.message);  // Establecer el mensaje de error
      } else {
        // Si la autenticación fue exitosa, guardar el token en el almacenamiento local
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);  // Decodificar el token JWT
        localStorage.setItem('idPersona', decoded.idPersona);  // Guardar el id de la persona desde el token
        navigate('/home');  // Redirigir al usuario a la página de inicio
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);  // Mostrar el error en la consola
      setError('Hubo un problema con la conexión');  // Mostrar mensaje de error si ocurre un problema con la conexión
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>  {/* Título del formulario de login */}
        <form onSubmit={handleLogin} className="auth-form">
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}  // Actualizar el estado de correo
            required  // El campo es obligatorio
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Actualizar el estado de la contraseña
            required  // El campo es obligatorio
          />

          {error && <div className="auth-error">{error}</div>}  {/* Si hay un error, mostrarlo */}
          
          <button type="submit" className="auth-btn primary">Entrar</button>  {/* Botón para enviar el formulario */}
        </form>
      </div>
    </div>
  );
}

export default Login;  // Exportar el componente Login para usarlo en otras partes de la aplicación
