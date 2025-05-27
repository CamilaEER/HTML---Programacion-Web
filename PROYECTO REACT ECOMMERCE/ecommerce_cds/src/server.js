const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());  // Permite todas las solicitudes CORS

app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'D@vid2003',  // Cambia esto con tu propia contraseña de MySQL
  database: 'EcommerceCDs',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos exitosa');
});

// Ruta para login
app.post('/login', (req, res) => {
  const { correo, password } = req.body;

  const query = 'SELECT * FROM Persona WHERE Correo = ?';
  db.query(query, [correo], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error de servidor' });

    if (result.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = result[0];

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error de servidor' });

      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Si la contraseña es correcta, generar un token JWT
      const token = jwt.sign({ idPersona: user.idPersona }, 'secreta', { expiresIn: '1h' });

      return res.json({ token });
    });
  });
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Ruta para registro
app.post('/registro', (req, res) => {
  const { nombre, edad, correo, password } = req.body;

  // Verificar si el correo ya está registrado
  const checkEmailQuery = 'SELECT * FROM Persona WHERE Correo = ?';
  db.query(checkEmailQuery, [correo], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error de servidor' });

    if (result.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error al encriptar la contraseña' });

      // Insertar el nuevo usuario en la base de datos con la contraseña encriptada
      const insertQuery = 'INSERT INTO Persona (Nombre, Edad, Correo, Password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [nombre, edad, correo, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error de servidor' });

        return res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  });
});


// server.js (Backend)
app.get('/api/cds', (req, res) => {
  const query = `
    SELECT CDs.*, Artistas.Nombre AS ArtistaNombre
    FROM CDs
    JOIN Artistas ON CDs.idArtista = Artistas.idArtista
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener los CDs:', err);
      return res.status(500).json({ message: 'Error al obtener los CDs' });
    }
    res.json(result); // Devolver los CDs con el nombre del artista
  });
});

// Ruta para obtener un CD específico por su ID
app.get('/api/cds/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT CDs.*, Artistas.Nombre AS ArtistaNombre
    FROM CDs
    JOIN Artistas ON CDs.idArtista = Artistas.idArtista
    WHERE CDs.idCD = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener el CD:', err);
      return res.status(500).json({ message: 'Error al obtener el CD' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'CD no encontrado' });
    }

    res.json(result[0]); // Devuelve un solo CD
  });
});
