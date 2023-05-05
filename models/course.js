const mongoose = require('mongoose');

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
    required:false
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
},{timestamps:true});

module.exports =  mongoose.model('Course', courseSchema)
