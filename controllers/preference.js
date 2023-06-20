const learner = require('../models/learner')
const { get_session_loggedIn } = require('../middleware/sessionMiddleWare')
const post_preferences = async (req, res) => {
  let learnerId = get_session_loggedIn(req)
  let error = ''
  if (learnerId == null) {
    error = 'Please  Login'
    res.render('pages/learner/login', { title: 'login in', error ,isLoggedIn: learnerId})
    return
  }
  if (req.body.actionFlag2 === 'actionApply') {
    try {
      const learnerSchema = learner.schema
      const typeDefaultValue = learnerSchema.path('preferences.type').options.default
      const lengthDefaultValue = learnerSchema.path('preferences.length').options.default
      const assessmentsDefaultValue = learnerSchema.path('preferences.assessment').options.default
      const collaborativeDefaultValue = learnerSchema.path('preferences.collaborative').options
        .default
      const applyForAllCoursesDefaultValue = learnerSchema.path('preferences.applyForAllCourses')
        .options.default
      console.log(req.body.id)
      const userData = {
        'preferences.length': lengthDefaultValue,
        'preferences.type': typeDefaultValue,
        'preferences.assessment': assessmentsDefaultValue,
        'preferences.collaborative': collaborativeDefaultValue,
        'preferences.applyForAllCourses': applyForAllCoursesDefaultValue
      }

      await learner.findByIdAndUpdate(learnerId, { $set: userData }, { new: true })

      return res.redirect(`/courses`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  } else {
    let tempApply
    let tempCollaborative
    const { content, length, assessments, applyForAllCourses, collaborative } = req.body

    let error = ''

    try {
      if (!content || !length || !assessments) {
        error = 'Please select all fields'
        res.status(500).json(error)
        return
      }

      if (applyForAllCourses) {
        tempApply = true
      } else {
        tempApply = false
      }

      if (collaborative) {
        tempCollaborative = true
      } else {
        tempCollaborative = false
      }

      const userData = {
        'preferences.type': content,
        'preferences.length': length,
        'preferences.assessment': assessments,
        'preferences.collaborative': tempCollaborative,
        'preferences.applyForAllCourses': tempApply
      }

      await learner.findByIdAndUpdate(learnerId, { $set: userData }, { new: true })

      return res.redirect(`/courses`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }
}
module.exports = {
  post_preferences
}
