//const {getLearners} = require("./learner.test") Commented until collection is filled
const bcrypt = require('bcrypt')
const {
  capitalizefLetter,
  validateLastName
} = require('./auth')
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  NumberOfCoursesInYear,
  getAllLearnersTable
} = require('./dashboardAnalytics')
const {
  getCountryLearners,
  getNoOflearner,
  getTotalEnrolledUserCount,
  NoOfMonthlyRegistration
} = require('./learner')
const { usersData } = require('../helpers/dashboard')
const firstNameRegex = /^[A-Za-z][a-z]*$/
const lastNameRegex = /^[A-Za-z][a-z]*( [A-Za-z][a-z]*)?$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+.[a-zA-Z]$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const getDashboard = async (req, res) => {
  // * temporary context object
  const staticData = usersData
  const context = {
    title: 'Dashboard',
    description: 'Dashboard page description',
    user: {
      name: 'Admin Doe',
      email: 'jhonDoe@gmail.com'
    },
    analytics: {
      popularCoursesPie: JSON.stringify(await getPopularCourses()),
      NoOfCoursesList: await NumberOfCoursesInYear(),
      NoOfCountryLearners: await getCountryLearners(),
      NoOfCourses: await getNoOfCourses(),
      NoOflearner: await getNoOflearner(),
      // TotalEnrolledUserCount: await getTotalEnrolledUserCount(), // TODO: fix this function
      TotalEnrolledUserCount: [],
      NoOfMonthlyRegistration: await NoOfMonthlyRegistration(),
      enrolledFinishedCourses: JSON.stringify(await getEnrolledFinished())
    }
  }

  res.render('pages/dashboard/index.ejs', context)
}

const getDashboardCourses = async (req, res) => {
  const context = {
    title: 'All courses',
    data: {
      courses: JSON.stringify(await getAllCoursesTable())
    }
  }

  res.render('pages/dashboard/courses.ejs', context)
}

const getDashboardAdmins = async (req, res) => {
  const context = {
    title: 'All admins',
    admins: []
  }

  res.render('pages/dashboard/admins.ejs', context)
}

const User = require('../models/learner')
const getDashboardLearners = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1
  const pageSize = parseInt(req.query.pageSize) || 2

  try {
    const learnersArray = await getAllLearnersTable(pageNumber, pageSize)
    const count = await User.countDocuments({ status: { $in: [0, 1] } })

    const context = {
      title: 'All learners',
      learners: learnersArray,
      pageCount: Math.ceil(count / pageSize),
      currentPage: pageNumber,
      pageSize: pageSize
    }

    console.log(context.learners[0])
    res.render('pages/dashboard/learners.ejs', { title: 'All Courses', context })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}


const getContentfulDashboard = async (req, res) => {
  // * temporary context object
  const context = {
    title: 'Contentful Dashboard',
    description: 'Contentful Dashboard page description'
  }

  // todo: change to same route in routes => "fix /css path"
  res.render('pages/dashboard_contentful/index.ejs', context)
}

const getContentfulForms = async (req, res) => {
  const context = {
    title: 'Contentful Forms'
  }

  res.render('pages/dashboard_contentful/ui-forms.ejs', context)
}

const getContentfulButtons = async (req, res) => {
  const context = {
    title: 'Contentful buttons'
  }

  res.render('pages/dashboard_contentful/ui-buttons.ejs', context)
}

const getContentfulCards = async (req, res) => {
  const context = {
    title: 'Contentful cards'
  }

  res.render('pages/dashboard_contentful/ui-cards.ejs', context)
}

const getContentfulTypography = async (req, res) => {
  const context = {
    title: 'Typo. cards'
  }

  res.render('pages/dashboard_contentful/ui-typography.ejs', context)
}

const getContentfulIcons = async (req, res) => {
  const context = {
    title: 'Icons. cards'
  }

  res.render('pages/dashboard_contentful/icons-feather.ejs', context)
}
getAddNewLearner = (req, res) =>{
res.render('pages/dashboard/new_learner', { title: 'Add New Learner', error: '' });
}
postAddNewLearner = async (req, res) =>{
  const { firstname, lastname, email, password, confirmPassword } = req.body
  let error = ''

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    error = 'Please fill in all fields'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (!firstNameRegex.test(firstname)) {
    error = 'First name should contain only lowercase form except the first letter'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (!lastNameRegex.test(lastname)) {
    error = 'Last name should contain only lowercase form except the first letters of the words'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  const learnerExists = await User.findOne({ email })
  if (learnerExists) {
    error = 'Email already exists'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (!emailRegex.test(email)) {
    error = 'Invalid email address'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (password !== confirmPassword) {
    error = 'Passwords do not match'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }
  if (!passwordRegex.test(password)) {
    error =
      'Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter'
      res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
      return
  }
  validateLastName(lastname)
  const capitalizedFirstname = capitalizefLetter(firstname)
  const capitalizedLastname = validateLastName(lastname)
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    firstname: capitalizedFirstname,
    lastname: capitalizedLastname,
    email,
    password: hashedPassword,
    createdAt:new Date(),
    status:true
  })
  try {
    await user.save()
    return res.redirect('/dashboard/learners')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }

}

module.exports = {
  getDashboard,
  getContentfulDashboard,
  getDashboardCourses,
  getDashboardAdmins,
  getDashboardLearners,
  getContentfulForms,
  getContentfulButtons,
  getContentfulCards,
  getContentfulTypography,
  getContentfulIcons,
  getAddNewLearner,
  postAddNewLearner
}
