    const profileSchema=require('../models/learner');
    const { get_session_loggedIn } = require("../middleware/sessionMiddleWare");
    const profileController= async (req,res) => {
          const user_id = get_session_loggedIn(req);
          const user = profileSchema.findOne(user_id);
          console.log(user_id);
          console.log("im in profile");
          res.render("profile", {title:'profile' , user});
    }
    const profileControllerPost = (req, res) => {
      const user_id =  get_session_loggedIn(req);
      const userData = req.body;
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

    