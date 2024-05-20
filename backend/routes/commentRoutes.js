const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');

// Route to get all comments by photo ID
router.get('/photos/:photoId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ photo_id: req.params.photoId });
    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to add a comment to a photo
router.post('/photos/:photoId/comments', async (req, res) => {
  try {
    const { user_id, text } = req.body;
    const user = await User.findById(user_id);
    const newComment = new Comment({
      photo_id: req.params.photoId,
      user,
      text,
      date_time: new Date()
    });
    await newComment.save();
    res.json(newComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
