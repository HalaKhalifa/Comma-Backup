const learner = require('../models/learner') // SHOULD BE ADMIN SCHEMA BUT SINCE WE DON"T HAVE THAT YET USING LEARNER SCHEMA FOR NOW !!!
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
const admin = require('../models/admin')

const getAllAdmins = async (req, res) => {
  try {
    let { limit, offset, search, sort } = req.query
    if (search !== undefined) {
      search = search?.split('?')[0]
      limit = limit?.split('?')[0]
    }
    limit[1] && (limit = limit[1])
    sort = sort?.split('?')[0] || 'asc'
    const admins = await admin
      .find({
        $or: [
          { firstname: { $regex: search || '' } },
          { lastname: { $regex: search || '' } },
          { email: { $regex: search || '' } }
        ]
      })
      .skip(offset)
      .limit(limit)
      .sort({ firstname: sort === 'asc' ? 1 : -1 })
    const adminsCount = search == undefined ? await getAdminCount() : admins.length
    const adminsData = {
      results: admins,
      count: adminsCount
    }
    res.json(adminsData)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function getAdminCount() {
  try {
    const adminSum = await admin.count()
    return adminSum
  } catch (error) {
    console.error("error : couldn't get Courses", error)
    return null
  }
}

module.exports = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin
}
