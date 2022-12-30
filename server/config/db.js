const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Connected to MongoDB`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
};
module.exports = connectDB;
