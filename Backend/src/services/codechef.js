const Contest = require("../models/Contests.js");

const fetchFromCodechef = async () => {
  const response = await fetch("https://www.codechef.com/api/list/contests/all");
  if (!response.ok) {
    throw new Error(`Codechef API returned HTTP ${response.status}`);
  }

  const data = await response.json();
  const upcomingContests = data.future_contests || [];
  const freshIds = upcomingContests.map(c => c.contest_code);

  let upserted = 0;
  let modified = 0;
  let removed = 0;

  if (upcomingContests.length > 0) {
    const operations = upcomingContests.map(contest => {
      const start = new Date(contest.contest_start_date_iso);
      const end = new Date(contest.contest_end_date_iso);
      const durationSeconds = (end - start) / 1000;

      return {
        updateOne: {
          filter: { platform: "codechef", externalId: contest.contest_code },
          update: {
            $set: {
              platform: "codechef",
              externalId: contest.contest_code,
              name: contest.contest_name,
              url: `https://www.codechef.com/${contest.contest_code}`,
              startTime: start,
              durationSeconds: durationSeconds,
              lastSyncedAt: new Date()
            }
          },
          upsert: true
        }
      };
    });

    const result = await Contest.bulkWrite(operations);
    upserted = result.upsertedCount;
    modified = result.modifiedCount;
  }

  // cleanup: remove any Codechef contest marked upcoming in our DB
  // that no longer appears in the fresh fetch (cancelled/removed upstream)
  const staleResult = await Contest.deleteMany({
    platform: "codechef",
    startTime: { $gte: new Date() },
    externalId: { $nin: freshIds }
  });
  removed = staleResult.deletedCount;

  return { platform: "codechef", upserted, modified, removed };
};

module.exports = fetchFromCodechef;