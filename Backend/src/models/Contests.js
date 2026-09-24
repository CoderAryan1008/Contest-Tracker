//Abb humme yaahan define karna hain schema and model for fetching and updating the data in db
const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['codeforces', 'codechef', 'leetcode'],
    required: true
  },
  externalId: {
    type: String,
    required: true

  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  durationSeconds: {
    type: Number,
    required: true
  },
  lastSyncedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// prevents duplicate contests when the same contest is fetched again on the next sync
contestSchema.index({ platform: 1, externalId: 1 }, { unique: true });

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;