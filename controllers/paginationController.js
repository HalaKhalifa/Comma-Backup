const course = require("../models/course");

const paginationResult = async (req, res) => {
const courses = await course.find();
  let page = parseInt(req.query.page) || 1;
  let limit = 16;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageCourses = courses.slice(startIndex, endIndex);

  // render coursesPage with courseNames ,courseIMG to display theme
  res.render("coursesPage", {
    req:req,
    courses, 
    page ,
    title: "courses page",
    pageCourses:pageCourses
  });
};

module.exports = { paginationResult };