const express = require('express')
const router = express.Router()
const { coursePagination, getSingleCourse, searchCourses} = require('../controllers/courses')
const formController =require('../controllers/courses')
const deleteCourse = require('../controllers/courses')
const sortCourses =require('../controllers/courses')
 
router.post("/dashboard/courses",formController.createNewCourse);
router.get('/courses', async (req, res) => {
    try {
      const pageCourses = await coursePagination(req, res);
      res.render('pages/home/courses_page.ejs', {
          title: 'courses page',
          pageCourses: pageCourses
        })
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
router.get('/outline', getSingleCourse)
router.post("/dashboard/courses",deleteCourse.updateCourse)
router.post('/courses', async (req, res) => {
    try {
      const pageCourses = await sortCourses.getSortedCourses(req, res);
      res.render('pages/home/courses_page.ejs', {
          title: 'courses page',
          pageCourses: pageCourses
        })
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// router.post('/search', async (req, res) => {
//   const searchQuery = req.body.searchText
//   if (searchQuery && searchQuery.trim().length > 0) {
//     const searchResults = await searchCourses(searchQuery)
//     console.log(searchResults)
//   }
// })
module.exports = router
