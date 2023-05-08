const { faker } = require('@faker-js/faker')
const contentSchema = require('../models/content')
const courseSchema = require('../models/course')
const DEBUG = true

//* object templates for schemas *//
const content = {
  courseID: '',
  type: 'video',
  length: 'average',
  data: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
}

const contentTypes = ['link', 'text']
const contentLengths = ['short', 'average', 'long']

//* ------------------------------- *//

/**
 * ### currently doing each in this function:
 * - get course IDs
 * - generate content
 * - seed db content
 */
const getCourseIDs = async () => {
  courseSchema
    .find()
    .select('_id')
    .then((courses) => {
      DEBUG && console.log('course IDs:\n', courses) //* logging data results
      DEBUG && console.log('course IDs length:\n', courses.length) //* logging data results
      return courses
    })
    .then(async (courses) => {
      const content = await generateContent(courses)
      return content
    })
    .then(async (content) => {
      console.log('generating done.\ndoing create...')
      await createContent(content)
    })
    .then(() => {
      console.info(
        '-------------------------------------------------------------\n------------------- SEEDED SUCCESSFULLY... ------------------\n-------------------------------------------------------------'
      )
    })
    .catch((err) => console.error(err))
}

// * database querying functions *//
const deleteAllContent = async () => {
  contentSchema
    .deleteMany()
    .then((result) => console.info({ message: 'deleted all Content', result }))
    .catch((err) => console.error(err))
}

const createContent = async (content) => {
  contentSchema
    .create(content)
    .then((result) => console.log(result))
    .catch((err) => console.error(err))
}

// * ------------------------------- *//

//* data generation functions *//
const generateContent = async (courses) => {
  const content = []
  // * doing generate in 2 passes, due to memory issues, first pass below
  const generateLength = Math.floor(courses.length / 2)
  for (let i = 0; i < generateLength; i++) {
    DEBUG && console.log('generating at i:', i)
    for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
      let newContent = Object.assign({}, content)
      newContent.courseID = courses[i]._id
      newContent.type = contentTypes[Math.floor(Math.random() * contentTypes.length)]
      newContent.length = contentLengths[Math.floor(Math.random() * contentLengths.length)]
      if (newContent.type === 'link') {
        newContent.data = faker.internet.url()
      } else {
        newContent.data = faker.lorem.paragraphs(4, '<br/>\n')
      }
      content.push(newContent)
    }
  }

  DEBUG && console.log('All content:', content) //* logging data results
  return content
}

//* ------------------------------- *//

/**
 * @description This function seeds database with: **course content**
 * #### currently works (manually) in 2 passes, each for half of the array
 */
async function seedDB() {
  DEBUG &&
    console.info(
      '-------------------------------------------------------------\n------------------- SEEDING DATABASE... ---------------------\n-------------------------------------------------------------'
    )
  //* delete old content
  // await deleteAllContent()

  //* generate Content then insert them into the database
  const courses = await getCourseIDs()
  // * not working currently, alternative is working in getCourseIDs()
  // const content = await generateContent(courses)
  // await createContent(content)
}

module.exports = { seedDB }
