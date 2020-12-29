const { Schema, model } = require('mongoose');

const HospitalSchema = Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    },
  },
  { collection: 'hospitales' }
);

HospitalSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

// Exporto el esquema para poder utilizarlo en otras partes
module.exports = model('Hospital', HospitalSchema);
