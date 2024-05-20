const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Photo = require('../models/Photo');

// Route to get user by ID
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/user/:user_id/photos', async (req, res) => {
    const userId = req.params.user_id;
  
    try {
      const photos = await Photo.find({ user_id: userId });
      res.json(photos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
