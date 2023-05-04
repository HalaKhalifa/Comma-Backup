const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
//const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//const phoneRegularExpression = /^\+\d{1,3}\s\d{9}$/;
const learnerSchema = new Schema({
  id: {
    type: Number,
  },
  firstName: {
    type: String,
    required: true,
    /*
    validate: {
        validator: function (v) {
          return /^[a-zA-Z\s]+$/.test(v) || /^[\u0621-\u064A\s]+$/.test(v);
        },
        message: 'First name can only contain English letters with a space or Arabic letters with a space',
      },
    */
    
  },
  lastName: {
    type: String,
    required: true,
    /*
    validate: {
        validator: function (v) {
          return /^[a-zA-Z\s]+$/.test(v) || /^[\u0621-\u064A\s]+$/.test(v);
        },
        message: 'Last name can only contain English letters with a space or Arabic letters with a space',
      },*/
    
  },
  dateOfBirth: {
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    /*
    validate: {
      validator: function (v) {
        return emailRegularExpression.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    */ 
    
  },
  password:{
    type: String,
    required: true
  }
  /*
  ,
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return phoneRegularExpression.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number!`,
    },
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
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
  }
  /*/
  
});
/**
 * learnerSchema.pre('save', function (next) {
    const learner = this;
  
    if (!learner.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(learner.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
  
        learner.password = hash;
        next();
      });
    });
  });
  learnerSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return callback(err);
      }
  
      callback(null, isMatch);
    });
  };
 */

module.exports = mongoose.model("Learner", learnerSchema);
