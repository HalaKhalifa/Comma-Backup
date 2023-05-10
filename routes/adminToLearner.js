const express = require('express')
const router = express.Router()
const get_learner_data = require('../controllers/AdminToLearnerController')

router.get('/adminLearner', get_learner_data)

module.exports = router
