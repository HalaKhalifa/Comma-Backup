const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const {
    getLearner,
    createNewLearner
  } = require("../controllers/learnersController");
  
  router.post("/", async (req, res) => {
    createNewLearner(req, res);
  });

  router.get("/", (req, res) => {
    getLearner(req, res);
  });
  module.exports = router;