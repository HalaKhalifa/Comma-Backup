const Course = require('../models/course')

const getNumbersOfCoursesCreatedInPrevYear = async (req, res) => {
    try {
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const interval = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

        const courseCounts = [];

        for (let i = 0; i < 12; i++) {
            const startDate = new Date(monthAgo.getTime() + interval * i);
            const endDate = new Date(startDate.getTime() + interval);

            const count = await Course.countDocuments({
            createdAt: {
            $gte: startDate,
            $lt: endDate,
            },
  });

  courseCounts.push(count);
}

return courseCounts ;
    } catch (error) {
        console.error("error : couldn't get Courses", error);
        return null;
    }
}
module.exports = {getNumbersOfCoursesCreatedInPrevYear}