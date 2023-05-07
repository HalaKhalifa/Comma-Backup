const course = require('../models/course');
const mongoose  = require('mongoose');

const getSingleCourse = async (req,res) => {
    const courseId = req.query.courseId;
   
    const singleCourse = await course.findById(courseId); 
     console.log(singleCourse)
    if ( !singleCourse ) {
        return res.status(404).json({error: 'No such course'});
    }
    res.render('outline_page',{singleCourse:singleCourse});
}
module.exports = {
    getSingleCourse
}