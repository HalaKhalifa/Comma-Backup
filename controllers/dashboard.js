//const {getLearners} = require("./learner.test") Commented until collection is filled
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  NumberOfCoursesInYear,
  getAllLearnersTable,adminUpdateLearner
} = require('./dashboardAnalytics')
const {
  getCountryLearners,
  getNoOflearner,
  getTotalEnrolledUserCount,
  NoOfMonthlyRegistration
} = require('./learner')
const { usersData } = require('../helpers/dashboard')

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
  adminUpdateLearner
}
