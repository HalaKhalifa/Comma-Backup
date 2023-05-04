require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const LearnersRoutes = require("./routes/exampleRouter");

//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname, '/public'))); // set path for assets folder

app.use(express.json());
//-----------------------------------

//-- Express Router Configuration
app.use("/learners", LearnersRoutes);

app.get("/courses", (req, res) => {

  const rating = 4;
  const courseIMG=["/images/course.jpg" ,"/images/python-course.jpg","/images/machine-learning.jpg" ,"/images/data_analytics.jpg"]
  const coursesNames= ['Data Science: Deep Learning and Neural Networks in Python','The Complete Python Programming Course','Fullstack Python & Django','Python Network Programming for Network Engineers (Python 3)'];
  res.render("coursesPage", { title: "courses page" ,coursesNames:coursesNames ,courseIMG:courseIMG});
});

//-------------------------------


//-- Server

mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  });