const mongoose = require("mongoose");

mongoose.set('strictQuery',true);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mern-blogging-app"
const connectDb = async () => {
  try {    
    await mongoose.connect(MONGODB_URI);      
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};

module.exports = { connectDb };
