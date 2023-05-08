const express = require('express')
const path = require('path')
const session = require('express-session')

const dashboardRouter = require('./routes/dashboard')
const dashboardContentfulRouter = require('./routes/dashboardContentful') // for reference only
const registrationRoutes = require('./routes/registrationRoutes')
const profileRoutes = require('./routes/profileRoute')
const route = require('./routes/outline.js')
const authRoutes = require('./routes/authRoutes')
const coursesPageRoute = require('./routes/paginationRoute')
const singlePageRoute = require('./routes/singlePageRoute.js')
const landingPage = require('./routes/landingPage')
const searchController = require('./controllers/searchController')

const app = express()
require('dotenv').config()
require('./config/mongoose.config') // database connection

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
app.use('/', landingPage)
app.use('/signup', registrationRoutes)
app.get('/login', authRoutes)
// app.use('/courses', isLoggedIn) // todo : work on this
app.get('/courses', coursesPageRoute)
app.get('/outline', singlePageRoute)
app.use('/dashboard', dashboardRouter)
app.use('/dashboard2', dashboardContentfulRouter) // for reference only
app.use('/signup', registrationRoutes)
app.use('/', route)
app.use('/', profileRoutes)

// todo: Set up search route using searchController
app.post('/search', async (req, res) => {
  const searchQuery = req.body.searchText
  if (searchQuery && searchQuery.trim().length > 0) {
    const searchResults = await searchController(searchQuery)
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
