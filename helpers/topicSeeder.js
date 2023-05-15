const courseSchema = require('../models/course')
const { topicTitle } = require('./topicTitle')

const DEBUG = true

const insertTitleTags = async () => {
  for (let i = 0; i < topicTitle.length; i++) {
    DEBUG && console.log('generating at i:', i)
    const filter = { title: topicTitle[i].title }
    const update = { topic: topicTitle[i].topic }
    DEBUG && console.log('filter:', filter, 'update:', update)
    await courseSchema.findOneAndUpdate(filter, update)
  }
  console.info(
    '-------------------------------------------------------------\n------------------- SEEDED SUCCESSFULLY... ------------------\n-------------------------------------------------------------'
  )
}

async function seedTopics() {
  console.info(
    '-------------------------------------------------------------\n------------------- SEEDING DATABASE... ---------------------\n-------------------------------------------------------------'
  )

  //* mathes topics with tags then insert into  database
  await insertTitleTags()
}

module.exports = { seedTopics }
