//const {getLearners} = require("./learner.test") Commented until collection is filled
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  NumberOfCoursesInYear
} = require('./dashboardCourses')
const {
  getCountryLearners,
  getNoOflearner,
  getTotalEnrolledUserCount,
  NoOfMonthlyRegistration
} = require('./learner.test')
const { usersData } = require('../utils/dashboard')

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
      allCoursesTable: JSON.stringify(await getAllCoursesTable()),
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

const getContentfulDashboard = async (req, res) => {
  // * temporary context object
  const context = {
    title: 'Contentful Dashboard',
    description: 'Contentful Dashboard page description'
  }

  // todo: change to same route in routes => "fix /css path"
  res.render('pages/dashboard_contentful/index.ejs', context)
}

module.exports = { getDashboard, getContentfulDashboard }
