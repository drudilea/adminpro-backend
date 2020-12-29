const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res, next) => {
  const hospitales = await Hospital.find().populate('usuario', 'nombre img');
  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un hospital con ese id',
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    // Actualizo el hospital en la base de datos
    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

const eliminarHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un hospital con ese id',
      });
    }

    // Elimino el hospital de la base de datos
    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      mensaje: 'El hospital ha sido eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
};
