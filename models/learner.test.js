const mongoose = require('mongoose')

const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true }
})

const Learner = mongoose.model('Learner', learnerSchema)

module.exports = Learner
