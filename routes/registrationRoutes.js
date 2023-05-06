const express = require("express");
const router = express.Router();
const {get_signup,post_signup } = require("../controllers/registrationController")

router.get("/", get_signup );
router.post("/", post_signup);

module.exports = router;