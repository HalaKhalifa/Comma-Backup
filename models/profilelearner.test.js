const mongoose = require('mongoose');
const testLearnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
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
    type: Number,
    required: false
  },
  emailAddress: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  preferredCommunication: {
    type: String,
    required: false
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
});

module.exports = mongoose.model('Profileleaner', testLearnerSchema);