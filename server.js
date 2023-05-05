const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

app.use(express.json());
//-----------------------------------

//-- Express Router Configuration
const route=require('./routes/exampleRoute.js');
app.use('/',route);



//-------------------------------


//-- Server
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true,}).then(
  ()=>{
    app.listen(process.env.SERVER_PORT,()=>{
      console.log(`Listening on port ${process.env.SERVER_PORT}`)
    })
  });