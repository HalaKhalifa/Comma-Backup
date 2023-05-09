const course = require('../models/course') // Import the course schema and model

module.exports = async function searchController(searchQuery) {
  console.log('Search query:', searchQuery)
  try {
    const regex = new RegExp(searchQuery, 'i')
    const results = await course.find({ $or: [{ title: regex }, { description: regex }] })
    return results
  } catch (error) {
    console.error(error)
    throw error
  }
}
