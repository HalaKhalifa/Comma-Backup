const express = require('express')
const router = express.Router()

const {
  getLearner,
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
  adminUpdateLearner,
  softDeleted
} = require('../controllers/dashboard')

const { updateLearner, getLearners } = require('../controllers/learner')
const { updateAdmin, deleteAdmin } = require('../controllers/admin')

router.get('/dashboard', (req, res) => {
  getDashboard(req, res)
})

router.get('/dashboard2', (req, res) => {
  getContentfulDashboard(req, res)
})
router.get('/dashboard/courses', (req, res) => {
  getDashboardCourses(req, res)
})
router.get('/courses/delete/:courseId', async (req, res) => {
  const encodedcourseId = req.params.courseId;
  const courseId = decodeURIComponent(encodedcourseId);
  try {
    await softDeleted(courseId);
    res.redirect('/dashboard/courses');
  } catch (error) {
    console.error('Failed to delete courses:', error);
    res.status(500).json({ error: 'Failed to delete courses' });
  }
});


router.get('/dashboard/learners', (req, res) => {
  getDashboardLearners(req, res)
})

router.post('/dashboard/data', async (req, res) => {
  console.log(req.query)
  await getLearner(req, res)
})

router.get('/dashboard/admins', (req, res) => {
  getDashboardAdmins(req, res)
})
router.post('/dashboard/update-learners-data', async (req, res) => {
  await updateLearner(req, res)
})
router.post('/dashboard/getlearnersdata', async (req, res) => {
  await getLearners(req, res)
})
router.post('/dashboard/update-admins-data', async (req, res) => {
  await updateAdmin(req, res)
})
router.post('/dashboard/delete-admin', async (req, res) => {
  await deleteAdmin(req, res)
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
