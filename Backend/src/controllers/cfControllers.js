//Abb humme isme user ki info fetch karni hain from the cf api :
const userModel = require("../models/User.js");

const linkCfHandle = async (req, res) => {
  try {
    const { handle } = req.body;

    if (!handle) {
      return res.status(400).json({ message: "CF handle is required" });
    }

    //Hum yaahan pe seedha cf se puchenge ki aisa user exist karta hain kya ?
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const data = await response.json();

    if (data.status !== "OK") {
      // CF returns status: "FAILED" with a comment when the handle doesn't exist
      return res.status(404).json({ message: "Invalid Codeforces handle" });
    }

    // handle exists — save it to the logged-in user
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { cfHandle: handle },
      { returnDocument: 'after' }
    );

    return res.status(200).json({
      message: "Codeforces handle linked successfully",
      cfHandle: user.cfHandle
    });

  } catch (err) {
    console.log("CF handle linking failed:", err.message);
    return res.status(500).json({ message: "Failed to validate Codeforces handle" });
  }
};

const getCfProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    //Isme pahle middleware rahega jo user attach karega body ke saath
    if (!user || !user.cfHandle) {
      return res.status(400).json({ message: "No Codeforces handle linked yet" });
    }

    const handle = user.cfHandle;

    // fetch rating/rank info
    const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const infoData = await infoRes.json();

    if (infoData.status !== "OK") {
      return res.status(502).json({ message: "Codeforces API failed to return user info" });
    }

    const profile = infoData.result[0];

    // fetch submission history for recent problems + heatmap
    const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=200`);
    const statusData = await statusRes.json();

    if (statusData.status !== "OK") {
      return res.status(502).json({ message: "Codeforces API failed to return submissions" });//Yeh error hota hain ki server ke pass request aa gayi hain paar woh external service jo woh use kar raha hain woh fail ho gayi hain
    }

    const submissions = statusData.result;

    // recent solved problems: unique accepted submissions, most recent first
    const recentSolved = [];
    const seenProblems = new Set();

    for (const sub of submissions) {
      if (sub.verdict === "OK") {
        const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
        if (!seenProblems.has(problemKey)) {
          seenProblems.add(problemKey);
          recentSolved.push({
            name: sub.problem.name,
            rating: sub.problem.rating || null,
            solvedAt: new Date(sub.creationTimeSeconds * 1000)
          });
        }
      }
      if (recentSolved.length >= 20) break; // cap it, don't return hundreds
    }

    // heatmap: bucket ALL submissions (not just accepted) by day
    const heatmap = {};
    submissions.forEach(sub => {
      const day = new Date(sub.creationTimeSeconds * 1000).toISOString().split("T")[0]; // "YYYY-MM-DD"
      heatmap[day] = (heatmap[day] || 0) + 1;
    });

    return res.status(200).json({
      handle,
      rating: profile.rating || null,
      maxRating: profile.maxRating || null,
      rank: profile.rank || null,
      recentSolved,
      heatmap
    });

  } catch (err) {
    console.log("CF profile fetch failed:", err.message);
    return res.status(500).json({ message: "Failed to fetch Codeforces profile" });
  }
};

module.exports = { linkCfHandle, getCfProfile };
