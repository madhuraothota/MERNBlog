import { AppBar, Box, Button, Toolbar,Typography } from '@mui/material'
import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../routes/BlogRoutes';
const NavBar = () => {
    const navigate = useNavigate();

    const handleHomePageClick = () => {
        navigate(APP_ROUTE.BLOG_LIST);
    }
  return (
    <div>
        <Box>
        <AppBar position='sticky'>
          <Toolbar>
          <Button 
          onClick={handleHomePageClick}
          startIcon={<BookIcon/>}
           style={{color:"white",textTransform:"none"}}
          >          
            <Typography variant="h6">Blogging App</Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default NavBar