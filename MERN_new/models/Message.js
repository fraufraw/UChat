// models/Posts.js

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Guest'
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  Postid:{
    type: String,
    required:true
  },
  Message_liked_number:{
    type: Number,
    default: 0
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);