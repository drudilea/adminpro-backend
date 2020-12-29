/*
  Root: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const {
  validarJWT,
  validarAdminRole,
} = require('../middlewares/validar-jwt.js');
const {
  getMedicos,
  getMedicoById,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require('../controllers/medicos');

const router = Router();

// ====================================
// Obtener todos los medicos
// ====================================
router.get('/', validarJWT, getMedicos);

// ====================================
// Actualizar medico
// ====================================
router.put(
  '/:id',
  [
    validarJWT,
    validarAdminRole,
    check('nombre', 'El nombre del medico es obligatorio').notEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

// ====================================
// Crear un nuevo medico
// ====================================
router.post(
  '/',
  [
    validarJWT,
    validarAdminRole,
    check('nombre', 'El nombre del medico es obligatorio').notEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos,
  ],
  crearMedico
);

// ====================================
// Eliminar un medico por id
// ====================================
router.delete('/:id', [validarJWT, validarAdminRole], eliminarMedico);

// ====================================
// Obtener un médico por id
// ====================================
router.get('/:id', [validarJWT, validarAdminRole], getMedicoById);

module.exports = router;
