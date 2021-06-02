// models/Posts.js

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  Postid:{
    type: String,
    required:true
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);