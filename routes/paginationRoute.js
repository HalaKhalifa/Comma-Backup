const express = require("express");
const router = express.Router();
const courseController = require("../controllers/paginationController");

router.get("/courses",courseController.paginationResult);

module.exports = router;