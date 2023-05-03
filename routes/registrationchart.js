//Must 
const express = require('express')
const router = express.Router();
const {regestrationFun} = require("../controllers/registrationchart")
router.get('/', (req, res) => {
  regestrationFun(req,res);
  })

module.exports = router;



// keyworld , function in the controller 
// place of function 
