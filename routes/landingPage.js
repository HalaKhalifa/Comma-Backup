const express = require('express')
const router = express.Router()

// Set up landing page route
router.get('/', async (req, res) => {
  res.render('landingPage')
})

module.exports = router
