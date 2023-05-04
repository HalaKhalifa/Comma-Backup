const Course = require('../models/course')
/**
 * Returns Number of courses created each month for the previous year
 * 
 * Send a JSON response wtih "coursesCounts" as a LIST
 */
const getNoCreatedCourses = async (req, res) => {
  try {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    const interval = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds

    const courseCounts = []

    for (let i = 0; i < 12; i++) {
      const startDate = new Date(monthAgo.getTime() + interval * i)
      const endDate = new Date(startDate.getTime() + interval)

      const count = await Course.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      })

      courseCounts.push(count)
    }

    res.json({ coursesCounts: courseCounts });
  } catch (error) {
    console.error("error : couldn't get Courses", error)
    res.status(500).json({ message: "couldn't get Courses." });
  }
}
module.exports = { getNoCreatedCourses }
