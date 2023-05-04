const course = require("../models/course")

const paginationResult= async(req,res)=>{
let page = req.params.page
let limit= 8;
let offset= (page * limit) -1 

const courseResult= await course.find().limit().offset()
   res.status(200).json(courseResult)
}

module.export={
    paginationResult
}