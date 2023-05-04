const router = express.Router()

router.get("/courses", (req, res) => {

    const rating = 4;
    const courseIMG=["/images/course.jpg" ,"/images/python-course.jpg","/images/machine-learning.jpg" ,"/images/data_analytics.jpg"]
    const coursesNames= ['Data Science: Deep Learning and Neural Networks in Python','The Complete Python Programming Course','Fullstack Python & Django','Python Network Programming for Network Engineers (Python 3)'];
    res.render("coursesPage", { title: "courses page" ,coursesNames:coursesNames ,courseIMG:courseIMG});
  });