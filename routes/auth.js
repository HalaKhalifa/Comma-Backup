const express = require('express')
const router = express.Router()

const { get_login, get_signup, post_login, post_signup } = require('../controllers/auth')

router.get('/login', get_login)
router.post('/login', post_login)
router.get('/signup', get_signup)
router.post('/signup', post_signup)
router.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
})
module.exports = router
