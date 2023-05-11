const Course = require('../models/course')
const { getCourses } = require('./courses')
const { numbersArr } = require('../helpers/dashboard')
/**
 * Returns Number of courses created each month for the previous year
 *
 * Send a JSON response wtih "coursesCounts" as a LIST
 */
const NumberOfCoursesInYear = async () => {
  try {
    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) // Date since 12 months ago until now.
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]
    const courseCounts = await Course.aggregate(pipeline)
    const currentMonth = new Date().getMonth()
    const array = Array.from({ length: 12 }, (_, i) => {
      const month = (currentMonth - i + 11) % 12
      const count = courseCounts.find(({ _id }) => _id === month + 1)?.count || 0
      return count
    }).reverse()
    return array
  } catch (error) {
    console.error("error : couldn't get Courses", error)
  }
}

/**
 * #### Returns an array of popular courses.
 * @param {Number} limit - The number of courses to return. **Default = `7`**.
 * @param {Boolean} others - total sum of all other courses. **Default = `false`**.
 * @returns {Array} An array of popular courses[limit + 1] (with others object if added)
 */
async function getPopularCourses(limit = 5, others = false) {
  let courses = await getCourses(limit, 'DESC')
  courses = courses.reduce((result, course) => {
    if (course.title)
      result.push({
        title: course.title?.substring(0, 10) + '...',
        views: course.enrolledUsers
      })
    return result
  }, [])

  const allViews = await getCoursesEnrolls()
  let MaxLimitExceeded = false

  if (isNaN(limit) || limit < 0) {
    limit = 3
  }
  if (limit > courses.length) {
    limit = courses.length
    MaxLimitExceeded = true
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
  if (!MaxLimitExceeded && others) {
    const otherCoursesObj = {
      title: 'Others',
      views: allViews - popularViews,
      percentage: (((allViews - popularViews) / allViews) * 100).toFixed(2)
    }
    popularCourses.push(otherCoursesObj)
  }
  return popularCourses
}

const getNoOfCourses = async () => {
  try {
    const NoOfCourses = await Course.estimatedDocumentCount()
    return NoOfCourses
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}

/**
 * #### Returns an array containing enrolled & finished courses.
 * @param {Number} limit - The number of courses to return. **Default = `10`**.
 * @returns {Array} An array of courses with enrolled & finished properties.
 */
async function getEnrolledFinished(limit = 10) {
  let courses = await getCourses(limit, 'DESC')
  // console.log(courses)
  const enrolledFinished = courses.map((course) => {
    return {
      title: course.title?.substring(0, 15) + '...',
      enrolled: course.enrolledUsers,
      // todo: change to real data when ready, this is randomly generated number
      finished: Math.floor(Math.random() * course.enrolledUsers) / 2
    }
  })
  const sortedEnrolledFinished = enrolledFinished.sort((courseX, courseY) =>
    courseX.finished / courseX.enrolled < courseY.finished / courseY.enrolled ? 1 : -1
  )
  return sortedEnrolledFinished.slice(0, limit)
}

/**
 * #### returns all(currently limited) courses.
 * @param {Number} limit - The number of courses to query. **Default = `100`**.
 * @param {Boolean} sort - defines the sorting of the records. `'ASC'` | `'DESC'` | `false`. Default = `false`.
 * @returns {Array} An array of course objects.
 */
async function getAllCoursesTable(limit = 20) {
  // todo: fucntionality should be changed to return a range of courses
  try {
    let courses = await getCourses(limit)
    courses = courses.reduce((result, course) => {
      if (course.title)
        result.push({
          title: course.title?.substring(0, 40),
          enrolled: course.enrolledUsers,
          rating: course.rating,
          stars: course.stars,
          // todo: change totalHours to real data when ready, this is randomly generated
          totalHours: course.totalHours | (Math.random() * 100)
        })
      return result
    }, [])
    return courses
  } catch (error) {
    console.error("error : couldn't get Courses", error)
    return null
  }
}

/**
 * #### queries aggregate sum function on enrolled users.
 * @returns {Number} total sum of enrolled users.
 */
async function getCoursesEnrolls() {
  try {
    const sum = await Course.aggregate([
      {
        $group: {
          _id: null,
          totalEnrolls: { $sum: '$enrolledUsers' }
        }
      }
    ])
    return sum[0].totalEnrolls
  } catch (error) {
    console.error("error : couldn't get Courses", error)
    return null
  }
}
<<<<<<< Updated upstream
=======
const getTop10EnrolledCourses = async () => {
  try {
    // Retrieve the top 10 enrolled courses based on the 'enrolledUsers' field in descending order
    const top10Courses = await Course.find()
      .sort({ enrolledUsers: -1 })
      .limit(10)
      .select({ title: 1, enrolledUsers: 1 })

    return top10Courses
  } catch (error) {
    console.error('An error occurred while fetching the top enrolled courses:', error)
    throw error
  }
}
>>>>>>> Stashed changes

module.exports = {
  getPopularCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  getNoOfCourses,
  NumberOfCoursesInYear
}
