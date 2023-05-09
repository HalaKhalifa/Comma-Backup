const express = require('express')
const router = express.Router()

const cookieParser = require('cookie-parser')
const sessions = require('express-session')

router.use(express.urlencoded({ extended: false }))
router.use(cookieParser())

router.use(
  sessions({
    name: 'sessionId',
    secret: 'Kuy8fuSeYHDfR6dOCwNS6K6sy2QmhSEp',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 15,
      secure: false,
      httpOnly: true
    }
  })
)

const set_session = (req, user_Id) => {
  if (req.session) {
    req.session.user_id = user_Id.toString()
  }
}

const get_session_loggedIn = (req) => {
  if (req.session && req.session.user_id) {
    return req.session.user_id
  } else {
    return null
  }
}

module.exports = {
  router,
  get_session_loggedIn,
  set_session
}
