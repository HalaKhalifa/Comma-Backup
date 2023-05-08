const User = require('../models/learner')

const { set_session, get_session_loggedIn } = require('../middleware/sessionMiddleWare')

const bcrypt = require('bcrypt')

const get_login = (req, res) => {
  res.render('login', { title: 'login', error: '' })
}

const post_login = async (req, res) => {
  if (get_session_loggedIn(req)) {
    return res.redirect('home')
  }
  let email = req.body.email
  let password = req.body.password

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

  // const salt = await bcrypt.genSalt(10)

  if (!emailRegex.test(email)) {
    let error = 'Invalid email address'
    res.render('login', { title: 'login in', error })
    return
  }

  if (!passwordRegex.test(password)) {
    let error = 'Password and Email did not match'
    res.render('login', { title: 'login in', error })
    return
  }

  const user = await User.findOne({ email })

  if (!user) {
    let error = 'Password and Email did not match'
    res.render('login', { title: 'login in', error })
    return
  }

  console.log('dfg')
  console.log(user, 'form post')

  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (user.email === email && passwordsMatch) {
    await set_session(req, user._id)

    res.redirect('home')
  } else {
    let error = 'Password and Email did not match'
    res.render('login', { title: 'login', error })
  }
}

module.exports = {
  get_login,
  post_login
}
