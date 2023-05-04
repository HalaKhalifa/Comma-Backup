const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registrationRoutes = require("./routes/registrationRoutes");
const dashboardRoutes = require("./routes/dashboard"); // replace with the actual path to your routes file

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "/views"));

app.use("/signup", registrationRoutes);
app.use("/", dashboardRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Listening on port ${process.env.SERVER_PORT}`);
    });
  });
