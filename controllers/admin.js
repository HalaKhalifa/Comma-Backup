const learner = require('../models/learner')

const updateLearner = async (req, res) => {
  try {
    const doc = await learner.findOne({ email: req.body.targetEmail }).exec()
    console.log(doc)
    // Object.keys(req.body).forEach(async (key) => {})
  } catch (error) {
    console.error("error : couldn't update Learner", error)
    res.status(500)
  }
}
module.exports = { updateLearner }
