const express = require('express')
const router = express.Router()

const auth_controllers = require('../controllers/auth')

router.get('/login', auth_controllers.get_login)

router.post('/login', auth_controllers.post_login)

module.exports = router
