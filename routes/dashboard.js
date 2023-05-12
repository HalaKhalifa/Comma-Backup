const express = require('express');
const router = express.Router();

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
  deleteLearner,
  addNewLearner,
  getAddNewLearner,
  postAddNewLearner
} = require('../controllers/dashboard');
const { updateLearner, getLearners } = require('../controllers/learner');

router.get('/dashboard', (req, res) => {
  getDashboard(req, res);
});

router.get('/dashboard2', (req, res) => {
  getContentfulDashboard(req, res);
});

router.get('/dashboard/courses', (req, res) => {
  getDashboardCourses(req, res);
});

router.get('/dashboard/learners', (req, res) => {
  getDashboardLearners(req, res);
});

router.get('/learners/delete/:learnerId', async (req, res) => {
  const encodedLearnerId = req.params.learnerId;
  const learnerId = decodeURIComponent(encodedLearnerId);
  
  try {
    await deleteLearner(learnerId);
    res.redirect('/dashboard/learners');
  } catch (error) {
    console.error('Failed to delete learner:', error);
    res.status(500).json({ error: 'Failed to delete learner' });
  }
});



router.post('/dashboard/data', async (req, res) => {
  await getLearner(req, res);
});

router.get('/dashboard/learners/new_learner', (req, res) => {
  getAddNewLearner(req, res);
});

router.post('/dashboard/learners/new_learner', (req, res) => {
  postAddNewLearner(req, res);
});

router.get('/dashboard/admins', (req, res) => {
  getDashboardAdmins(req, res);
});

router.post('/update-learners-data', async (req, res) => {
  await updateLearner(req, res);
});

router.post('/getLearnersData', async (req, res) => {
  await getLearners(req, res);
});

router.get('/dashboard2/ui-forms', (req, res) => {
  getContentfulForms(req, res);
});

router.get('/dashboard2/ui-buttons', (req, res) => {
  getContentfulButtons(req, res);
});

router.get('/dashboard2/ui-cards', (req, res) => {
  getContentfulCards(req, res);
});

router.get('/dashboard2/ui-typography', (req, res) => {
  getContentfulTypography(req, res);
});

router.get('/dashboard2/icons-feather', (req, res) => {
  getContentfulIcons(req, res);
});

module.exports = router;
