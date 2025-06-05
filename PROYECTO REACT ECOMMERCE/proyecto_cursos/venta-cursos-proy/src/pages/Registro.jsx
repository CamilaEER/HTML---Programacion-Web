// Importa React y el hook useState para manejar el estado local
import React, { useState } from 'react';
// Importa useNavigate para redirigir al usuario después del registro
import { useNavigate } from 'react-router-dom';
// Importa el archivo de estilos CSS para el formulario
import './AuthForms.css';

function Registro() {
  // Definición de estados para cada campo del formulario y para errores
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hook para navegar entre rutas (redireccionar)
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      // Envío de solicitud POST al backend con los datos del formulario
      const res = await fetch('http://localhost:5000/registro', {
        method: 'POST', // Método HTTP
        headers: { 'Content-Type': 'application/json' }, // Tipo de contenido
        body: JSON.stringify({ nombre, correo, password }), // Cuerpo con datos en formato JSON
      });

      // Se obtiene la respuesta del servidor
      const data = await res.json();

      if (!res.ok) {
        // Si la respuesta no fue exitosa, se muestra el mensaje de error
        setError(data.message || 'Error al registrar');
      } else {
        // Si fue exitoso, muestra un alert y redirige al login
        alert('Usuario registrado con éxito');
        navigate('/login'); // Redirige al componente de login
      }
    } catch {
      // Si ocurre un error de conexión
      setError('Error en la conexión al servidor');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      {/* Formulario controlado que ejecuta handleSubmit al enviarse */}
      <form onSubmit={handleSubmit}>
        {/* Campo para nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        {/* Campo para correo */}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
        {/* Campo para contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {/* Botón para enviar el formulario */}
        <button type="submit">Registrarse</button>
      </form>
      {/* Muestra el mensaje de error si existe */}
      {error && <p>{error}</p>}
    </div>
  );
}

// Exporta el componente para poder usarlo en otras partes de la aplicación
export default Registro;
