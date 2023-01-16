import { Box, Button, Paper, Stack, Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const BlogCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState(false);
  const [selectedTabIndex,setSelectedTabIndex] = useState(0);

  const createBlogPost = async (data) => {
    try {
      const response = await axios.post("/api/blog/", data);
      navigate(`/blog/${response.data._id}/details`);
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !markdown) {
      setFormError(true);
      return;
    }
    const data = {
      title,
      description,
      markdown,
    };
    setFormError(false);
    createBlogPost(data);
  };
  return (
    <Paper variant="outlined" style={{ padding: 24 }}>
      <Stack spacing={4}>
        <TextField
          error={formError && !title}
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText={formError && !title && "Title is required"}
        />
        <TextField
          error={formError && !description}
          fullWidth
          multiline
          rows={3}
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText={formError && !description && "Description is required"}
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTabIndex}
            onChange={(_,newIndex) => setSelectedTabIndex(newIndex)}
            
          >
            <Tab label="Edit"/>
            <Tab label="Preview" />
          </Tabs>
        </Box>
        <div hidden={selectedTabIndex !==0}>
        <TextField
          error={formError && !markdown}
          fullWidth
          multiline
          rows={20}
          label="Markdown"
          variant="outlined"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          helperText={formError && !markdown && "Markdown is required"}
        />
        </div>
        <div hidden={selectedTabIndex !==1}>
        <Paper variant="outlined" style={{padding:14,overflow:"auto"}}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
        </Paper>
        
        </div>
        
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};

export default BlogCreatePage;
