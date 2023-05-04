const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true, default: false }
});

const Learner = mongoose.model('Learner', learnerSchema);

module.exports = Learner;