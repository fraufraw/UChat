/// routes/api/posts.js

const express = require('express');
const router = express.Router();

// Load post model
const Post = require('../../models/Posts');

router.post('/', (req, res) => {
  Post.find({title: {$regex: req.body.title}})//{$exists: req.body.title}
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

module.exports = router;
