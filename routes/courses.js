const express = require('express')
const router = express.Router()
const { coursePagination, getSingleCourse, getSortedCourses } = require('../controllers/courses')
const formController = require('../controllers/courses')
const softDelete = require('../controllers/courses')
// const requireAuth= require('../middleware/requireAuth.js')
// router.get('/courses', coursePagination)
// router.get('/outline', getSingleCourse)
router.post('/dashboard/courses', formController.createNewCourse)
const { get_session_loggedIn } = require('../middleware/sessionMiddleWare')

router.get('/courses', async (req, res) => {
  try {
    const isLoggedIn = get_session_loggedIn(req)
    console.log(isLoggedIn)
    const pageCourses = await coursePagination(req, res)
    res.render('pages/home/courses_page.ejs', {
      isLoggedIn: isLoggedIn,
      title: 'courses page',
      pageCourses: pageCourses
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

//   router.get('/courses',coursePagination); //The render is included inside the controller
router.get('/outline', async (req, res) => {
  try {
    const isLoggedIn = get_session_loggedIn(req)
    console.log(isLoggedIn)
    const singleCoursePage = await getSingleCourse(req, res)
    res.render('pages/home/outline_page', {
      isLoggedIn: isLoggedIn,
      title: 'courses page',
      singleCourse: singleCoursePage
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// router.get('/outline',  getSingleCourse)
router.post('/dashboard/courses', formController.createNewCourse)

router.post('/courses', async (req, res) => {
    try {
    const isLoggedIn = get_session_loggedIn(req)
      const pageCourses = await getSortedCourses(req, res);
      res.render('pages/home/courses_page.ejs', {
      isLoggedIn: isLoggedIn,
          title: 'courses page',
          pageCourses: pageCourses
        })
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/outline/apply/:id',(req,res)=>{
  
})
// router.post('/search', async (req, res) => {
//   const searchQuery = req.body.searchText
//   if (searchQuery && searchQuery.trim().length > 0) {
//     const searchResults = await searchCourses(searchQuery)
//     console.log(searchResults)
//   }
// })
module.exports = router
