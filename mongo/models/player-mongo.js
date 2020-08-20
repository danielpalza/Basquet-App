const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  firstName:{ type: String, required: true },
  lastName: { type: String, required: true },
  legajo: { type: String, required: true },
  idCoach:{type: String, required: true}

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const model = mongoose.model('Player', playerSchema);

module.exports = model;
