// Importaciones de librerías
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

// Conexión a la base de datos
const connectDB = require('./src/db/connectiondb');

connectDB()

// Se inicializa la librería 

const app = express();



// Configuraciones
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());

app.use(morgan("combined"));

app.use(express.json());


// Rutas

app.use(require("./src/routes/tasksRoutes"));//ruta de usuarios
app.use(require("./src/routes/usersRoutes"));//ruta de tareas
app.use(require("./src/routes/authenticationRoutes"));//ruta de validacion de usuarios




// Iniciar servidor
app.listen(port, console.log(`Servidor iniciado en: http://localhost:${port}`))
