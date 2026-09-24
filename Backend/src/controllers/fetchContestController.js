// controllers/contestController.js
const Contest = require("../models/Contests.js");

const getUpcomingContests = async (req, res) => {
  try {
    const contests = await Contest.find({
      startTime: { $gte: new Date() }
    }).sort({ startTime: 1 });

    const grouped = {
      codeforces: [],
      codechef: [],
      leetcode: []
    };

    contests.forEach(contest => {
      if (grouped[contest.platform]) {
        grouped[contest.platform].push(contest);
      }
    });

    return res.status(200).json({
      count: contests.length,
      contests: grouped
    });

  } catch (err) {
    console.log("Failed to fetch contests:", err.message);
    return res.status(500).json({ message: "Failed to fetch contests" });
  }
};

module.exports = getUpcomingContests;