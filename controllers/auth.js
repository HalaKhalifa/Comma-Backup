const User = require('../models/learner')
const { set_session, get_session_loggedIn } = require('../middleware/sessionMiddleWare')
const bcrypt = require('bcrypt')

const get_signup = (req, res) => {
  res.render('pages/learner/signup', { title: 'Sign Up', error: '' })
}

function capitalizefLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const nameRegex = /^[a-z]+$/

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+.[a-zA-Z]$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const post_signup = async (req, res) => {
  console.log(req.body)
  const { firstname, lastname, email, password, confirmPassword } = req.body
  let error = ''

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    error = 'Please fill in all fields'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (!nameRegex.test(firstname)) {
    error = 'First name should contain only lowercase letters'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (!nameRegex.test(lastname)) {
    error = 'Last name should contain only lowercase letters'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  const learnerExists = await User.findOne({ email })
  if (learnerExists) {
    error = 'Email already exists'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (!emailRegex.test(email)) {
    error = 'Invalid email address'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (password !== confirmPassword) {
    error = 'Passwords do not match'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }
  if (!passwordRegex.test(password)) {
    error =
      'Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }
  const capitalizedFirstname = capitalizefLetter(firstname)
  const capitalizedLastname = capitalizefLetter(lastname)
  const hashedPassword = await bcrypt.hash(password, 10)

  const learner = new User({
    firstname: capitalizedFirstname,
    lastname: capitalizedLastname,
    email,
    password: hashedPassword
  })
  console.log(learner)
  try {
    await learner.save()
    //   res.status(201).json({ message: 'Learner created successfully' });
    return res.redirect('/login')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
}

const get_login = (req, res) => {
  res.render('pages/learner/login', { title: 'login', error: '' })
}

const post_login = async (req, res) => {
  if (get_session_loggedIn(req)) {
    return res.redirect('home')
  }
  let email = req.body.email
  let password = req.body.password

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+.[a-zA-Z]$/
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  // const salt = await bcrypt.genSalt(10)

  if (!emailRegex.test(email)) {
    let error = 'Invalid email address'
    res.render('pages/learner/login', { title: 'login in', error })
    return
  }

  if (!passwordRegex.test(password)) {
    let error = 'Password and Email did not match'
    res.render('pages/learner/login', { title: 'login in', error })
    return
  }

  const user = await User.findOne({ email })

  if (!user) {
    let error = 'Password and Email did not match'
    res.render('pages/learner/login', { title: 'login in', error })
    return
  }

  console.log('dfg')
  console.log(user, 'form post')

  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (user.email === email && passwordsMatch) {
    await set_session(req, user._id)
    console.log(user._id)
    res.redirect('/profile')
  } else {
    let error = 'Password and Email did not match'
    res.render('pages/learner/login', { title: 'login', error })
  }
}

module.exports = {
  get_login,
  post_login,
  get_signup,
  post_signup
}