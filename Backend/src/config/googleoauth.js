// googleAuth.js
const { google } = require('googleapis');

const redirectUri = new URL(
  "/api/auth/google/callback",
  process.env.CLIENT_URL
).toString();
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',//yeh yeh permissions google mangega user se 
  'https://www.googleapis.com/auth/userinfo.profile',
  "https://www.googleapis.com/auth/calendar.events"

];

function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',//Iska matlab hain ki even if user nahi hain abhi toh bhi mere app ko permission de google ki apis use karne ka
    prompt: 'consent',
    scope: SCOPES
  });
}

module.exports = { oauth2Client, getAuthUrl };