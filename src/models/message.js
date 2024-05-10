// models/message.js

const mongoose = require('mongoose');

const schedusendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  },
  recipientName: {
    type: String,
    required: true
  },
  recipientNumber: {
    type: String,
    required: true
  },
  messageContent: {
    type: String,
    required: true
  },
  sendTime: {
    type: Date,
    required: true
  }
});

const Message = mongoose.model('Message', schedusendSchema);

module.exports = Message;
