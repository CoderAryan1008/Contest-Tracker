const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") }); //for using the .env file

const requiredEnv = [
  "Mongo_URL",
  "CLIENT_URL",
  "SECRET_KEY",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
  "SYNC_SECRET",
];
//Check kar rahe hain ki properly saare variables load toh hua hain na to prevent from unknown crashes
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const connecttodb = require("./config/database.js");
const port = process.env.PORT || 3000;//Ya toh 3000 ya jo define karenge in the .env file
connecttodb(); //Isse hum db ko invoke kar rahe hain
const app = require("./app.js");//Isse hum pura backend handle karenge
app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});