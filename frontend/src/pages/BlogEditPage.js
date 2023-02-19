import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper } from "@mui/material";
import { toast } from "react-toastify";
import BlogForm from '../components/BlogForm';


const BlogEditPage = () => {
  
  
  const navigate = useNavigate();
  const [blogData,setBlogData]= useState({});
  
  const { blogId } = useParams();


  const fetchBlogDetails = async () => {
    const response = await axios.get(`/api/blog/${blogId}`);
    const blogData = response.data;
        setBlogData(blogData);
  };

  const editBlogPost = async (data) => {
    try {
      const response = await axios.put(`/api/blog/${blogId}`, data);
      navigate(`/blog/${response.data._id}/details`);
    } catch (error) {
      toast.error(error?.response?.data || "Error occurred");
    }
  }; 

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <Paper variant="outlined" style={{ padding: 24 }}>
      <BlogForm  data={blogData} onSubmit={editBlogPost}/>
    </Paper>
  )
}

export default BlogEditPage;