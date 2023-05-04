const mongoose = require('mongoose')
const learner = require('../models/learner.test')

const getLearners = async () => {
    try {
        const learners = await learner.find();
        return learners;
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
        res.status(500)
    }
}
module.exports = {getLearners,updateLearner,getOneLearner}