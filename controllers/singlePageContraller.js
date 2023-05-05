const course = require('../models/course');
const mongoose  = require('mongoose');

const getSingleCourse = async (req,res) => {
    const courses = await course.find().sort({createdAt: -1});
    const course1=courses[10].id;//example test
   
    const singleCourse = await course.findById(course1); 
     console.log(singleCourse)
    if ( !singleCourse ) {
        return res.status(404).json({error: 'No such course'});
    }
    res.render('outline_page',{singleCourse:singleCourse});
}
module.exports = {
    getSingleCourse
}