const Course = require('../models/course');

const topTenEnrolledCourses = async (req,res) => {
  const topTenEnrolledCourses  = await Course.find({}).sort({ enrolledUsers: -1 })
  .limit(10);
  return topTenEnrolledCourses;
}
const topTenRatedCourses = async (req,res) => {
  const topTenRatedCourses  = await Course.find({})
    .sort({ rating: -1 })
    .limit(10);
  return topTenRatedCourses;
};

module.exports = { 
  topTenEnrolledCourses,
   topTenRatedCourses 
  };