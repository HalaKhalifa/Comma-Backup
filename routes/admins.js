const express = require('express')
const router = express.Router()

const { getAllAdmins, post_Newadmin } = require('../controllers/admin')

router.get('/admins', (req, res) => {
  getAllAdmins(req, res)
})

module.exports = router
