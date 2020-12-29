/*
  Root: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { fileUpload, obtenerImagen } = require('../controllers/uploads');

const router = Router();
router.use(expressFileUpload());

// ====================================
// Subir archivo
// ====================================
router.put('/:tipo/:id', validarJWT, fileUpload);

// ====================================
// Obtener imagen
// ====================================
router.get('/:tipo/:imagen', validarJWT, obtenerImagen);

module.exports = router;
