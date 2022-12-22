const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/fullstack-blogging-app-db"
    );
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};

module.exports = { connectDb };
