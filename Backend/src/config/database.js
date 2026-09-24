//Abb humme yaahan db ko configure karna hain
const mongoose = require("mongoose");
async function connecttodb() {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log("Database connected to the server...");
  }
  catch (err) {
    console.log("Error occured: ", err);

  }
}
module.exports = connecttodb;