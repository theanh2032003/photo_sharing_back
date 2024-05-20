const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  photo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  text: {
    type: String,
    required: true
  },
  date_time: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
