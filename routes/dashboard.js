const express = require('express')
const router = express.Router()

const { getDashboard } = require('../controllers/dashboard')
const { updateLearner, getLearners } = require('../controllers/learner.test')
router.get('/', (req, res) => {
  getDashboard(req, res)
})
router.post('/update-learners-data', async (req, res) => {
  await updateLearner(req, res)
})
router.post('/getLearnersData', async (req, res) => {
  await getLearners(req, res)
})

module.exports = router
