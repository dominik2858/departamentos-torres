const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/torres", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modelo de usuario
const Usuario = mongoose.model("Usuario", {
    usuario: String,
    password: String
});

// Ruta login
app.post("/login", async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const user = await Usuario.findOne({ usuario, password });

        if (user) {
            res.json({ success: true, mensaje: "Login correcto" });
        } else {
            res.json({ success: false, mensaje: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ success: false, mensaje: "Error del servidor" });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});