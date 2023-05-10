const mongoose = require('mongoose')

const Schema = mongoose.Schema
const adminSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Admin', adminSchema)
