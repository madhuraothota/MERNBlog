require('dotenv').config();
const express = require("express");
const { connectDb } = require("./db/connectDb");
const blogRoutes = require("./routes/blogRoutes");
const cors = require('cors')
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(cors());
connectDb();

console.log(process.env.MONGODB_URI);

app.use("/api/blog/",blogRoutes);

  
app.listen(PORT, () => {
  console.log("Backend is running on port:", PORT);
});
