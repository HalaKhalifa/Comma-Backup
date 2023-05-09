const express = require('express')
const router = express.Router()
const courseController = require('../controllers/pagination')
const isLoggedIn = require('../middleware/isLoggedIn.js.Ftest')

// router.use(isLoggedIn);

router.get('/courses', courseController.paginationResult)

module.exports = router
