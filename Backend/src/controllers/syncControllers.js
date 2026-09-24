const fetchFromCodeforces = require("../services/codeforces.js");
const fetchFromCodechef = require("../services/codechef.js");
const fetchFromLeetcode = require("../services/leetcode.js");

const syncContests = async (req, res) => {
  const startedAt = Date.now();
  const results = [];
  const errors = [];

  // each fetcher runs in its OWN try/catch, so one platform failing
  // doesn't stop the others from running
  //Yeh ek function hain joh haar aadhe aadhe ghante main call karke naaye contest ko fetch karega

  try {
    const cfResult = await fetchFromCodeforces();
    results.push(cfResult);
  } catch (err) {
    console.log("Codeforces sync failed:", err.message);
    errors.push({ platform: "codeforces", error: err.message });
  }

  try {
    const ccResult = await fetchFromCodechef();
    results.push(ccResult);
  } catch (err) {
    console.log("Codechef sync failed:", err.message);
    errors.push({ platform: "codechef", error: err.message });
  }

  try {
    const lcResult = await fetchFromLeetcode();
    results.push(lcResult);
  } catch (err) {
    console.log("Leetcode sync failed:", err.message);
    errors.push({ platform: "leetcode", error: err.message });
  }

  const durationMs = Date.now() - startedAt;

  return res.status(200).json({
    message: errors.length === 0
      ? "Sync completed successfully"
      : "Sync completed with some failures",
    tookMs: durationMs,
    results,
    errors
  });
};

module.exports = syncContests;