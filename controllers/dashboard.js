const {getNoCreatedCourses} = require("./course")
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
      users: 100,
      views: 1000,
      likes: 10000,
      NoOfCoursesList:await getNoCreatedCourses(),
    }

  }

  // todo: change to dashboard view
  res.render('pages/dashboard/index.ejs', context)
}

const getContentfulDashboard = async (req, res) => {
  // * temporary context object
  const context = {
    title: 'Contentful Dashboard',
    description: 'Contentful Dashboard page description'
  }

  // todo: change to dashboard view
  res.render('pages/dashboard_contentful/index.ejs', context)
}
module.exports = { getDashboard, getContentfulDashboard }
