const path = require("path");
const express = require("express");
const app = express();

const mongoose = require('mongoose');
//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder
app.use(express.json());

const dashboardRoutes = require('./routes/dashboard'); // replace with the actual path to your routes file
app.use('/', dashboardRoutes);

//-----------------------------------







mongoose.connect('mongodb://127.0.0.1:27017/test3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB...', err));
//-- Express Router Configuration

const Course = require('./models/course');


//-------------------------------


//-- Server
app.listen(5000, () => {
  console.log(`Listening on port 5000`);
});
