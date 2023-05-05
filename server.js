const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
app.set("view engine", "ejs"); 
app.use(express.static(path.join(__dirname,'/public'))); 
app.use(express.json());
//-----------------------------------

//-- Express Router Configuration
const route=require('./routes/singlePageRoute.js');
app.use('/',route);



//-------------------------------


//-- Server
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true,}).then(
  ()=>{
    app.listen(process.env.SERVER_PORT,()=>{
      console.log(`Listening on port ${process.env.SERVER_PORT}`)
    })
  });