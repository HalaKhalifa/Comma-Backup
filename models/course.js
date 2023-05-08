const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
 title :{
    type :String,
    required:true
 },
 description :{
    type :String,
    required:true
 },
 image:{
    type :String,
    required:true
 },
outline:{
    type :String,
    required:true
},
totalHours:{
    type:Number,
    default:0,
    required:true
},
enrolledUsers:{
    type:Number,
    default:0,
    required:true
},
rating:{
    type:Number,
    required:true,
    default:0
},
stars:{
    type:Number,
    required:true
},
topicID:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Topic'
},
publishedAt:{
    type:Number,
    required:true
},
view:{
    type:Number,
    required:true
},
assessments:{
    type:String,
    required:true,
    default:'After each topic',
},
tags:{
    type:String,
    required:false,
},
},{timestamps:true});

module.exports = mongoose.model("Course", courseSchema);
