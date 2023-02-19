import  { Paper } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlogForm from "../components/BlogForm";

const BlogCreatePage = () => {
  
  const navigate = useNavigate();
  
  const createBlogPost = async (data) => {
    
    try {
      const response = await axios.post("/api/blog/", data);
      navigate(`/blog/${response.data._id}/details`);
    } catch (error) {
      
      toast.error(error?.response?.data || "Error occurred");
    }
  };

  return (
    <Paper variant="outlined" style={{ padding: 24 }}>
     <BlogForm onSubmit={createBlogPost}/>
    </Paper>
  );
};

export default BlogCreatePage;
