const path = require('path')
const express = require('express')
const dashboardRouter = require('./routes/dashboard')
const dashboardContentfulRouter = require('./routes/dashboardContentful') // for reference only
const registrationRoutes = require('./routes/registrationRoutes')
const outline=require('./routes/outline.js');
const app = express()
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const session = require("express-session");
const profileRoutes=require('./routes/profileRoute');
const homeRoute=require('./routes/homeRoute.js');
// const LearnersRoutes = require("./routes/exampleRouter");
const coursesPageRoute = require("./routes/paginationRoute");
const singlePageRoute=require('./routes/singlePageRoute.js');

require("dotenv").config();
require('./config/mongoose.config') // database connection


//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, "/public"))); // set path for assets folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',profileRoutes);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);




// -- Routes
app.use('/dashboard', dashboardRouter)
app.use('/dashboard2', dashboardContentfulRouter) // for reference only
app.use('/signup', registrationRoutes)
app.use('/',homeRoute);
app.use("/", homeRoutes);
// app.use('/',route);
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use('/outline',singlePageRoute);
app.get("/courses", coursesPageRoute);


app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`)
  console.log(`http://localhost:${process.env.SERVER_PORT}`)
})
