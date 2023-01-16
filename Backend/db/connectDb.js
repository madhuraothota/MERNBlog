const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
const connectDb = async () => {
  try {    
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/fullstack-blogging-app-db"
    );
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};

module.exports = { connectDb };
