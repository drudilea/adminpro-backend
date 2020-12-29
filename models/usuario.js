const { Schema, model } = require('mongoose');

var rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol permitido',
};

const UsuarioSchema = Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario'],
  },
  password: { type: String, required: [true, 'La contraseña es necesaria'] },
  img: { type: String, required: false },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: rolesValidos,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// UsuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

// Exporto el esquema para poder utilizarlo en otras partes
module.exports = model('Usuario', UsuarioSchema);
