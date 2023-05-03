const learner = require('../models/learner');
const mongoose  = require('mongoose');


const getLearnersList = async (req,res) => {

    const learners = await learner.find().sort({createdAt: -1}); // -1 mean desc

    res.status(200).json(learners);

}

const getLearner = async (req,res) => {

    const {id} = req.params;

    const learner = await learner.findById(id);

    if ( !learner ) {
        return res.status(404).json({error: 'No such learner'});
    }

    res.status(200).json(learner);
}


const createNewLearner = async (req,res) => {
    const {  firstName,lastName,email} = req.body;

    try{
        const newLearner = await learner.create({
            'firstName':  firstName,
            'lastName':  lastName,
            'email':email ,
        })

        res.status(200).json(newLearner)

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createNewLearner,
    getLearnersList,
    getLearner
}