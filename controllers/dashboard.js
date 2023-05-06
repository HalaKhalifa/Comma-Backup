//const {getLearners} = require("./learner.test") Commented until collection is filled
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable
} = require('./course')
const {
  getCountryLearners,
  getNoOflearner,
  getTotalEnrolledUserCount,
  NoOfMonthlyRegistration,
  getLearners
} = require('./learner.test')

const getDashboard = async (req, res) => {
  // * temporary context object
  var staticData = [
    {
      name: 'Yaser Jom3a',
      email: 'Yaser@Jom3a.com',
      active: 'online'
    },
    {
      name: 'A7mad Med7at',
      email: 'A7mad@Med7at.com',
      active: 'offline'
    },
    {
      name: 'George Kordahi',
      email: 'George@Kordahi.com',
      active: 'online'
    }
  ]
  const context = {
    title: 'Dashboard',
    description: 'Dashboard page description',
    user: {
      name: 'Admin Doe',
      email: 'jhonDoe@gmail.com'
    },
    analytics: {
      LearnersList: await getLearners(),
      popularCoursesPie: JSON.stringify(await getPopularCourses()),
      allCoursesTable: JSON.stringify(await getAllCoursesTable()),
      NoOfCoursesList: await getNoCreatedCourses(),
      NoOfCountryLearners: await getCountryLearners(),
      NoOfCourses: await getNoOfCourses(),
      NoOflearner: await getNoOflearner(),
      TotalEnrolledUserCount: await getTotalEnrolledUserCount(),
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
