const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    // Borra la imagen anterior
    fs.unlinkSync(path);
  }
};
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = '';
  switch (tipo) {
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('No existe un usuario para este id');
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;

    case 'medicos':
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log('No existe un medico para este id');
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;

    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('No existe un hospital para este id');
        return false;
      }

      pathViejo = `./uploads/hospitals/${hospital.img}`;
      borrarImagen(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;

    default:
      return res.status(400).json({
        ok: false,
        mensaje: 'La tabla especificada no existe',
      });
  }
};

module.exports = {
  actualizarImagen,
};
