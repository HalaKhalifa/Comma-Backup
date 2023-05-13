const express = require('express')
const router = express.Router()

const preferencesController = require('../controllers/preference')

router.post('/outline', preferencesController.post_preferences)

module.exports = router
