const express = require("express");
const router = express.Router();

router.get('/outline',function(req,res){
    res.render('outline_page.ejs')
    });
    module.exports= router;