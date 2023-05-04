const express = require("express");
const router = express.Router();

const home_controllers = require("../controllers/homeControllers");

router.get("/home", home_controllers.get_home);

module.exports = router;
