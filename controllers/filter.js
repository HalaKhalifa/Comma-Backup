const course = require('../models/course') // Import the course schema and model

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

module.exports = filterCourses
