const express = require('express')
const router = express.Router()
const { coursePagination, getSingleCourse, searchCourses } = require('../controllers/courses')

router.get('/courses', coursePagination)
router.get('/outline', getSingleCourse)

// router.post('/search', async (req, res) => {
//   const searchQuery = req.body.searchText
//   if (searchQuery && searchQuery.trim().length > 0) {
//     const searchResults = await searchCourses(searchQuery)
//     console.log(searchResults)
//   }
// })
module.exports = router