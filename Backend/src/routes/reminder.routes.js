//Abb humme yaahan reminder ke liye routes set karna hain jisse hum remove kar paaye and check bhi kar paaye current saare event reminders
const { createReminder, deleteReminder, getMyReminders } = require("../controllers/reminderController.js");
const { Router } = require("express");
const AuthUser = require("../middlewares/auth.middleware.js");
const reminderRouter = Router();

reminderRouter.post('/', AuthUser, createReminder);
reminderRouter.delete('/:reminderId', AuthUser, deleteReminder);
reminderRouter.get('/allReminders', AuthUser, getMyReminders);//Isse hum current user ke saare reminders ko fetch kar lenge

module.exports = reminderRouter;