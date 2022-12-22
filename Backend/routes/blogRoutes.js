const express = require("express");
const router = express.Router();
const Blog = require("../schema/blogSchema");
const { validateBlogData } = require("../validation/blogValidation");

router.post("/", async (req, res) => {

    try {
    const blogData = req.body;
    const errorMessage = validateBlogData(blogData);

    if(errorMessage) {
      throw new Error(errorMessage);
    }  
    const savedBlogData = await new Blog(blogData).save();  
    res.status(200).json(savedBlogData);
    } catch (error) {
      res.send(500).json(error.message);
    }
  });
  
  //get all blogs
  router.get("/", async (req, res) => {
    try {
    const allBlogs = await Blog.find({},{ markdown : 0});
    res.status(200).json(allBlogs);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  
  //get a single blog
  router.get("/:id",async (req,res) => {
    try {
      const  blogId = req.params.id;
      const blog = await Blog.findOne({_id: blogId});
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  
  //Delete a single blog
  router.delete("/:id",async (req,res) => {
    try {
      const  blogId = req.params.id;
      const deletedBlog = await Blog.findOneAndDelete({_id: blogId});
      res.status(200).json(deletedBlog);
  } catch (error){
      res.status(500).json(error.message);
  }
  });
  
  //Edit a singel Blog post
  router.put("/:id", async (req, res) => {
      try {
      const blogId = req.params.id;
      const blogData = req.body;    
        
      const editedBlogData = await Blog.findOneAndUpdate(
          {_id: blogId},
           blogData,
           {new : true}
           );
      
      res.status(200).json(editedBlogData);
    } catch (error) {
      res.status(500).json(error.message);
    };
  });
  


module.exports = router;