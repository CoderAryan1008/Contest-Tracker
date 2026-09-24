# Contest-Tracker
An application that helps the cp coder to help know and set a reminder for their upcoming coding contests across various platforms

🚀 Contest Tracker

A full-stack web application that helps users stay updated with upcoming programming contests across multiple competitive coding platforms — all in one place.

📌 Overview

Contest Tracker is designed to simplify the process of tracking coding contests. Instead of manually checking different platforms, users can view all upcoming contests, set reminders, and never miss an important event.

This project integrates multiple APIs, authentication systems, and a responsive frontend to deliver a seamless experience.

✨ Features
🔐 User Authentication
Secure login/signup using Google OAuth
📅 Upcoming Contests
Aggregates contests from platforms like Codeforces, LeetCode, CodeChef, etc.
⏰ Reminders
Set and manage reminders for contests
❌ Reminder Management
Delete or update reminders easily
🌐 Responsive UI
Works smoothly across devices
⚡ Real-time Updates
Automatically fetches the latest contest data
🏗️ Tech Stack
Frontend
React.js
Tailwind CSS / CSS
Axios
Backend
Node.js
Express.js
Database
MongoDB
Authentication
Google OAuth 2.0
Deployment
Frontend: Vercel
Backend: Render
🔧 Installation & Setup
1. Clone the repository
git clone https://github.com/CoderAryan1008/Contest-Tracker.git
cd contest-tracker
2. Setup Backend
cd backend
npm install
npm start
3. Setup Frontend
cd frontend
npm install
npm run dev
🔐 Environment Variables

Create a .env file in the backend and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
🌍 Deployment
Frontend deployed on Vercel
Backend deployed on Render

Make sure to:

Update API base URLs in frontend
Configure Google OAuth redirect URIs correctly
⚠️ Important Notes
Ensure your Google OAuth app is set to Production mode before public use
Add both local and deployed URLs in authorized redirect URIs
Keep your environment variables secure
📸 Screenshots

Add your project screenshots here

🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

📄 License

This project is licensed under the MIT License.

💡 Future Improvements
Add notification system (email/push)
Filter contests by platform
User dashboard with analytics
Bookmark favorite contests
