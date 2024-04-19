const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user model
  timestamp: { type: Date, default: Date.now() }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
