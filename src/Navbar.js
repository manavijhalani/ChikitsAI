import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #60a5fa, #c084fc)',borderRadius: '10px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Health Dashboard
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/chatbot')}>Chatbot</Button>
          <Button color="inherit" onClick={() => navigate('/vid')}>Video Help</Button>
          <Button color="inherit" onClick={() => navigate('/report')}>Reports</Button>
          <a href='http://localhost:3001' target='_blank' >2nd model</a>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
