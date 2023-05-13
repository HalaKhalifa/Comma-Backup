const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    outline: {
      type: String,
      required: false
    },
    isDeleted:{
      type:Boolean,
      default:false
    },
    totalHours: {
      type: Number,
      default: 0,
      required: false
    },
    enrolledUsers: {
      type: Number,
      default: 0,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    stars: {
      type: Number,
      required: false
    },
    topicID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic'
    },
    publishedAt: {
      type: Number,
      required: false
    },
    view: {
      type: Number,
      required: false
    },
    assessments: {
      type: String,
      required: true,
      default: 'After each topic'
    },
    tags: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', courseSchema)
