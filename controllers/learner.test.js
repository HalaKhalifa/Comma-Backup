const mongoose = require('mongoose')
const learner = require('../models/learner.test')
const Course = require('../models/course.test.js')

const getCountryLearners = async () => {
  try {
    const countryCounts = await learner.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      }
    ])

    return countryCounts
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get country learners')
  }
}

const getLearners = async () => {
  try {
    const learners = await learner.find()
    return learners
  } catch (error) {
    console.error("error : couldn't get Learners", error)
    return null
  }
}
const getOneLearner = async (req, res) => {
  try {
    const doc = await learner.findOne(req.body.condition).exec()
    return doc
  } catch (error) {
    console.error("error : couldn't get Learner", error)
    return null
  }
}
const updateLearner = async (req, res) => {
  try {
    var doc = await getOneLearner(req, res)
    Object.keys(req.body.updatedata).forEach((key) => {
      doc[key] = req.body.updatedata[key]
    })
    await doc.save()
    res.status(200).send()
    return doc
  } catch (error) {
    console.error("error : couldn't update Learner", error)
    res.status(500)
  }
}

const getNoOflearner = async (req, res) => {
  try {
    const NoOflearner = await learner.countDocuments()
    return NoOflearner
  } catch (err) {
    // error
    console.error(err)
    res.status(500).send('Internal server error')
  }
}

const getTotalEnrolledUserCount = async () => {
  try {
    const courses = await Course.find() // retrive all doc as a array
    let totalEnrolledUserCount = 0

    courses.forEach((course) => {
      totalEnrolledUserCount += course.enrolledUsers.length
    })
    /* enrolledUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ], should Be Like this ,  as array  */
    return totalEnrolledUserCount
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
}
//returns a promise

//executed when the promise returned by getTotalEnrolledUserCount()
getTotalEnrolledUserCount()
  .then((count) => {
    //console.log('Total enrollment count:' );  testing .
    return count
  })
  .catch((error) => {
    console.error(error)
  })

// NoofRegistrationPerMonth
const NoOfMonthlyRegistration = async () => {
  try {
    const registrationCountByMonth = await learner.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ])

    return registrationCountByMonth //array of objects
  } catch (error) {
    console.error(error)
    throw new Error('Failed to retrieve monthly registration count')
  }
}
NoOfMonthlyRegistration()
  .then((registrationCountByMonth) => {
    return registrationCountByMonth
  })
  .catch((error) => {
    console.error(error)
  })

module.exports = {
  getLearners,
  updateLearner,
  getOneLearner,
  getNoOflearner,
  getTotalEnrolledUserCount,
  NoOfMonthlyRegistration,
  getCountryLearners
}
