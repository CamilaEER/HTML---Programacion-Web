import React, { useState } from 'react';  // Importa React y useState para manejar el estado de los inputs
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para redirigir al usuario
import './AuthPages.css';  // Importa los estilos CSS para la página de autenticación

// Componente de Registro
function Registro() {
  // Definir estados locales para nombre, edad, correo, contraseña y error
  const [nombre, setNombre] = useState('');  // Estado para el nombre del usuario
  const [edad, setEdad] = useState('');  // Estado para la edad del usuario
  const [correo, setCorreo] = useState('');  // Estado para el correo del usuario
  const [password, setPassword] = useState('');  // Estado para la contraseña del usuario
  const [error, setError] = useState('');  // Estado para el mensaje de error (si hay alguno)

  // hook useNavigate para redirigir al usuario a otra página después del registro
  const navigate = useNavigate();

  // Función que maneja el proceso de registro cuando se envía el formulario
  const handleRegister = async (e) => {
    e.preventDefault();  // Prevenir la recarga de la página al enviar el formulario
    const user = { nombre, edad, correo, password };  // Crear un objeto con los datos del usuario

    try {
      // Hacer la solicitud POST al servidor para registrar al usuario
      const response = await fetch('http://localhost:5000/registro', {
        method: 'POST',  // Método de la solicitud es POST
        headers: { 'Content-Type': 'application/json' },  // Establece el tipo de contenido a JSON
        body: JSON.stringify(user),  // Enviar los datos del usuario como JSON
      });

      const data = await response.json();  // Parsear la respuesta del servidor

      // Verificar si el registro fue exitoso (código 201) o mostrar error
      if (response.status !== 201) {
        setError(data.message);  // Establecer el mensaje de error
      } else {
        // Si la respuesta es exitosa, redirigir al usuario a la página de login
        navigate('/login');
      }
    } catch (err) {
      console.error('Error al registrar el usuario:', err);  // Mostrar error en la consola
      setError('Hubo un problema con la conexión');  // Mostrar mensaje de error si hay problemas con la conexión
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Registro</h2>  {/* Título del formulario de registro */}
        <form onSubmit={handleRegister} className="auth-form">  {/* Formularios para capturar los datos del usuario */}
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}  // Actualizar el estado de nombre
            required  // Campo obligatorio
          />

          <label>Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}  // Actualizar el estado de edad
            required  // Campo obligatorio
          />

          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}  // Actualizar el estado de correo
            required  // Campo obligatorio
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Actualizar el estado de la contraseña
            required  // Campo obligatorio
          />

          {error && <div className="auth-error">{error}</div>}  {/* Mostrar error si hay algún mensaje */}

          {/* Botón para enviar el formulario de registro */}
          <button type="submit" className="auth-btn secondary">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;  // Exporta el componente para usarlo en otras partes de la aplicación
