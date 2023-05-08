    const profileSchema=require('../models/learner');
    const { get_session_loggedIn } = require("../middleware/sessionMiddleWare");
    const profileController=  async(req,res) => {
          const user_id = get_session_loggedIn(req);
          const userQuery = profileSchema.findOne({_id:user_id});
          const user = await userQuery.exec();
          console.log(user_id);
          console.log("im in profile");
          console.log('user data:', user);
          res.render("profile", {title:'profile' , user });
    }
    const profileControllerPost = async (req, res) => {
      const user_id = get_session_loggedIn(req);
      const userData = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (!emailRegex.test(userData.email)) {
        let error = 'Invalid email address'
        const user = await profileSchema.findOne({_id:user_id});
        res.render('profile', { title: 'profile', user, error })
        return
      }
      console.log(user_id.body);
      console.log('profile data');
      profileSchema.findOneAndUpdate(
        {_id:user_id},
        { $set: userData 
        },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error updating user data');
          }
          console.log('User data updated:', updatedUser);
          return res.status(200).send('User data updated successfully');
        }
      );
    };
    module.exports={profileController,profileControllerPost}

    