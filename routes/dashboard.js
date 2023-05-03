const express = require('express')
const router = express.Router()

const { getDashboard } = require('../controllers/dashboard')

router.get('/', (req, res) => {
  getDashboard;
})

module.exports = router
