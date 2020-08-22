const mongoose = require("mongoose")
const dotenv = require('dotenv'); 

//Carga de datos de conexion a la base
mongoose.set('useFindAndModify', false)
        .set('useCreateIndex', true);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Mongodb');
  })
  .catch(error => {
    console.log(`mongodb error: ${error}`);
  });

  module.exports = mongoose;