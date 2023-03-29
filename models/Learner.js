const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const learnerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  education: {
    level: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
  priorKnowledge: {
    field: {
      type: String,
      required: true,
    },
    courses: {
      type: String,
      required: true,
    },
  },
  interest: {
    type: String,
    required: true,
  },
  workExperience: {
    position: {
      type: String,
    },
    level: {
      type: String,
    },
    employer: {
      type: String,
    },
    years: {
      type: String,
    },
    field: {
      type: String,
    },
  },
  socialMedia: {
    link: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Learner", learnerSchema);
