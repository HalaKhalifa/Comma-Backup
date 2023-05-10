const User = require('../models/learner')

const get_admin_learner_data = async (req, res) => {
  try {
    const learners = await User.find({ status: { $in: [0, 1] } })
    const learnerArray = learners.map((learner) => [
      learner.firstname,
      learner.email,
      learner.password,
      learner.status,
      
      
    ]) // Modify the properties as needed

    console.log(learnerArray, 'from get')
    res.render('TableAdmintoLearner/tableAdminLearner', {
      learnerArray
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

module.exports = get_admin_learner_data
