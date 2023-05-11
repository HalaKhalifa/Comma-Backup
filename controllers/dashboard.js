//const {getLearners} = require("./learner.test") Commented until collection is filled
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable,
<<<<<<< Updated upstream
  NumberOfCoursesInYear
=======
  NumberOfCoursesInYear,
  getTop10EnrolledCourses
>>>>>>> Stashed changes
} = require('./dashboardAnalytics')
const {
  getCountryLearners,
  getNoOflearner,
  getTotalEnrolledUserCount,
<<<<<<< Updated upstream
  NoOfMonthlyRegistration
=======
  getNoOfMonthlyRegistration,
  getNoOfviewers
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      TotalEnrolledUserCount: [],
      NoOfMonthlyRegistration: await NoOfMonthlyRegistration(),
      enrolledFinishedCourses: JSON.stringify(await getEnrolledFinished())
=======
      NoOfMonthlyRegistration: await getNoOfMonthlyRegistration(),
      enrolledFinishedCourses: JSON.stringify(await getEnrolledFinished()),
      TotalEnrolledUserCount: await getTotalEnrolledUserCount(),
      Noofviewers: await getNoOfviewers(),
      Top10Enrolledcourses: await getTop10EnrolledCourses()
>>>>>>> Stashed changes
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
  const context = {
    title: 'All learners',
    learners: []
  }

  res.render('pages/dashboard/learners.ejs', context)
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

module.exports = {
  getDashboard,
  getContentfulDashboard,
  getDashboardCourses,
  getDashboardAdmins,
  getDashboardLearners
}
