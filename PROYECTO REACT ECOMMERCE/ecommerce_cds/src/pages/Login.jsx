// src/pages/Login.jsx
import React from 'react';

function Login() {
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
