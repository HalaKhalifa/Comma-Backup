const express = require('express')
const router = express.Router()

const {
  getDashboard,
  getContentfulDashboard,
  getDashboardCourses,
  getDashboardLearners,
  getDashboardAdmins
} = require('../controllers/dashboard')
const { updateLearner, getLearners } = require('../controllers/learner')

router.get('/dashboard', (req, res) => {
  getDashboard(req, res)
})

router.get('/dashboard2', (req, res) => {
  getContentfulDashboard(req, res)
})

router.get('/dashboard/courses', (req, res) => {
  getDashboardCourses(req, res)
})
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
