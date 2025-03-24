const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar conexión con MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia según tu usuario de MySQL
    password: '1212313',  // Cambia si tienes contraseña
    database: 'bdprueba'
});

// Conectar a MySQL
db.connect(err => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Ruta para insertar datos
app.post('/registrar', (req, res) => {
    const { nombre, Edad } = req.body;
    const sql = 'INSERT INTO personas (Nombre, Edad) VALUES (?, ?)';
    
    db.query(sql, [nombre, Edad], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.send('Usuario registrado correctamente');
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
