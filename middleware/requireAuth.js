const express = require("express");
const router = express.Router();
// middleware function to check if the user is authenticated
function requireAuth(req, res, next) {
  if (!req.session.user) {
    res.locals.user = { value: 0 };
    console.log("not logged");
    next();
  } else {
    res.locals.user = req.session.user;
    console.log('logged',res.locals.user);
    next();
  }
}


module.exports=requireAuth;