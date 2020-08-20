const mongoose = require('mongoose');
const { Schema } = mongoose;

const coachSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const model = mongoose.model('Coach', userSchema);

module.exports = model ;
