const express = require('express');
const router = express.Router();
const {getNumbersOfCoursesCreatedInPrevYear} = require("../controllers/course")

router.get('/courses-count', async (req, res) => {
    try {
      const counts = await getNumbersOfCoursesCreatedInPrevYear(req,res)
      res.json({ coursesCounts: counts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting course counts.' });
    }
  });

module.exports = router;