//const {getLearners} = require("./learner.test") Commented until collection is filled
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
  getNoOfviewers
} = require('./learner')
const { usersData } = require('../helpers/dashboard')

const Course = require('../models/course')

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
      NoOfMonthlyRegistration: await getNoOfMonthlyRegistration(),
      enrolledFinishedCourses: JSON.stringify(await getEnrolledFinished()),
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

  // todo: change to same route in routes => "fix /css path"
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

module.exports = {
  getDashboard,
  getContentfulDashboard,
  getDashboardCourses,
  getDashboardAdmins,
  getDashboardLearners,
  softDeleted,
  getContentfulForms,
  getContentfulButtons,
  getContentfulCards,
  getContentfulTypography,
  getContentfulIcons,
  getLearner,
  adminUpdateLearner,
  getLearner
}
