const express = require('express')
const router = express.Router()

const { getContentfulDashboard } = require('../controllers/dashboard')

router.get('/', (req, res) => {
  getContentfulDashboard(req, res)
})

module.exports = router
