//const {getLearners} = require("./learner.test") Commented until collection is filled
const { getPopularCourses } = require('./course')
const {getNoCreatedCourses} = require("./course")
const {getNoOfCourses} =  require("./course") 
const {getNoOflearner} =  require("./learner.test") 
const {getTotalEnrolledUserCount} = require ("./learner.test")
const {NoOfMonthlyRegistration} = require ("./learner.test") ;
const getDashboard = async (req, res) => {
  // * temporary context object

  const context = {
    title: 'Dashboard',
    description: 'Dashboard page description',
    user: {
      name: 'Admin Doe',
      email: 'jhonDoe@gmail.com'
    },
    analytics: {
      LearnersList : await getLearners(),
      popularCoursesData: JSON.stringify(getPopularCourses(4)),
      CoursesTableData: JSON.stringify(getPopularCourses(10)),
      users: 100,
      views: 1000,
      likes: 10000,
      NoOfCoursesList:await getNoCreatedCourses(),
      NoOfCourses:await getNoOfCourses(),
      NoOflearner : await getNoOflearner(), 
      TotalEnrolledUserCount : await getTotalEnrolledUserCount(),
      NoOfMonthlyRegistration : await NoOfMonthlyRegistration() ,
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