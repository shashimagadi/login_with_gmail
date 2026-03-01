const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB successfuly");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
};

module.exports = connectDb;
