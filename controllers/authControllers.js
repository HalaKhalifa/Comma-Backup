// const User = require("../models/user");

const { set_session, get_session_loggedIn } = require('../middleware/sessionMiddleWare')

const bcrypt = require('bcrypt')

const get_login = (req, res) => {
  res.render('login', { title: 'login' })
}

const post_login = async (req, res) => {
  if (get_session_loggedIn(req)) {
    return res.redirect('home')
  }

  let username = req.body.username

  console.log(username)

  const user = await User.findOne({ username })

  console.log('dfg')
  console.log(user, 'form post')
  console.log(user._id)

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const passwordsMatch = await bcrypt.compare(hashedPassword, user.password)

  if (user.username === username && passwordsMatch) {
    await set_session(req, user._id)

    res.redirect('home')
  } else {
    res.render('login', { title: 'login' })
  }
}

module.exports = {
  get_login,
  post_login
}
