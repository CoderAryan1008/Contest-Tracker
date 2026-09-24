const cors = require("cors");
const express = require("express");
const app = express();
const AuthRouter = require("./routes/auth.routes.js")
const cookieParser = require('cookie-parser');
const Internalrouter = require('./routes/internal.js');
const fetchUserRouter = require('./routes/fetchCFuser.js');
const reminderRouter = require('./routes/reminder.routes.js');
const contestFetchRouter = require('./routes/fetchContest.js');

const allowedOrigins = Array.from(
  new Set([
    "http://localhost:5173",
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
  ].filter(Boolean))
);

app.use(cors({
  origin: (requestOrigin, callback) => {
    if (!requestOrigin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
}));
app.use(cookieParser()); // REQUIRED to read req.cookies
app.use(express.json());//It will help for parsing the data from the http request to json
app.use("/api/auth", AuthRouter);
app.use("/api/internal", Internalrouter);
app.use('/api/codeforces', fetchUserRouter);
app.use('/api/reminder', reminderRouter);
app.use('/api', contestFetchRouter);

module.exports = app;