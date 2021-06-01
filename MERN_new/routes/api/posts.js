// routes/api/posts.js

const express = require('express');
const router = express.Router();

// Load post model
const Post = require('../../models/Posts');

// @route GET api/posts/test
// @description tests posts route
// @access Public
router.get('/test', (req, res) => res.send('post route testing!'));

// @route GET api/posts
// @description Get all posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});



// @route GET api/posts/:id
// @description Get single post by id
// @access Public
router.get('/:getid', (req, res) => {
  Post.findById(req.params.getid)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No Post found' }));
});

// @route GET api/posts
// @description add/save post
// @access Public
router.post('/', (req, res) => {
  Post.create(req.body)
    .then(post => res.json({ msg: 'Post added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this post' }));
});

// @route GET api/posts/:id
// @description Update post
// @access Public
router.put('/:postid', (req, res) => {
  Post.findByIdAndUpdate(req.params.postid, req.body)
    .then(post => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/posts/:id
// @description Delete post by id
// @access Public
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.json({ mgs: 'Post entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a Post' }));
});

module.exports = router;