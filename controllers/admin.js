const admin = require('../models/admin')

const getAdminsList = async (req, res) => {
  try {
    const admins = await admin.find().sort({ createdAt: -1 }) // -1 mean desc
    console.log(admins)
    res.status(200).json(admins)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  getAdminsList
}
