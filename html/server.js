const express = require("express");
const connection = require("./db");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
app.use(cors()); // Habilita CORS para todas las solicitudes

app.use(express.json()); // Permitir JSON en las solicitudes

// Ruta para obtener usuarios
app.get("/usuarios", (req, res) => {
    connection.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Ruta para insertar un usuario
app.post("/usuarios", async (req, res) => {
    const { Nombre, Edad, Correo, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10); // Hashing de contraseña

    connection.query("INSERT INTO usuarios (Nombre, Edad, Correo, Password) VALUES (?, ?, ?, ?)", 
    [Nombre, Edad, Correo, hashedPassword], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send("Usuario registrado correctamente");
    });
});


// Ruta para login
app.post("/login", (req, res) => {
    const { Correo, Contraseña } = req.body;

    connection.query("SELECT * FROM usuarios WHERE Correo = ?", [Correo], async (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error en el servidor" });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ success: false, message: "Usuario no encontrado" });
            return;
        }

        const usuario = results[0];
        const contraseñaValida = await bcrypt.compare(Contraseña, usuario.Password);

        if (!contraseñaValida) {
            res.status(401).json({ success: false, message: "Contraseña incorrecta" });
            return;
        }

        res.json({ success: true, message: "Inicio de sesión exitoso" });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});


