const mongoose = require('mongoose')
const learner = require('../models/learner.test')

const getLearners = async (req, res) => {
  try {
    let query = req.query
    let skip = query.offset || 0
    let limit = query.limit || 0
    let search = query.search || ''
    const subtext = '?limit'
    let index = search.indexOf(subtext)
    if (index !== -1) {
      search = search.substring(0, index)
    }
    let learners = await learner
      .find({ name: { $regex: search, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .exec()
    return { learners: learners, count: await learner.estimatedDocumentCount() }
  } catch (error) {
    console.error("error : couldn't get Learners", error)
    return null
  }
}
const getOneLearner = async (condition) => {
  try {
    let doc = await learner.findOne(condition).exec()
    return doc
  } catch (error) {
    console.error("error : couldn't get Learner", error)
    return null
  }
}
const updateLearner = async (req, res) => {
  function hasNonSpaceCharacters(str) {
    return /\S/.test(str)
  }
  try {
    let message = {}
    let doc = await getOneLearner(req.body.condition)
    Object.keys(req.body.updatedata).forEach(async (key) => {
      req.body.updatedata.email = req.body.updatedata.email.trim()
      if (await getOneLearner(req.body.updatedata)) {
        message = {
          action: 'Updating ' + doc[key],
          status: 'fail',
          reason: 'Value Must Be Unique'
        }
        let jsonRes = { message: "Couldn't update " + key, changes: message }
        res.status(400).send(jsonRes)
        return null
      } else if (!doc) {
        message = {
          action: 'Updating ' + doc[key],
          status: 'fail',
          reason: "Value to be Updated Doesn't Exist"
        }
        let jsonRes = { message: "Couldn't update " + key, changes: message }
        res.status(400).send(jsonRes)
        return null
      } else if (hasNonSpaceCharacters(req.body.updatedata[key])) {
        message = {
          action: 'Updating ' + doc[key] + ' to ' + req.body.updatedata[key].trim(),
          status: 'success'
        }
        doc[key] = req.body.updatedata[key].trim()
        let jsonRes = { message: 'Update Success ' + key, changes: message }
        res.status(200).json(jsonRes)
        await doc.save()
      } else if (!hasNonSpaceCharacters(req.body.updatedata[key])) {
        message = {
          action: 'Updating ' + doc[key],
          status: 'fail',
          reason: 'No Value'
        }
        let jsonRes = { message: "Couldn't update " + key, changes: message }
        res.status(400).send(jsonRes)
      }
    })
  } catch (error) {
    console.error("error : couldn't update Learner", error)
    res.status(500)
  }
}
module.exports = { getLearners, updateLearner, getOneLearner }
