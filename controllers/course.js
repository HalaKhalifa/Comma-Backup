const Course = require('../models/course.test')
const { courses } = require('../utils/data')
/**
 * Returns Number of courses created each month for the previous year
 *
 * Send a JSON response wtih "coursesCounts" as a LIST
 */
const getNoCreatedCourses = async () => {
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

    return courseCounts
  } catch (error) {
    console.error("error : couldn't get Courses", error)
  }
}

/**
 * ### Returns an array of popular courses.
 * @param {Number} limit - The number of courses to return. **Default = `3`**.
 * @returns {Array} An array of popular courses[limit + 1] (with others object)
 */
function getPopularCourses(limit = 3) {
  // todo: get courses from database when controllers ready => Uncomment below
  // let courses = getCourses()
  // courses = courses.map((course) => {
  //   return {
  //     title: course.title,
  //     views: course.views
  //   }
  // })
  const allViews = courses.reduce((previosCount, newCourse) => previosCount + newCourse.views, 0)
  let MaxLimitExceeded = 0
  if (limit > courses.length) {
    limit = courses.length
    MaxLimitExceeded = 1
  }
  let popularCourses = courses
    .sort((courseX, courseY) => {
      courseX.views > courseY.views ? 1 : -1
    })
    .slice(0, limit)
    .map((course) => {
      return {
        ...course,
        percentage: ((course.views / allViews) * 100).toFixed(2)
      }
    })

  const popularViews = popularCourses.reduce(
    (previosCount, newCourse) => previosCount + newCourse.views,
    0
  )
  const otherCoursesObj = {
    title: 'Others',
    views: allViews - popularViews,
    percentage: (((allViews - popularViews) / allViews) * 100).toFixed(2)
  }
  !MaxLimitExceeded && popularCourses.push(otherCoursesObj)
  return popularCourses
}

module.exports = { getPopularCourses, getNoCreatedCourses }
