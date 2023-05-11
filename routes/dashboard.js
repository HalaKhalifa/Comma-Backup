const express = require('express')
const router = express.Router()

const {
  getDashboard,
  getContentfulDashboard,
  getDashboardCourses,
  getDashboardLearners,
  getDashboardAdmins,
  getContentfulForms,
  getContentfulButtons,
  getContentfulCards,
  getContentfulTypography,
  getContentfulIcons,
  adminUpdateLearner
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

router.get('/dashboard2/ui-forms', (req, res) => {
  getContentfulForms(req, res)
})

router.get('/dashboard2/ui-buttons', (req, res) => {
  getContentfulButtons(req, res)
})

router.get('/dashboard2/ui-cards', (req, res) => {
  getContentfulCards(req, res)
})

router.get('/dashboard2/ui-typography', (req, res) => {
  getContentfulTypography(req, res)
})

router.get('/dashboard2/icons-feather', (req, res) => {
  getContentfulIcons(req, res)
})
router.post('/dashboard/learners',(req,res)=>{
  adminUpdateLearner(req,res)
})
module.exports = router
