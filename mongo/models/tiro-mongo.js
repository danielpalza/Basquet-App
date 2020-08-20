const mongoose = require('mongoose');
const { Schema } = mongoose;

const tiroSchema = new Schema({
  tirador:{ type: String, required: true },
  posicion: { type: String, required: true },
  distanciaM: { type: String, required: true },
  encesto: { type: String, required: true },
  idCoach:{type: String, required: true}

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const model = mongoose.model('Tiro', tiroSchema);

module.exports = model;
