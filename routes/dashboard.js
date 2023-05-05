const express = require('express')
const router = express.Router()

const { getDashboard } = require('../controllers/dashboard')
const { updateLearner } = require('../controllers/learner.test')

router.get('/', (req, res) => {
  getDashboard(req, res)
})
router.post('/', async (req, res) => {
  await updateLearner(req, res)
})
router.post('/getLearnersData', (req, res) => {
  const data = req.body
  console.log(data)
})
module.exports = router
