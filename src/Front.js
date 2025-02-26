import React from 'react';
import './App.css';
import Orb from './Orb';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { Translate, Visibility, EventNote, Mic, MedicalServices } from '@mui/icons-material'; // MUI Icons
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Front() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        color: 'white',
        backgroundColor: '#000', // Black Background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
      <br />
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Orb hoverIntensity={0.5} rotateOnHover={true} hue={250} forceHoverState={false} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff', zIndex: 1 }}>
          ChikitsAi
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#ddd',
            maxWidth: '600px',
            mt: 2,
            fontStyle: 'italic',
            fontSize: '1.2rem',
          }}
        >
          Your smart AI-powered healthcare companion. Supporting multilingual users, assisting the visually impaired, and providing AI-driven medical insights.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ maxWidth: '1200px', margin: '50px auto', padding: '0 20px' }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { icon: <Translate sx={{ fontSize: 48, color: '#fff' }} />, title: 'Multilingual Support', desc: 'Communicate in multiple languages for seamless interaction.' },
            { icon: <Visibility sx={{ fontSize: 48, color: '#fff' }} />, title: 'Brain-Language Conversion', desc: 'Assist visually impaired users with AI-powered speech-to-text.' },
            { icon: <EventNote sx={{ fontSize: 48, color: '#fff' }} />, title: 'Medicine Reminders', desc: 'Google Calendar integration for timely medical reminders.' },
            { icon: <Mic sx={{ fontSize: 48, color: '#fff' }} />, title: 'Slang-Based Medical Analysis', desc: 'Understand medical in conversational slang.' },
            { icon: <MedicalServices sx={{ fontSize: 48, color: '#fff' }} />, title: 'AI Medical Screening', desc: 'Analyze past medical history for better health predictions.' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg,rgb(104, 205, 203), #7209b7)', // Gradient for Card
                  color: 'white',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  textAlign: 'center',
                  padding: 3,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 30px rgba(71, 103, 131, 0.6)',
                  },
                }}
              >
                <CardContent>
                  {feature.icon}
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: '#ddd' }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box textAlign="center" mt={4}>
  <Link
    to="/login"
    style={{
      textDecoration: 'none',
      backgroundColor: '#4361ee',
      padding: '12px 40px',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      display: 'inline-block',
      transition: 'background 0.3s ease-in-out',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#3f37c9')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#4361ee')}
  >
    Get Started →
  </Link>
</Box>
<br/><br/>
      </Box>

  );
}

export default Front;
