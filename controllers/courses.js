const Course = require('../models/course')

// const getCoursesList = async (req, res) => {
//   const courses = await Course.find().sort({ createdAt: -1 }) // -1 mean desc

// res.status(200).json(courses)
//}

//   res.status(200).json(courses)
// }

const getCourse = async (req, res) => {
  const { id } = req.params

  const singleCourse = await Course.findById(id)

  if (!singleCourse) {
    return res.status(404).json({ error: 'No such course' })
  }

  res.status(200).json(singleCourse)
}

const createNewCourse = async (req, res) => {
  const {
    title,
    description,
    outline,
    totalHours,
    enrolledUsers,
    rating,
    stars,
    topicID,
    publishedAt,
    view,
    isDeleted
  } = req.body

  try {
    const newCourse = await Course.create({
      title: title,
      description: description,
      outline: outline,
      totalHours: totalHours,
      enrolledUsers: enrolledUsers,
      rating: rating,
      stars: stars,
      isDeleted: isDeleted,
      topicID: topicID,
      publishedAt: publishedAt,
      view: view
    })

    res.redirect('/dashboard/courses')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateCourse = async (req, res) => {
  const { id } = req.params

  try {
    const {
      title,
      image,
      description,
      isDeleted,
      outline,
      totalHours,
      enrolledUsers,
      rating,
      stars,
      topicID,
      publishedAt,
      view
    } = req.body

    const singleCourse = await Course.findOneAndUpdate(
      { _id: id },
      {
        title: title | Course.title,
        image: image | Course.image,
        description: description | Course.description,
        isDeleted: isDeleted | Course.isDeleted,
        outline: outline | Course.outline,
        totalHours: totalHours | Course.totalHours,
        enrolledUsers: enrolledUsers | Course.enrolledUsers,
        rating: rating | Course.rating,
        stars: stars | Course.stars,
        topicID: topicID | Course.topicID,
        publishedAt: publishedAt | Course.publishedAt,
        view: view | Course.view
      }
    )

    if (!singleCourse) {
      return res.status(404).json({ error: 'No such course.' })
    }

    res.status(200).json(singleCourse)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteCourse = async (req, res) => {
  const { id } = req.params

  const singleCourse = await Course.findOneAndDelete({ _id: id })

  if (!singleCourse) {
    return res.status(404).json({ error: 'No such course.' })
  }

  res.status(200).json(singleCourse)
}

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

async function filterCourses(userFilters) {
  const { topic, tags, date, enrollment, rating } = userFilters
  const query = {}

  if (topic) {
    query.topic = topic
  }

  if (tags && tags.length > 0) {
    query.tags = { $in: tags }
  }

  if (date) {
    const { start, end } = date
    query.date = { $gte: new Date(start), $lte: new Date(end) }
  }

  if (enrollment) {
    query.enrollment = { $gte: enrollment }
  }

  if (rating) {
    query.rating = { $gte: rating }
  }

  const courses = await course.find(query).sort({ date: -1, enrollment: -1, rating: -1 })
  return courses
}

const getSingleCourse = async (req, res) => {
  const courseId = req.query.courseId

  const singleCourse = await Course.findById(courseId)
  if (!singleCourse) {
    return res.status(404).json({ error: 'No such course' })
  }
  return singleCourse
}

const coursePagination = async (req, res) => {
  let page = parseInt(req.query.page) || 1
  let limit = 16
  // const pageCourses = await course.find().skip((page-1)*limit).limit(limit).sort({createdAt: -1});
  let query = {}
  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' }
  }
  const pageCourses = await Course.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
  return pageCourses
}


const getSortedCourses = async (req, res) => {
  const searchQuery = req.body.searchQuery;
  let page = parseInt(req.query.page) || 1
  let limit = 16
  if (searchQuery[0]=='rating') searchQuery[0] = '';
if (searchQuery[1]=='enrollement') searchQuery[1] = '';
  let query = {};

  if (searchQuery[0] !== null) {
    if (searchQuery[0] === 'asc') {
      query = { ...query, rating: { $exists: true } };
    } else if (searchQuery[0] === 'desc') {
      query = { ...query, rating: { $exists: true } };
    }
  }

  if (searchQuery[1] !== null) {
    if (searchQuery[1] === 'asc') {
      query = { ...query, enrolledUsers: { $exists: true } };
    } else if (searchQuery[1] === 'desc') {
      query = { ...query, enrolledUsers: { $exists: true } };
    }
  }

  if (searchQuery[2]) {
    query = { ...query, topic: searchQuery[2] };
  }

  if (searchQuery[3]) {
    query = { ...query, tags: { $in: [searchQuery[3]] } };
  }

  const sort = {};

  if (searchQuery[0] !== null) {
    if (searchQuery[0] === 'asc' || searchQuery[0] === 'desc') {
      sort.rating = searchQuery[0] === 'desc' ? -1 : 1;
    }
  }

  if (searchQuery[1] !== null) {
    if (searchQuery[1] === 'asc' || searchQuery[1] === 'desc') {
      sort.enrolledUsers = searchQuery[1] === 'desc' ? -1 : 1;
    }
  }

  const pageCourses = await Course.find(query).skip((page - 1) * limit)
  .limit(limit).sort(sort);
// console.log(pageCourses);
  return pageCourses
};

async function searchCourses(searchQuery) {
  console.log('Search query:', searchQuery)
  console.log(typeof searchQuery);
  try {
    const regex = new RegExp(searchQuery, 'i')
    const results = await Course.find({ $or: [{ title: regex }, { description: regex }] })
    return results
  } catch (error) {
    console.error(error)

  }
}

module.exports = {
  getCourse,
  createNewCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  filterCourses,
  getSingleCourse,
  coursePagination,
  searchCourses,
  getSortedCourses
}
