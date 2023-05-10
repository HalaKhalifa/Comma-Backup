const User = require('../models/learner')
const get_admin_learner_data = async (req, res) => {
  try {
    const learners = await User.find({ status: { $in: [0, 1] } })
    const learnerArray = learners.map((learner) => [
      learner.firstname,
      learner.email,
      learner.password,
      learner.status,
      
      
    ]) // Modify the properties as needed

    console.log(learnerArray, 'from get')
    res.render('TableAdmintoLearner/tableAdminLearner', {
      learnerArray
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
const adminGetLearner = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const { firstName, lastName, email: userEmail } = user;
    return res.status(200).json({ firstName, lastName, email: userEmail });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}
const update_learner_admin=async (req,res)=>{
  
  const userData = req.body
  console.log(user_id.body)
  console.log('profile data')
  learner.findOneAndUpdate(
    { _id: user_id },
    { $set: { ...userData, updatedAt: new Date() } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Error updating user data')
      }
      console.log('User data updated:', updatedUser)
      return res.status(200).send('User data updated successfully')
    }
  )  
};
module.exports = get_admin_learner_data
