//Humme yaahan user ka model define karna hain
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  avatar: String,

  // Google Calendar OAuth — separate concern from login (googleId above
  // just proves identity; these are needed specifically for calendar access)
  googleAccessToken: {
    type: String,
    default: null
  },
  googleRefreshToken: {
    type: String,
    default: null
  },
  calendarConnected: {
    type: Boolean,
    default: false
  },

  // linked platform handles — only cfHandle is actively used in v1,
  // ccHandle/lcHandle kept for when those tabs come out of "coming soon"
  cfHandle: {
    type: String,
    default: null
  },
  ccHandle: {
    type: String,
    default: null
  },
  lcHandle: {
    type: String,
    default: null
  },

  createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model('User', userSchema); //Yeh ab saari request kar sakta hain with the db
module.exports = userModel;