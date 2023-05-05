const {getLearners} = require("./learner.test")
const { getPopularCourses } = require('./course')

const getDashboard = async (req, res) => {
  // * temporary context object
var staticData = [{
  name: 'Yaser Jom3a',
  email: 'Yaser@Jom3a.com',
  active: "online",
},{
  name: 'A7mad Med7at',
  email: 'A7mad@Med7at.com',
  active: "offline",
},{
  name: 'George Kordahi',
  email: 'George@Kordahi.com',
  active: "online",
}]
  const context = {
    title: 'Dashboard',
    description: 'Dashboard page description',
    user: {
      name: 'Admin Doe',
      email: 'jhonDoe@gmail.com'
    },
    analytics: {
      LearnersList : staticData /*await getLearners() */,
      popularCoursesData: JSON.stringify(getPopularCourses(4)),
      CoursesTableData: JSON.stringify(getPopularCourses(10))
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
