const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date_time: {
    type: Date,
    default: Date.now,
    required: true
  },
  file_name: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
