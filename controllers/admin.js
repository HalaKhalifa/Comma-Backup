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
  getAllAdmins
}
