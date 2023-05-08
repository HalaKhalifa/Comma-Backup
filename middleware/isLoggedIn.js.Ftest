const express = require("express");
const router = express.Router();

module.exports = (req, res, next) => {
    res.locals.username = req.session.username || null;
    next();
  };