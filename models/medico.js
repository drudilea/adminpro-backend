const { Schema, model } = require('mongoose');

const MedicoSchema = Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
  },
  { collection: 'medicos' }
);

MedicoSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

// Exporto el esquema para poder utilizarlo en otras partes
module.exports = model('Medico', MedicoSchema);
