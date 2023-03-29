require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

app.use(express.json());
//-----------------------------------

//-- Express Router Configuration



//-------------------------------


//-- Server
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
  ()=>{
    app.listen(process.env.SERVER_PORT,()=>{
      console.log(`Listening on port ${process.env.SERVER_PORT}`)
    })
  });