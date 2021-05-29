// models/Posts.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Inital Title"
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  published_date: {
    type: String
  },
  publisher: {
    type: String
  },
  updated_date: {
    type: String,
    //default: Date.now
  },
  Liked_number:{
    type: Number,
    default: 0
  }

});

module.exports = Post = mongoose.model('post', PostSchema);