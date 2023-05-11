const express = require('express')
const router = express.Router()
const Course = require('../models/course')

const {
  getDashboard,
  getContentfulDashboard,
  getDashboardLearners,
  getDashboardAdmins
} = require('../controllers/dashboard')
const { updateLearner, getLearners } = require('../controllers/learner')
const { coursePagination } = require('../controllers/courses')

router.get('/dashboard', (req, res) => {
  getDashboard(req, res)
})

router.get('/dashboard2', (req, res) => {
  getContentfulDashboard(req, res)
})

// router.get('/dashboard/courses', (req, res) => {
  // getDashboardCourses(req, res)
// })

router.get('/dashboard/courses', async (req, res) => {
  try {
    const pageCourses = await coursePagination(req, res);
    res.render('pages/dashboard/courses.ejs', pageCourses );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/dashboard/learners', (req, res) => {
  getDashboardLearners(req, res)
})
router.get('/dashboard/admins', (req, res) => {
  getDashboardAdmins(req, res)
})
router.post('/update-learners-data', async (req, res) => {
  await updateLearner(req, res)
})
router.post('/getLearnersData', async (req, res) => {
  await getLearners(req, res)
})

module.exports = router
