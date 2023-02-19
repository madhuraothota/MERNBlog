require('dotenv').config();
const express = require("express");
const path = require("path");
const { connectDb } = require("./db/connectDb");
const blogRoutes = require("./routes/blogRoutes");
const cors = require('cors')
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDb();


app.use("/api/blog/",blogRoutes);


app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*", (req,res) =>
        res.sendFile(path.join(__dirname,"..frontend/build/index.html"))
);
  


app.listen(PORT, () => {
  console.log("Backend is running on port:", PORT);
});
