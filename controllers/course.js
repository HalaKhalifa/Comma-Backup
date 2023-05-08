const Course = require('../models/course')

/**
 * #### queries courses schema.
 * @param {Number} limit - The number of courses to query. **Default = `100`**.
 * @param {Boolean} sort - defines the sorting of the records. `'ASC'` | `'DESC'`, **Default** = `false`.
 * @returns {Array} An array of course objects.
 */
async function getCourses(limit = 100, sort = false) {
  try {
    // todo : Add sorting with false to work
    if (sort === 'DESC') sort = -1
    else if (sort === 'ASC') sort = 1
    else sort = false
    const courses = await Course.find().sort({ enrolledUsers: sort }).limit(limit)
    return courses
  } catch (error) {
    console.error("error : couldn't get Courses", error)
    return null
  }
}

module.exports = { getCourses }
