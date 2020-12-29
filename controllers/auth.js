const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getSidebarFrontend } = require('../helpers/sidebar-frontend');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Validar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Email o contraseña inválida',
      });
    }

    // Validar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Email o contraseña inválida',
      });
    }

    // Generar token
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
      menu: getSidebarFrontend(usuarioDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revise los logs',
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    // Verifica si existe un usuario con el mismo email
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      // No existe usuario
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      });
    } else {
      // Si existe el usuario, dejo la doble autenticacion
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Guardo en DB
    await usuario.save();

    // Generar token
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token,
      menu: getSidebarFrontend(usuario.role),
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'El token no es correcto',
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar token
  const token = await generarJWT(uid);

  try {
    // Obtener usuario asociado
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No existe un usuario con este id',
      });
    }

    res.json({
      ok: true,
      token,
      usuario,
      menu: getSidebarFrontend(usuario.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revise los logs',
    });
  }
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
