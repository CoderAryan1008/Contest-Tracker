// models/Reminder.js
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
    required: true
  },
  calendarEventId: {
    type: String,
    required: true
    // Google's own ID for the created event — needed later to delete/update it
  }
}, { timestamps: true });

// prevents the same user from setting a duplicate reminder for the same contest
reminderSchema.index({ userId: 1, contestId: 1 }, { unique: true });

const Reminder = mongoose.model("Reminder", reminderSchema);//Abb humme iss model ki help se db pe attack karna hain

module.exports = Reminder;