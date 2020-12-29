const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'No hay token en la peticion',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token incorrecto',
    });
  }
};

const validarAdminRole = async (req, res, next) => {
  const uid = req.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no existe',
      });
    }

    if (usuarioDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        mensaje: 'No tiene privilegios suficientes',
      });
    }

    next();
  } catch (error) {
    console.log('Error al validar rol', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado al validar rol... Revise los logs',
    });
  }
};

const validarAdminRoleMismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no existe',
      });
    }

    if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        mensaje: 'No tiene privilegios suficientes',
      });
    }
  } catch (error) {
    console.log('Error al validar rol', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado al validar rol... Revise los logs',
    });
  }
};

module.exports = {
  validarJWT,
  validarAdminRole,
  validarAdminRoleMismoUsuario,
};
