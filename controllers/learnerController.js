const Learner = require('../models/Learner');
const mongoose  = require('mongoose');

exports.createLearner = async (req, res) => {
    try {
      const learner = new Learner({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
  
      await user.save();
  
      res.status(201).send({ message: 'Learner created' });
    } catch (error) {
      res.status(400).send(error);
    }
  };