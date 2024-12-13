const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  usrName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
