const mongoose = require('mongoose')
const learner = require('../../models/Learner')

const getLearners = async (req, res) => {
    try {
        const learners = await learner.find();
        return {"learners" : learners};
    } catch (error) {
        console.error("error : couldn't get Learners", error);
        return null;
    }
}
const getOneLearner = async (req, res) => {
    try {
        const doc = await learner.findOne(req.body.condition).exec();
        return doc;
    } catch (error) {
        console.error("error : couldn't get Learner", error);
        return null;
    }
}
const updateLearner = async (req, res) => {
    try {
        var doc = await getOneLearner(req,res)
        Object.keys(req.body.updatedata).forEach(key => {
            doc[key] = req.body.updatedata[key];
        })
        await doc.save();
        res.status(200).send()
        return doc
    } catch (error) {
        console.error("error : couldn't update Learner", error);
        return null;
    }
}
module.exports = {getLearners,updateLearner,getOneLearner}