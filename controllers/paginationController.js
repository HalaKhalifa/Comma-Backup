const course = require("../models/course");

const paginationResult = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 16;
  const pageCourses = await course.find().skip((page-1)*limit).limit(limit).sort({createdAt: -1});
 
  res.render("coursesPage", {
    title: "courses page",
    pageCourses:pageCourses
  });
};

module.exports = { paginationResult };