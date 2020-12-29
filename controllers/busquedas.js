const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, 'i');

  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);
  res.json({
    ok: true,
    usuarios,
    hospitales,
    medicos,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, 'i');

  let data = [];

  switch (tabla) {
    case 'usuarios':
      data = await Usuario.find({ nombre: regex });
      break;

    case 'medicos':
      data = await Medico.find({ nombre: regex })
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');
      break;

    case 'hospitales':
      data = await Hospital.find({ nombre: regex }).populate(
        'usuario',
        'nombre img'
      );
      break;

    default:
      return res.status(400).json({
        ok: false,
        mensaje: 'La tabla especificada no existe',
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
