const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/Photo');
const Comment = require('../models/Comment');
const path = require('path');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const fileName = req.file.filename;
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`; // Create the full URL

    const newPhoto = new Photo({
      file_name: fileUrl, // Save the URL to the photo
      user_id: req.body.user_id, // Assume user_id is provided in the request body
      date_time: new Date(),
      comments: [] // Initialize comments array
    });

    await newPhoto.save();
    res.json(newPhoto);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to get all photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


router.get('/photos/:photoId', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    res.json(photo);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
