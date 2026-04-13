const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/departamentos-torres");

// Modelo de usuario
const Usuario = mongoose.model("Usuario", {
  usuario: String,
  password: String,
  token: String,       // aquí guardas la sesión
  tokenExpira: Date    // opcional (expiración)
});
// Ruta login
app.post("/login", async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const user = await Usuario.findOne({ usuario, password });

        if (user) {
            const token = crypto.randomBytes(32).toString("hex");
            const expira = new Date(Date.now() + 10 * 60 * 1000);
            user.token = token;
            user.tokenExpira = expira;
            await user.save();
            res.json({ success: true, mensaje: "Login correcto", token: token });
        } else {
            res.json({ success: false, mensaje: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ success: false, mensaje: "Error del servidor" });
    }
});

app.post("/renov", async (req, res) => {
    const { usuario, token } = req.body;

    try {
        const user = await Usuario.findOne({ usuario, token });

        if (user) {
            const expira = new Date(Date.now() + 10 * 60 * 1000);
            user.tokenExpira = expira;
            await user.save();
            res.json({ success: true, ERRmsg:""});
        } else {
            res.json({ success: false, ERRmsg: "Error al encontrar usuario" });
        }
    } catch (error) {
        res.status(500).json({ success: false, mensaje: "Error del servidor" });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});