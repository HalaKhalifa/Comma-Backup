const mongoose = require('mongoose');
const testLearnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  finishedCourses: {
    type: Number,
    required: true
  },
  graduationYear: {
    type: Number,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  preferredCommunication: {
    type: String,
    required: true
  },
  socialMedia: {
    type: String,
    required: true
  },
  timeAvailability: {
    type: String,
    required: true
  },
  currentOccupation: {
    type: String,
    required: true
  },
  professionalBackground: {
    type: String,
    required: true
  },
  careerGoals: {
    type: String,
    required: true
  },
  interests: {
    type: String,
    required: true
  },
  learningGoals: {
    type: String,
    required: true
  },
  softSkills: {
    type: String,
    required: true
  },
  hardSkills: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('profileleaner', testLearnerSchema);
