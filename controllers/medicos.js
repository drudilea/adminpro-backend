const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res, next) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');
  res.json({
    ok: true,
    medicos,
  });
};

const getMedicoById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id)
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');
    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      mensaje: 'Medico no encontrado',
    });
  }
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  const hid = req.body.hospital;

  try {
    const medicoDB = await Medico.findById(id);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un médico con ese id',
      });
    }

    const hospitalDB = await Hospital.findById(hid);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un hospital con ese id',
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    // Actualizo el medico en la base de datos
    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

const eliminarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un médico con ese id',
      });
    }

    // Elimino el médico de la base de datos
    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      mensaje: 'El médico ha sido eliminado correctamente',
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
  getMedicos,
  getMedicoById,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
