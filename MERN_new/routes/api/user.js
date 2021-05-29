// routes/api/user.js

const express = require('express');
const router = express.Router();

// Load userInfo model
const User = require('../../models/User');

// @route GET api/posts/test
// @description tests posts route
// @access Public
router.get('/test', (req, res) => res.send('message route testing!'));

// @route GET api/user
// @description Get all user
// @access Public
/*
router.get('/', (req, res) => {
    User.find()
      .then(userinfo => res.json(userinfo))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });
*/

// @route GET api/posts   req.params.typeId是传入的参数，下面的:id 同理
// @description Get all posts
// @access Public
router.get('/:username', (req, res) => {
  User.find({username: req.params.username})
    .then(userinfo => res.json(userinfo))
    .catch(err => res.status(404).json({ nopostsfound: 'No user found' }));
});

// @route GET api/posts/:id
// @description Delete post by id
// @access Public
router.delete('/:username', (req, res) => {
  User.delete({username: req.params.username})
    .then(post => res.json({ mgs: 'user deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

// @route GET api/posts/:id
// @description Update post
// @access Public
router.put('/', (req, res) => {
    User.findByIdAndUpdate(req.params.username, req.body)
      .then(post => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

// @route GET api/posts
// @description add/save post
// @access Public
router.post('/', (req, res) => {
    User.create(req.body)
      .then(post => res.json({ msg: 'register successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to register' }));
  });



module.exports = router;