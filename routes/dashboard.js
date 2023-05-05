const express = require('express')
const router = express.Router()

const { getDashboard } = require('../controllers/dashboard')
const { updateLearner, getLearners } = require('../controllers/learner.test')

router.get('/', (req, res) => {
  getDashboard(req, res)
})
router.post('/', async (req, res) => {
  await updateLearner(req, res)
})
router.post('/getLearnersData', async (req, res) => {
  let data = await getLearners(req, res)
  res.status(200).json(data)
})
module.exports = router
