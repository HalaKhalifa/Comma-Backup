const getDashboard = async (req, res) => {
  // * temporary context object

  const context = {
    title: 'Dashboard',
    description: 'Dashboard page description',
    user: {
      name: 'Admin Doe',
      email: 'jhonDoe@gmail.com'
    },
    analytics: {
      popularCoursesData: JSON.stringify(getPopularCourses(4))
    }
  }

  res.render('pages/dashboard/index.ejs', context)
}

const getContentfulDashboard = async (req, res) => {
  // * temporary context object
  const context = {
    title: 'Contentful Dashboard',
    description: 'Contentful Dashboard page description'
  }

  // todo: change to same route in routes => "fix /css path"
  res.render('pages/dashboard_contentful/index.ejs', context)
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

const courses = [
  {
    title: 'React',
    views: 11452
  },
  {
    title: 'Vue',
    views: 3290
  },
  {
    title: 'Angular',
    views: 2660
  },
  {
    title: 'Svelte',
    views: 1100
  },
  {
    title: 'Ember',
    views: 550
  }
]

module.exports = { getDashboard, getContentfulDashboard }
