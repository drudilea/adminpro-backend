const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  // Validar tipo
  const tiposValidos = ['usuarios', 'medicos', 'hospitales'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No es un tipo válido',
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No hay ningún archivo',
    });
  }

  // Procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split('.');
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No es una extensión válida',
    });
  }

  // Crear nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar el archivo
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al mover la imagen',
      });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      mensaje: 'Archivo subido',
      nombreArchivo,
    });
  });
};

const obtenerImagen = async (req, res = response) => {
  const tipo = req.params.tipo;
  const imagen = req.params.imagen;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

  // Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = { fileUpload, obtenerImagen };
