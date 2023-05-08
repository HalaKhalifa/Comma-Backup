const express = require("express");
const router = express.Router();
// const homeController = require("../controllers/homeController");

// // Set up landing page route
// router.get('/', async (req,res)=>{
//   const topTenEnrolledCourses = await homeController.topTenEnrolledCourses();
//   const topTenRatedCourses = await homeController.topTenRatedCourses();
//   res.render('home.ejs', {
//     topTenEnrolledCourses,
//     topTenRatedCourses,
//   });
// });


const searchController = require('../controllers/searchController.js');
// Set up search route using searchController
router.post('/search', async (req, res) => {
  const searchQuery = req.body.searchText;
  if(searchQuery && searchQuery.trim().length > 0){
  const searchResults = await searchController(searchQuery); 
  console.log(searchResults);
}});

  module.exports= router;
