
const { get_session_loggedIn } = require("../middleware/sessionMiddleWare");

const get_home = (req, res) => {
  const user_id = get_session_loggedIn(req);
  console.log(user_id);
  console.log("im in home");

  if (user_id) {
    res.render("home", { user: user_id, title: "home" });
  } else {
    res.redirect("login");
  }
};

module.exports = {
  get_home,
};
