const express = require('express')
const path = require('path')
const session = require('express-session')

const dashboardRouter = require('./routes/dashboard')
const authRoutes = require('./routes/auth')
const landingPage = require('./routes/landingPage')
const courses = require('./routes/courses')
const learner = require('./routes/learner')
const Preferences = require('./routes/preference')
const AdminLearner = require('./routes/adminToLearner')
const { searchCourses } = require('./controllers/courses')

const app = express()
require('dotenv').config()
require('./config/mongoose') // database connection

//-- Express configuration & Middleware
app.set('view engine', 'ejs') // use EJS
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '/public'))) // set path for assets folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
)

// -- Routes
app.use('/', AdminLearner)
app.use('/', landingPage)
app.use('/', authRoutes)
app.use('/', courses)
app.use('/', learner)
app.use('/', dashboardRouter)
app.use('/', Preferences)

// todo: Set up search route using searchController
app.post('/search', async (req, res) => {
  const searchQuery = req.body.searchText
  if (searchQuery && searchQuery.trim().length > 0) {
    const searchResults = await searchCourses(searchQuery)
    console.log(searchResults)
    res.redirect(`/courses?search=${searchQuery}`)
  } else {
    res.redirect('/courses')
  }
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`)
  console.log(`http://localhost:${process.env.SERVER_PORT}`)
})
