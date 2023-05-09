const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
router.get('/profile', profileController.profileController)
router.post('/profile', profileController.profileControllerPost)
module.exports = router
