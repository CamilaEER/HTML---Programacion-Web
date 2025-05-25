const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1212313',  // Cambia esto con tu propia contraseña de MySQL
  database: 'EcommerceCDs',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos exitosa');
});

// Ruta para hacer login
app.post('/login', (req, res) => {
  const { correo, password } = req.body;

  const query = 'SELECT * FROM Persona WHERE Correo = ?';
  db.query(query, [correo], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error de servidor' });

    if (result.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = result[0];

    // Compara las contraseñas usando bcrypt
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error de servidor' });

      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Generar un token JWT
      const token = jwt.sign({ idPersona: user.idPersona }, 'secreta', { expiresIn: '1h' });

      return res.json({ token });
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// En server.js, agrega la ruta para el registro de usuarios
app.post('/registro', (req, res) => {
  const { nombre, edad, correo, password } = req.body;

  // Verificar si el correo ya existe en la base de datos
  const checkEmailQuery = 'SELECT * FROM Persona WHERE Correo = ?';
  db.query(checkEmailQuery, [correo], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error de servidor' });

    if (result.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña con bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error al encriptar la contraseña' });

      // Insertar el nuevo usuario en la base de datos
      const insertQuery = 'INSERT INTO Persona (Nombre, Edad, Correo, Password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [nombre, edad, correo, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error de servidor' });

        return res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  });
});
