const path = require("path");
const express = require("express");
const app = express();


//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

app.use(express.json());
require('dotenv').config();
//-----------------------------------

//-- Express Router Configuration
const route=require('./routes/exampleRoute.js');
app.use('/',route);



//-------------------------------


//-- Server
app.listen(process.env.PORT, () => {
 console.log(`Listening on port ${process.env.PORT}`);
});
