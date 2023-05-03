const { courses } = require('../utils/data')

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
  popularCourses.push(otherCoursesObj)
  return popularCourses
}

module.exports = { getPopularCourses }
