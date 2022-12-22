const express = require("express");
const { connectDb } = require("./db/connectDb");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
const PORT = 8001;

app.use(express.json());
connectDb();
//create  blog post

app.use("/api/blog/",blogRoutes);

  
app.listen(PORT, () => {
  console.log("Backend is running on port:", PORT);
});
