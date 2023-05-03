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
      likes: 10000
    }
  }

  // todo: change to dashboard view
  res.render('pages/dashboard/index.ejs', context)
}
module.exports = { getDashboard }
