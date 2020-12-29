/*
  Root: /api/login
*/

const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
  '/',
  [
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  login
);

router.post(
  '/google',
  [
    check('token', 'El token de Google es obligatorio').notEmpty(),
    validarCampos,
  ],
  googleSignIn
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
