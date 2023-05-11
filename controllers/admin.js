const learner = require('../models/learner')
const validator = require('validator')
const bcrypt = require('bcrypt')

const firstNameRegex = /^[a-zA-Z]{2,50}$/
const lastNameRegex = /^[a-zA-Z]{2,50}([-'][a-zA-Z]{2,50})?$/

const updateAdmin = async (req, res) => {
  try {
    const doc = await learner.findOne({ email: req.body.targetEmail }).exec()
    const storage = { data: req.body }
    let msg = {}
    let keys = []
    let errorFlag = false
    const errorSet = (key) => {
      keys.push(key)
      msg.keys = keys
      msg.error = ' is invalid'
      errorFlag = true
    }
    delete req.body.targetEmail
    for (const key of Object.keys(req.body)) {
      const value = req.body[key].trim()
      if (key === 'firstname' && !validator.matches(value, firstNameRegex)) errorSet(key)
      if (key === 'lastname' && !validator.matches(value, lastNameRegex)) errorSet(key)
      if (key === 'email' && !validator.isEmail(value)) errorSet(key)
      if (key === 'password' && validator.isStrongPassword(value)) {
        const hashedPass = await bcrypt.hash(value, 10)
        doc[key] = hashedPass
      } else if (key === 'password' && !validator.isStrongPassword(value)) {
        errorSet(key)
      }
      if (key !== 'password' && !errorFlag) {
        doc[key] = value
      }
    }
    if (errorFlag) {
      return res.status(400).json({ storage, msg: msg, status: 'Fail' })
    }
    if (!errorFlag) {
      await doc.save()
      return res.status(200).json({ msg: 'Updated Successfully', status: 'Success' })
    }
  } catch (error) {
    console.error("error : couldn't update admin", error)
    res.status(500)
  }
}
const deleteAdmin = async (req, res) => {
  try {
    email = req.body.email
    const doc = await learner.findOne({ email: email }).exec()
    doc['isDeleted'] = true
    console.log('deleted ' + doc['email'])
    await doc.save()
    return res.status(200).json({ msg: 'Deleted Successfully', status: 'Success' })
  } catch (error) {
    console.error("error : couldn't delete admin", error)
    res.status(500)
  }
}
module.exports = { updateAdmin, deleteAdmin }
