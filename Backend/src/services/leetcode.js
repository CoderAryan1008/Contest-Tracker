const Contest = require("../models/Contests.js");

// ======================================================
// WEEKLY CONTEST
// Reference: Weekly Contest 517
// Date: August 30, 2026 at 2:30 AM UTC
// ======================================================

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const BIWEEK_MS = 14 * 24 * 60 * 60 * 1000;

const WEEKLY_ANCHOR = new Date(Date.UTC(2026, 7, 30, 2, 30, 0));
const WEEKLY_ANCHOR_NUMBER = 517;

const getNextWeeklyContest = () => {
  const now = new Date();

  let weeksPassed = Math.ceil((now - WEEKLY_ANCHOR) / WEEK_MS);
  if (weeksPassed < 0) weeksPassed = 0;

  const contestNumber = WEEKLY_ANCHOR_NUMBER + weeksPassed;
  const startTime = new Date(WEEKLY_ANCHOR.getTime() + weeksPassed * WEEK_MS);

  return { contestNumber, startTime };
};

// ======================================================
// BIWEEKLY CONTEST
// Reference: Biweekly Contest 190
// Date: August 29, 2026 at 2:30 PM UTC
// ======================================================

const BIWEEKLY_ANCHOR = new Date(Date.UTC(2026, 7, 29, 14, 30, 0));
const BIWEEKLY_ANCHOR_NUMBER = 190;

const getNextBiweeklyContest = () => {
  const now = new Date();

  let intervalsPassed = Math.ceil((now - BIWEEKLY_ANCHOR) / BIWEEK_MS);
  if (intervalsPassed < 0) intervalsPassed = 0;

  const contestNumber = BIWEEKLY_ANCHOR_NUMBER + intervalsPassed;
  const startTime = new Date(BIWEEKLY_ANCHOR.getTime() + intervalsPassed * BIWEEK_MS);

  return { contestNumber, startTime };
};

// ======================================================
// SAVE CONTESTS
// ======================================================

const CONTEST_DURATION = 90 * 60; // 90 minutes

const fetchFromLeetcode = async () => {
  const weekly = getNextWeeklyContest();
  const biweekly = getNextBiweeklyContest();

  const contests = [
    {
      externalId: `leetcode-weekly-${weekly.contestNumber}`,
      name: `LeetCode Weekly Contest ${weekly.contestNumber}`,
      url: `https://leetcode.com/contest/weekly-contest-${weekly.contestNumber}/`,
      startTime: weekly.startTime
    },
    {
      externalId: `leetcode-biweekly-${biweekly.contestNumber}`,
      name: `LeetCode Biweekly Contest ${biweekly.contestNumber}`,
      url: `https://leetcode.com/contest/biweekly-contest-${biweekly.contestNumber}/`,
      startTime: biweekly.startTime
    }
  ];

  const operations = contests.map(contest => ({
    updateOne: {
      filter: { platform: "leetcode", externalId: contest.externalId },
      update: {
        $set: {
          platform: "leetcode",
          externalId: contest.externalId,
          name: contest.name,
          url: contest.url,
          startTime: contest.startTime,
          durationSeconds: CONTEST_DURATION,
          lastSyncedAt: new Date()
        }
      },
      upsert: true
    }
  }));

  const result = await Contest.bulkWrite(operations);

  return {
    platform: "leetcode",
    upserted: result.upsertedCount,
    modified: result.modifiedCount,
    removed: 0
  };
};

module.exports = fetchFromLeetcode;