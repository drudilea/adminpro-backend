var mongoose = require('mongoose');

const dbConnection = async () => {
  // Conexion a la base de datos

  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Base de datos \x1b[32m%s\x1b[0m', 'online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la DB, ver logs');
  }
};

module.exports = {
  dbConnection,
};
