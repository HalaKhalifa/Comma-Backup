const mongoose = require('mongoose')
const Schema = mongoose.Schema
const learnerSchema = new Schema({
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
  dob: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  educationLevel: {
    type: String,
    required: false
  },
  major: {
    type: String,
    required: false
  },
  finishedCourses: {
    type: Number,
    required: false
  },
  graduationYear: {
    type: String,
    required: false
  },

  phoneNumber: {
    type: String,
    required: false
  },
  preferredCommunication: {
    type: String,
    required: false,
    enum:['email','phone','social media','other']
  },
  socialMedia: {
    type: String,
    required: false
  },
  timeAvailability: {
    type: String,
    required: false
  },
  currentOccupation: {
    type: String,
    required: false
  },
  professionalBackground: {
    type: String,
    required: false
  },
  careerGoals: {
    type: String,
    required: false
  },
  interests: {
    type: String,
    required: false
  },
  learningGoals: {
    type: String,
    required: false
  },
  softSkills: {
    type: String,
    required: false
  },
  hardSkills: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('LearnerSchema', learnerSchema)
