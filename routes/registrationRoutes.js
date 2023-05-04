const express = require("express");
const router = express.Router();
// const Learner = require('../models/Learner');
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup", { title: "Sign Up", error: "" });
});
function capitalizefLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

router.post("/", async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  let error = "";

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    error = "Please fill in all fields";
    res.render("signup", { title: "Sign Up", error });
    return;
  }

  const learnerExists = await Learner.findOne({ email });
  if (learnerExists) {
    error = "Email already exists";
    res.render("signup", { title: "Sign Up", error });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    error = "Invalid email address";
    res.render("signup", { title: "Sign Up", error });
    return;
  }

  if (password !== confirmPassword) {
    error = "Passwords do not match";
    res.render("signup", { title: "Sign Up", error });
    return;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!passwordRegex.test(password)) {
    error =
      "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter";
    res.render("signup", { title: "Sign Up", error });
    return;
  }
  const capitalizedFirstname = capitalizefLetter(firstname);
  const capitalizedLastname = capitalizefLetter(lastname);
  const hashedPassword = await bcrypt.hash(password, 10);

  const learner = new Learner({
    firstname: capitalizedFirstname,
    lastname: capitalizedLastname,
    email,
    password: hashedPassword,
  });

  try {
    await learner.save();
    //   res.status(201).json({ message: 'Learner created successfully' });
    return res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
