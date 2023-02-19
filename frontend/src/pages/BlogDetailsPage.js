import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card,CardContent,CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Stack,Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_ROUTE } from '../routes/BlogRoutes';

const BlogDetailsPage = () => {
  const [blogData, setBlogData] = useState({});
  const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState(false);
  const  navigate = useNavigate();

  const { blogId } = useParams();


  const fetchBlogDetails = async () => {
    const response = await axios.get(`/api/blog/${blogId}`);

    const blogData = response.data;
    blogData.createdAt = new Date(blogData.createdAt).toDateString();
    blogData.updatedAt = new Date(blogData.updatedAt).toDateString();

    setBlogData(blogData);
  };

  const handleBlogDelete = async () => {
        await axios.delete(`/api/blog/${blogId}`);

        navigate(APP_ROUTE.BLOG_LIST);

        toast.success("Blog deleted successfully");
  }
  useEffect(() => {
    fetchBlogDetails();
  },[]);

  return (
    <>
    <Card variant='outlined'>
      <CardHeader title={
        <Typography variant='h4'>{blogData.title}</Typography> 
      }
        action={
        <Stack direction="row" spacing={2}>
          <Button variant='outlined' onClick={() => navigate(`/blog/${blogId}/edit`)}>Edit</Button>
          <Button onClick={() => setIsDeleteDialogOpen(true)} variant='outlined' color='error'>Delete</Button>
        </Stack>
      }
        subheader={
          <Box style={{ marginTop: 15 }}>
            <Typography>Created At - {blogData.createdAt}</Typography>
            <Typography>Updated At - {blogData.updatedAt}</Typography>
            <Typography>3 min read</Typography>
          </Box>
        }
      />
      <CardContent style={{overflow:"auto"}}>
        <Box>
          <Typography><strong>Description</strong></Typography>
          <Typography>{blogData.description}</Typography>
        </Box>
        <Divider style={{marginBlock:15}}/>
        <Box>
        <Paper variant="outlined" style={{ padding: 14, overflow: "auto" }}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={docco}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
              rehypePlugins={[rehypeRaw]}

            >{blogData.markdown}
            </ReactMarkdown>
            </Paper>
        </Box>
      </CardContent>
    </Card>
    <Dialog
        open={isDeleteDialogOpen}
        onClose={ () => setIsDeleteDialogOpen(false)}
        
      >
        <DialogTitle>
          Delete blog
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting blog will remove it permanently.Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleBlogDelete}> Delete </Button>
        </DialogActions>
      </Dialog>
      </>
  )
}

export default BlogDetailsPage;