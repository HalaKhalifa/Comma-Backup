const express = require('express')
const router = express.Router()

const { getAllAdmins } = require('../controllers/admin')

router.get('/admins', (req, res) => {
  getAllAdmins(req, res)
})

module.exports = router
