const path = require("path");
const express = require("express");
const app = express();
const profileRoutes=require('./routes/profileRoute');

//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

app.use(express.json());
//-----------------------------------
app.use('/',profileRoutes);
//-- Express Router Configuration



//-------------------------------


//-- Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});