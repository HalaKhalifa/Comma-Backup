const express = require("express");
const router = express.Router();
const courseController = require("../controllers/paginationController");
const isLoggedIn = require('../middleware/isLoggedIn');

router.use(isLoggedIn);


router.get("/courses",courseController.paginationResult);

module.exports = router;