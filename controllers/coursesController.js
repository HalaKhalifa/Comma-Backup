const Course = require("../models/course");

const getCoursesList = async (req,res) => {

    const courses = await Course.find().sort({createdAt: -1}); // -1 mean desc

    res.status(200).json(courses);

}

const getCourse = async (req,res) => {

    const {id} = req.params;

    const singleCourse = await Course.findById(id);

    if ( !singleCourse ) {
        return res.status(404).json({error: 'No such course'});
    }

    res.status(200).json(singleCourse);
}

const createNewCourse = async (req,res) => {
    const {  title,image,description,outline,totalHours,enrolledUsers,rating,stars,topicID,publishedAt,view} = req.body;

    try{
        const newCourse = await Course.create({
            'title':title,
            'image':image,
            'description':description,
            'outline':outline,
            'totalHours':totalHours,
            'enrolledUsers':enrolledUsers,
            'rating':rating,
            'stars':stars,
            'topicID':topicID,
            'publishedAt':publishedAt,
            'view':view,
        })

        res.status(200).json(newCourse)

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const updateCourse = async (req,res) => {

    const {id} = req.params;

    try{

        const {  title,image,description,outline,totalHours,enrolledUsers,rating,stars,topicID,publishedAt,view} = req.body;
    
        const singleCourse = await Course.findOneAndUpdate({_id: id}, {
            'title':title,
            'image':image,
            'description':description,
            'outline':outline,
            'totalHours':totalHours,
            'enrolledUsers':enrolledUsers,
            'rating':rating,
            'stars':stars,
            'topicID':topicID,
            'publishedAt':publishedAt,
            'view':view,
        });

        if ( !singleCourse ) {
            return res.status(404).json({error: 'No such course.'})
        }

        res.status(200).json(singleCourse);

    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteCourse = async (req,res) => {

    const {id} = req.params;

    const singleCourse = await Course.findOneAndDelete({_id: id});

    if ( !singleCourse ) {
        return res.status(404).json({error: 'No such course.'})
    }

    res.status(200).json(singleCourse);
}


module.exports ={
    getCoursesList,
    getCourse,
    createNewCourse,
    updateCourse,
    deleteCourse
}