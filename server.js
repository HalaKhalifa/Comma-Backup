const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registrationRoutes = require("./routes/registrationRoutes");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "/views"));

app.use("/signup", registrationRoutes);

mongoose
  .connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  });
