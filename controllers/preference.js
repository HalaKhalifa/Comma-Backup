const Preference = require('../models/preference')
const post_preferences = async (req, res) => {
  req.body
  if (req.body.actionFlag2 == 'actionApply') {
    const preference = new Preference({})

    try {
      await preference.save()
      return res.redirect('/outline')
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  } else {
    let tempApply
    let tempCollaborative
    const { content, length, assessments, applyForAllCourses, collaborative } = req.body
    let error = ''
    if (!content || !length || !assessments) {
      error = 'Please Select all fields'
      res.status(500).json(error)
      return
    }
    if (applyForAllCourses) tempApply = true
    else tempApply = false

    if (collaborative) tempCollaborative = true
    else tempCollaborative = false
    //messageBoxx();
    //const confirmResult = window.confirm(`Please check all values you entered:\nContent = ${content}\nLength = ${length}\nAssessments = ${assessments}\nDo you want to apply for all courses? ${tempApply}\nCollaborative? ${tempCollaborative}`)
    // if (!confirmResult) {
    // return // if the user clicks "Cancel" on the dialog box, stop the function
    //}
    const preference = new Preference({
      content: content,
      length: length,
      assessments: assessments,
      applyForAllCourses: tempApply,
      collaborative: tempCollaborative
    })
    try {
      var text
      await preference.save()
      return res.redirect('/outline')
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  }
}

module.exports = {
  post_preferences
}
function messageBoxx() {
  //if (confirm("Please Check All Values You Enter If Ok Please Press Confirm /n Content = "+content+"/n Length = "+length+"/n Assesments = "+assessments + "/n Do You Want To Apply For All Courses ?" + tempApply + "/n Collaborative " + tempCollaborative))
  // window.confirm("do you want to eat");
}
