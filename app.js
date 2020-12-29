// Requires (importacion de librerias)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Inicializar variables
var app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Conexion a la base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

// Escuchar peticiones en un puerto determinado
app.listen(process.env.PORT, () => {
  // Agrego color a la palabra para diferenciarlas
  console.log(`Express server puerto ${process.env.PORT}: online`);
});
