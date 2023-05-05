const express = require("express");
const router = express.Router();
const singleCourseController =require('../controllers/singlePageContraller')
router.get('/outline',singleCourseController.getSingleCourse)

module.exports= router;
    