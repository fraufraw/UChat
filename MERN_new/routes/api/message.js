// routes/api/posts.js

const express = require('express');
const router = express.Router();

// Load post model
const Message = require('../../models/Message');

// @route GET api/posts/test
// @description tests posts route
// @access Public
router.get('/test', (req, res) => res.send('message route testing!'));

//  api/posts
//  Get all messages
router.get('/', (req, res) => {
    Message.find()
      .then(messages => res.json(messages))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });

// api/posts   req.params.typeId是传入的参数，下面的:id 同理
//  Get all messages by post id
router.get('/:typeId', (req, res) => {
  Message.find({Postid: req.params.typeId})
    .then(message => res.json(message))
    .catch(err => res.status(404).json({ nopostsfound: 'No messages found' }));
});

// @route GET api/message/:typeId
// Delete message by post id
router.delete('/:typeId', (req, res) => {
    Message.deleteMany({Postid: req.params.typeId})
      .then(message => res.json({ mgs: 'Message entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a Message' }));
  });

router.delete('/:postId/:messageid', (req, res) => {
    Message.findOneAndDelete({Postid: req.params.postId, _id: req.params.messageid})
      .then(message => res.json({ mgs: 'Message entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a Message' }));
  });

// api/message/:Messid
// Update message
router.put('/:Messid', (req, res) => {
  //Message.findOneAndUpdate({ text: req.params.Messid}, req.body)
  Message.findByIdAndUpdate(req.params.Messid, req.body)
      .then(message => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });


// api/posts
// add/save post
router.post('/', (req, res) => {
    Message.create(req.body)
      .then(message => res.json({ msg: 'Message added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this post' }));
  });



module.exports = router;