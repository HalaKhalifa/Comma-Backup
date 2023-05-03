const path = require('path')
const express = require('express')
const dashboardRouter = require('./routes/dashboard')
const dashboardContentfulRouter = require('./routes/dashboardContentful') // for reference only
const ejs = require('ejs');

const app = express()

require('dotenv').config()
require('./config/mongoose.config') // database connection

// -- Express configuration & Middleware
app.set('views', path.join(__dirname, 'views'))


app.set("view engine", "ejs"); // use EJS
app.set("views", "./views/partials/dashboard_contentful");
app.use(express.static(path.join(__dirname, 'public'))) // set path for assets folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// -- Routes
app.use('/dashboard', dashboardRouter)
app.use('/dashboard2', dashboardContentfulRouter) // for reference only


//testing 
const registrationchart = require("./routes/registrationchart");
app.use("/",registrationchart); //chart


app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`)
  console.log(`http://localhost:${process.env.SERVER_PORT}`)
})

