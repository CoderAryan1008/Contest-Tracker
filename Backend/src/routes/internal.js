const express = require("express");
const Internalrouter = express.Router();
const syncContests = require("../controllers/syncControllers.js");
//Sabse important endpoint hain yeh humara bcz yeh haar half an hour main hit hoga jisse contest upcoming jo bhi hain woh refresh ho jaaye
Internalrouter.post("/sync-contests", async (req, res) => {
  // shared-secret check hain jisse koi bhi random person hit na kar paaye iss endpoint ko without knowing the secret key 
  if (req.headers["x-sync-key"] !== process.env.SYNC_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return syncContests(req, res);
});

module.exports = Internalrouter;