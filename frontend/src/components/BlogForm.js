import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Tab, Tabs, TextField } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const BlogForm = ({onSubmit,data= { }}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [formError, setFormError] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useEffect(() => {
            const { title, description, markdown} = data;

            if(!title || !description || !markdown) {
                return;
            }
            
            setTitle(title);
            setDescription(description);
            setMarkdown(markdown);
    },[data]);
   
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
        onSubmit && onSubmit(data);
        
    };
    return (
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
                    onChange={(_, newIndex) => setSelectedTabIndex(newIndex)}

                >
                    <Tab label="Edit" />
                    <Tab label="Preview" />
                </Tabs>
            </Box>
            <div hidden={selectedTabIndex !== 0}>
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
            <div hidden={selectedTabIndex !== 1}>
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

                    >{markdown}</ReactMarkdown>
                </Paper>

            </div>

            <Button onClick={handleSubmit} variant="contained">
                Submit
            </Button>
        </Stack>
        
    )
}

export default BlogForm