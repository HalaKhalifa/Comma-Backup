const User = require('../models/user')

const { set_session, get_session_loggedIn } = require('../middleware/sessionMiddleWare')

const bcrypt = require('bcrypt')

const get_login = (req, res) => {
  res.render('login', { title: 'login', error: false })
}

const post_login = async (req, res) => {
  if (get_session_loggedIn(req)) {
    return res.redirect('home')
  }
  let email = req.body.email
  console.log(username)
  const user = await User.findOne({ email })

  console.log('dfg')
  console.log(user, 'form post')
  console.log(user._id)

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const passwordsMatch = await bcrypt.compare(hashedPassword, user.password)

  if (user.email === email && passwordsMatch) {
    await set_session(req, user._id)

    res.redirect('home')
  } else {
    res.render('login', { title: 'login', error: true })
  }
}

module.exports = {
  get_login,
  post_login
}
