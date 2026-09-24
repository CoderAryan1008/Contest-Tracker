//Abb humme yaahan token blacklisted ko store karna hain in the db
const mongoose = require("mongoose");

const token_blacklist_schema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is needed for blacklisting it in the server side code"]

  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }

});
const blacklistModel = mongoose.model("BlackList", token_blacklist_schema);
module.exports = blacklistModel;
