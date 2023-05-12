const express = require('express')
const router = express.Router()

const {
  getDashboard,
  getContentfulDashboard,
  getDashboardCourses,
  getDashboardLearners,
  getDashboardAdmins,
  softDeleted,
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
