// Importa React y el hook useState para manejar estados locales
import React, { useState } from 'react';
// Importa useNavigate para redireccionar al usuario después del login
import { useNavigate } from 'react-router-dom';
// Importa los estilos CSS específicos para los formularios de autenticación
import './AuthForms.css';

function Login() {
  // Estado para el campo de correo electrónico
  const [correo, setCorreo] = useState('');
  // Estado para el campo de contraseña
  const [password, setPassword] = useState('');
  // Estado para mostrar errores al usuario
  const [error, setError] = useState('');
  // Hook para redireccionar a otras rutas
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    try {
      // Realiza una petición POST al servidor con los datos del formulario
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }), // Convierte los datos a JSON
      });

      // Espera la respuesta del servidor y la convierte en JSON
      const data = await res.json();

      if (!res.ok) {
        // Si la respuesta no es exitosa, muestra el mensaje de error
        setError(data.message || 'Error al iniciar sesión');
      } else {
        // Si la autenticación es correcta, guarda el token en localStorage
        localStorage.setItem('token', data.token);
        // Redirige al usuario a la página de inicio
        navigate('/home');
      }
    } catch {
      // Si ocurre un error de red o del servidor, se muestra un mensaje
      setError('Error en la conexión al servidor');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo de correo electrónico */}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {/* Botón de envío */}
        <button type="submit">Entrar</button>
      </form>
      {/* Si hay un error, se muestra debajo del formulario */}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
