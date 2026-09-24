// services/codeforces.js
const Contest = require("../models/Contests.js");

const fetchFromCodeforces = async () => {
  const response = await fetch("https://codeforces.com/api/contest.list?gym=false");
  if (!response.ok) {
    throw new Error(`Codeforces API returned HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.status !== "OK") {
    throw new Error("CF API returned non-OK status");
  }

  const upcomingContests = data.result.filter(c => c.phase === "BEFORE");
  const freshIds = upcomingContests.map(c => String(c.id));

  let upserted = 0;
  let modified = 0;
  let removed = 0;

  if (upcomingContests.length > 0) {
    const operations = upcomingContests.map(contest => ({
      updateOne: {
        filter: { platform: "codeforces", externalId: String(contest.id) },
        update: {
          $set: {
            platform: "codeforces",
            externalId: String(contest.id),
            name: contest.name,
            url: `https://codeforces.com/contest/${contest.id}`,
            startTime: new Date(contest.startTimeSeconds * 1000),
            durationSeconds: contest.durationSeconds,
            lastSyncedAt: new Date()
          }
        },
        upsert: true //Yaani aagar yeh present nahi hain toh phir usse insert kar de 
      }
    }));

    const result = await Contest.bulkWrite(operations);
    upserted = result.upsertedCount;
    modified = result.modifiedCount;
  }

  // cleanup: remove any CF contest that was upcoming in our DB
  // but no longer appears in the fresh fetch (cancelled/removed upstream)
  const staleResult = await Contest.deleteMany({
    platform: "codeforces",
    startTime: { $gte: new Date() },
    externalId: { $nin: freshIds }
  });
  removed = staleResult.deletedCount;

  return { platform: "codeforces", upserted, modified, removed };
};

module.exports = fetchFromCodeforces;