// routes/api/posts.js

const express = require('express');
const router = express.Router();

// Load post model
const Message = require('../../models/Message');

// @route GET api/posts/test
// @description tests posts route
// @access Public
router.get('/test', (req, res) => res.send('message route testing!'));

// @route GET api/posts
// @description Get all posts
// @access Public
router.get('/', (req, res) => {
    Message.find()
      .then(messages => res.json(messages))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });

// @route GET api/posts   req.params.typeId是传入的参数，下面的:id 同理
// @description Get all posts
// @access Public
router.get('/:typeId', (req, res) => {
  Message.find({Postid: req.params.typeId})
    .then(message => res.json(message))
    .catch(err => res.status(404).json({ nopostsfound: 'No messages found' }));
});

// @route GET api/posts/:id
// @description Delete post by id
// @access Public
router.delete('/:typeId', (req, res) => {
    Message.deleteMany({Postid: req.params.typeId})
      .then(message => res.json({ mgs: 'Message entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a Message' }));
  });

// @route GET api/message/:Messid
// @description Update message
// @access Public
router.put('/:Messid', (req, res) => {
  //Message.findOneAndUpdate({ text: req.params.Messid}, req.body)
  Message.findByIdAndUpdate(req.params.Messid, req.body)
      .then(message => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  /* 
router.put('/', (req, res) => {
    //Message.findOneAndUpdate({ _id: req.params.Messid}, req.body.Message_liked_number)
    Message.updateMany(req.body)
      .then(message => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });
*/
// @route GET api/posts
// @description add/save post
// @access Public
router.post('/', (req, res) => {
    Message.create(req.body)
      .then(message => res.json({ msg: 'Message added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this post' }));
  });



module.exports = router;