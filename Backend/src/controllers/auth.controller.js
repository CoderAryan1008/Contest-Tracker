//Humme yaahan saara logic mention karna hain about our authentication
const { google } = require('googleapis');
const { oauth2Client, getAuthUrl } = require('../config/googleoauth.js');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const blacklistModel = require("../models/blacklist.js");

// STEP 1: Isse hum user ko redirect karenge to google authentication page
const googleLogin = (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
};

const isHttpsFrontend = (process.env.CLIENT_URL || "").startsWith("https://");

const authCookieOptions = {
  httpOnly: true,
  sameSite: isHttpsFrontend ? "none" : "lax",
  secure: isHttpsFrontend,
  path: "/",
  maxAge: 24 * 60 * 60 * 1000, //Yaani cookie ki life maxm 1 day ki hogi
};

// STEP 2: Google humme abb ek code generate karke deega ki user authenticate hua ki nahi
const googleCallback = async (req, res) => {
  //Yaani yeh ab run hoga jab bhi user register kar lega khudko through google oauth
  try {
    const { code } = req.query;

    if (!code) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=no_code`);//Yaani back to login page redirect kardo user ko
    }

    // Exchange code for Google tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch the user's Google profile
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data: profile } = await oauth2.userinfo.get();

    // check if user already exists BEFORE upserting, so we know
    // whether to guard the refresh token
    const existingUser = await userModel.findOne({ googleId: profile.id });

    const updateData = {
      googleId: profile.id,
      email: profile.email,
      name: profile.name,
      avatar: profile.picture,
      googleAccessToken: tokens.access_token,
      calendarConnected: true
    };

    // only overwrite refresh token if Google actually sent a new one —
    //Bcz kabhi kabhi user baar baar login kare toh google fir haar baar refresh tokens nahi deega
    // otherwise we'd wipe a previously stored one on repeat logins
    if (tokens.refresh_token) {
      updateData.googleRefreshToken = tokens.refresh_token;
    }

    const user = await userModel.findOneAndUpdate(
      { googleId: profile.id },
      updateData,
      { upsert: true, new: true }
    );

    // if this is a brand new user AND Google never sent a refresh token
    // (shouldn't normally happen if your getAuthUrl uses prompt: "consent",
    // but worth knowing this edge case exists)
    if (!existingUser && !tokens.refresh_token) {
      console.log("Warning: new user created but no refresh token received. Check that getAuthUrl uses access_type: 'offline' and prompt: 'consent'.");
    }

    // Issue our own JWT and set it as a cookie
    const token = jwt.sign(
      { id: user._id, username: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, authCookieOptions);
    return res.redirect(`${process.env.CLIENT_URL}/`);

  } catch (err) {
    console.log("Error message : ", err.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const logout = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await blacklistModel.create({ token });
  }
  res.clearCookie("token", authCookieOptions);
  return res.status(200).json({
    message: "User logged-out successfully !!!"
  });
};

const getmecontroller = async (req, res) => {
  try {
    //Iske pahle humm ek middleware lagayenge joh pahle hi ek user naam ka attribute add kar dega in the req body
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User found successfully",
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
        calendarConnected: user.calendarConnected,
        cfHandle: user.cfHandle,
        picture: user.avatar//Isse hum user image ko load karenge in the frontend
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Some internal error occurred",
      Err: err.message
    });
  }
};

module.exports = {
  googleLogin,
  googleCallback,
  logout,
  getmecontroller
};