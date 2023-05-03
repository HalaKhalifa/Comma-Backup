const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
//-- Express configuration & Middleware

app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname, "/public"))); // set path for assets folder

app.use(express.json());
//-----------------------------------

app.use(express.urlencoded({ extended: false }));
// --- Use cookie parser

//----------------------------------------------------------------
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://muhammad:muhammad@cluster0.pjbug9v.mongodb.net/user?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//----------------------------------------------------------------
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
//-- Express Router Configuration
app.use("/", authRoutes);
app.use("/", homeRoutes);

console.log(process.env.PORT);
//-- Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
