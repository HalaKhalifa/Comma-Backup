const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get('/', async (req,res)=>{
  const topTenEnrolledCourses = await homeController.topTenEnrolledCourses();
  const topTenRatedCourses = await homeController.topTenRatedCourses();
  res.render('home.ejs', {
    topTenEnrolledCourses,
    topTenRatedCourses,
  });
});
    module.exports = router;
    
