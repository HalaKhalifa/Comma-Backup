const express = require('express');
const router = express.Router();
const {getNoCreatedCourses} = require("../controllers/course")

router.get('/courses-count', async (req, res) => {
      await getNoCreatedCourses(req,res)
  });

const { getDashboard } = require('../controllers/dashboard')

router.get('/', (req, res) => {
  getDashboard(req, res)
})

module.exports = router
