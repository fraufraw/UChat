/// routes/api/posts.js

const express = require('express');
const router = express.Router();

// Load post model
const Post = require('../../models/Posts');
const Message = require('../../models/Message');

router.post('/', (req, res) => {
  Message.find({text: {$regex: req.body.text}})//{$exists: req.body.title}
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No Messages found' }));
});


module.exports = router;