//Abb humme yaahan user ke google calender ke andar event banana hain
const { google } = require("googleapis");
const userModel = require("../models/User.js");
const Contest = require("../models/Contests.js");
const Reminder = require("../models/Reminder.js");

//Abb humme yaahan body main hi contestId feed karni hain uske basis pe hum set karenge event ko
// controllers/reminderController.js
const motivationalMessages = [
  "🔥 Bhai rating badhani hai toh contest dena padega, sirf leaderboard dekhne se nahi.",

  "💀 Aaj WA aaye toh tension nahi... kal usi code ko dekh ke khud pe hasi zaroor aayegi.",

  "🚀 Uth jao coder babu, problems tumhara intezaar kar rahi hain... aur rating bhi.",

  "😂 30 minute baad contest hai. Coffee bana le, compiler ko gaali dene ka time aa gaya.",

  "🧠 Dimaag laga bhai, Google pe solution search karne ka option iss baar nahi hai. 😭",

  "⚔️ Aaj ka mission: AC zyada, WA kam, aur confidence unlimited.",

  "🗿 Question dekh ke \"yeh toh easy hai\" bolne se pehle constraints padh lena bhai.",

  "🔥 Rating gir gayi toh screenshot mat lena... comeback story banana.",

  "💀 Contest shuru hone wala hai. Ab pata chalega tera code genius tha ya bas sample test lucky tha.",

  "😎 Bhai aaj kuch bada karte hain... kam se kam first problem toh 10 minute mein karte hain.",

  "🫡 Jo hoga dekha jayega. Pehle contest de, baad mein editorial padh ke expert ban jana.",

  "😂 Aaj ka target: \"I knew this\" bolne ke bajaye actual mein solve karna.",

  "🚨 Alert! Tera future Grandmaster tujhe bula raha hai. Beech mein bas 500 WAs hain.",

  "🧘 Shanti se question padh... jaldi mein submit kiya toh compiler bhi bolega: \"Bhai ruk ja.\"",

  "🏆 Aaj rating points lootne ka din hai. Bhagwan kare TLE na ho aur dimaag timeout na ho.",

  "☕ Chai garam hai, laptop garam hai, bas dimaag thoda thanda rakhna.",

  "💀 Contest mein question solve karne aaye ho, apni zindagi ke decisions rethink karne nahi.",

  "🔥 Aaj ka mantra: Padho → Socho → Code karo → WA aaye → Rona nahi → Dobara karo.",

  "🗿 Competitive programming ka asli rule: Question tough ho toh patience rakho, question easy ho toh overconfidence mat rakho, aur dono mein WA aaye toh laptop band mat karna. 😂",

  "🚀 Rating ko bula raha hoon: \"Beta ghar aa jao, bahut din ho gaye.\"",

  "😂 Bhai contest hai, shaadi ka rishta nahi — reject hone ke baad bhi next problem try karni hai.",

  "🔥 Aaj compiler se dosti kar le, kal wahi tera sabse bada dushman banega.",

  "💀 Pehla question 5 minute mein solve ho gaya? Congratulations, ab overconfidence se baaki contest mat barbaad karna.",

  "🧠 Dimaag ko RAM samajh aur ego ko clear kar — ab contest shuru kar.",

  "🚀 Aaj AC nahi hua toh koi baat nahi, kam se kam rating ko thoda darr toh dikha de.",

  "😭 Test case pass ho gaya? Bhai production mein nahi, contest mein hai — celebration baad mein.",

  "⚔️ Leetcode ho ya Codeforces, jung ek hi hai — question ko dekh ke panic nahi karna.",

  "😎 Aaj ka goal: solve karo, seekho, aur agar kuch nahi hua toh editorial ko guru maan lo.",

  "💪 Ek contest tumhari life nahi badlega... lekin consistently contests dena definitely badal sakta hai.",

  "🏆 Future Grandmaster loading... bas current version mein thode bugs hain."
];


const randomMessage = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

}

const createReminder = async (req, res) => {


  //Abb humme isme se ek random number select karke event main add karna hain
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const { contestId } = req.body;

    if (!contestId) {
      return res.status(400).json({ message: "contestId is required" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user || !user.calendarConnected) {
      return res.status(400).json({ message: "Google Calendar not connected for this user" });
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    // prevent duplicate reminders before even hitting Google's API
    const existing = await Reminder.findOne({ userId: user._id, contestId: contest._id });
    if (existing) {
      return res.status(409).json({ message: "Reminder already set for this contest" });
    }


    // load this user's tokens onto the shared oauth2Client before calling Calendar API
    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const endTime = new Date(contest.startTime.getTime() + contest.durationSeconds * 1000);

    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `${contest.name} (${contest.platform})`,
        description:
          `Iss baar ka mantra : ${randomMessage()}
         
         Contest link: ${contest.url}`,
        start: { dateTime: contest.startTime.toISOString() },
        end: { dateTime: endTime.toISOString() },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 30 }]
        }
      }
    });

    const reminder = await Reminder.create({
      userId: user._id,
      contestId: contest._id,
      calendarEventId: event.data.id
    });

    return res.status(201).json({
      message: "Reminder created successfully",
      reminder
    });

  } catch (err) {
    console.log("Failed to create reminder:", err.message);
    return res.status(500).json({ message: "Failed to create reminder" });
  }
};


const deleteReminder = async (req, res) => {
  try {
    // console.log("Bhai main jinda hu");
    const { reminderId } = req.params;
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const reminder = await Reminder.findOne({ _id: reminderId, userId: req.user.id });
    if (!reminder) {
      console.log("Bhai reminder nahi mila")
      return res.status(404).json({ message: "Reminder not found" });
    }

    const user = await userModel.findById(req.user.id);
    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    try {
      await calendar.events.delete({
        calendarId: "primary",
        eventId: reminder.calendarEventId
      }); // Abb yeh ek error fek sakta hain bcz agar user ne manually remove kar diya hain event ko toh !!!
    } catch (calendarErr) {
      // if Google says the event is already gone (404/410), that's fine —
      // it means the user deleted it manually from their calendar already.
      // any other error should still be treated as a real failure.
      const status = calendarErr.code || calendarErr.response?.status;
      if (status !== 404 && status !== 410) {
        throw calendarErr;
      }
      console.log(`Calendar event ${reminder.calendarEventId} was already deleted upstream, cleaning up DB only`);
    }

    await reminder.deleteOne();

    return res.status(200).json({ message: "Reminder removed successfully" });

  } catch (err) {
    console.log("Failed to delete reminder:", err.message);
    return res.status(500).json({ message: "Failed to delete reminder" });
  }
};
const getMyReminders = async (req, res) => {
  //Abb humme user ke saare set kiye hua reminders show karne hain
  try {
    const reminders = await Reminder.find({ userId: req.user.id });
    return res.status(200).json({ reminders });

  }
  catch (err) {
    res.status(500).json({
      "message": "Some internal error has occured while fetching the reminders of user !!!",
      Err: err.message
    })
  }
}
module.exports = { createReminder, deleteReminder, getMyReminders };