const {getLearners} = require("./learner.test")
const { getPopularCourses } = require('./course')

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
