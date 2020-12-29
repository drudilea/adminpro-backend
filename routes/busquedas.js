/*
  Root: /api/todo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

// ====================================
// Obtener todo
// ====================================
router.get('/:busqueda', validarJWT, getTodo);

// ====================================
// Obtener todo de una coleccion especifica
// ====================================
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;
