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
    required:false
},
totalHours:{
    type:Number,
    default:0,
    required:false
},
enrolledUsers:{
    type:Number,
    default:0,
    required:false
},
rating:{
    type:Number,
    required:false,
    default:0
},
stars:{
    type:Number,
    required:false
},
topicID:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Topic'
},
publishedAt:{
    type:Number,
    required:false
},
view:{
    type:Number,
    required:false
},
assessments:{
    type:String,
    required:false,
    default:'After each topic',
},
tags:{
    type:String,
    required:false,
},
},{timestamps:true});

module.exports = mongoose.model("Course", courseSchema);
