const bcrypt = require('bcrypt')
const User = require('../models/learner')
const { capitalizefLetter, validateLastName } = require('./auth')
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  NumberOfCoursesInYear,
  getAllLearnerActive,
  adminUpdateLearner,
  getTop10EnrolledCourses
} = require('./dashboardAnalytics')

const {
  getCountryLearners,
  getNoOflearner,
  getNoOfMonthlyRegistration,
  getNoOfviewers,
  getTotalEnrolledUserCount
} = require('./learner')

const { usersData } = require('../helpers/dashboard')
const { getCourses } = require('./courses')

const Course = require('../models/course')

const firstNameRegex = /^[A-Za-z][a-z]*$/
const lastNameRegex = /^[A-Za-z][a-z]*( [A-Za-z][a-z]*)?$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+\.[a-zA-Z]+$/
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
      NoOfMonthlyRegistration: await getNoOfMonthlyRegistration(),
      enrolledFinishedCourses: JSON.stringify(await getEnrolledFinished()),
      TotalEnrolledUserCount: await getTotalEnrolledUserCount(),
      Noofviewers: await getNoOfviewers(),
      Top10Enrolledcourses: await getTop10EnrolledCourses()
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
  console.log(context)
  res.render('pages/dashboard/courses.ejs', context)
}

const getDashboardAdmins = async (req, res) => {
  const context = {
    title: 'All admins',
    admins: []
  }

  res.render('pages/dashboard/admins.ejs', context)
}

const getDashboardLearners = async (req, res) => {
  res.render('pages/dashboard/learners.ejs', { title: 'All Learners' })
}

const getLearner = async (req, res) => {
  try {
    const { offset = 0, limit = 0, search = '' } = req.query
    const queryData = { status: { $in: [1] } }

    if (search) {
      queryData.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    const { learners, count } = await getAllLearnerActive(queryData, offset, limit)
    res.status(200).json({ learners, count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

const getContentfulDashboard = async (req, res) => {
  // * temporary context object
  const context = {
    title: 'Contentful Dashboard',
    description: 'Contentful Dashboard page description'
  }

  res.render('pages/dashboard_contentful/index.ejs', context)
}
const softDeleted = async (courseId) => {
  try {
    const course = await Course.findOne({ title: courseId })
    console.log(courseId)
    if (!course) {
      throw new Error('course not found')
    }
    course.isDeleted = true
    await course.save()
  } catch (error) {
    throw error
  }
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
const getAddNewLearner = (req, res) => {
  res.render('pages/dashboard/new_learner', { title: 'Add New Learner', error: '' })
}
const postAddNewLearner = async (req, res) => {
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
    createdAt: new Date(),
    isDeleted: false,
    status: true
  })
  try {
    await user.save()
    return res.redirect('/dashboard/learners')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
}

const deleteLearner = async (learnerId) => {
  try {
    const learner = await User.findOne({ email: learnerId })
    if (!learner) {
      throw new Error('Learner not found')
    }
    // console.log(learnerId);
    learner.status = false
    learner.isDeleted = true
    await learner.save()
  } catch (error) {
    throw error
  }
}

module.exports = {
  getDashboard,
  getContentfulDashboard,
  getDashboardAdmins,
  getDashboardLearners,
  softDeleted,
  getContentfulForms,
  getContentfulButtons,
  getContentfulCards,
  getContentfulTypography,
  getContentfulIcons,
  getAddNewLearner,
  postAddNewLearner,
  getLearner,
  deleteLearner,
  adminUpdateLearner,
  getDashboardCourses
}
