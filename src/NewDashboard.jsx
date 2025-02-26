import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Stack, 
  Paper, 
  styled 
} from '@mui/material';
import { 
  Favorite as HeartIcon, 
  Height as HeightIcon, 
  Person as AgeIcon 
} from '@mui/icons-material';
import Navbar from './Navbar';
import CalendarIntegration from './CalendarIntegration';
import CalendarGrid from './CalendarGrid'; // Import CalendarGrid

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #60a5fa, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'rgba(31, 41, 55, 0.5)',
  backdropFilter: 'blur(12px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(107, 114, 128, 0.3)',
}));

const MetricCard = ({ title, value, unit, icon: Icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      background: `linear-gradient(135deg, ${color}19, ${color}33)`,
      borderRadius: 4,
      border: `1px solid ${color}33`,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    }}
  >
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Icon sx={{ color: color }} />
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {unit}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

// Past Chats component
const ChatSummary = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const chats = [
    { date: '2025-02-20', summary: 'Discussed health goals and progress.' },
    { date: '2025-02-18', summary: 'Follow-up on hydration levels.' },
    { date: '2025-02-15', summary: 'Reviewed heart rate data.' },
  ];

  const handleChatClick = (chat) => {
    // Handle the click event (e.g., navigate to chat details or show a modal)
    navigate('/chat-history');
  };

  return (
    <GradientCard>
      <CardContent>
        <GradientTypography variant="h5" gutterBottom>
          Past Chats
        </GradientTypography>
        {chats.map((chat, index) => (
          <Box 
            key={index} 
            sx={{ mb: 1, cursor: 'pointer' }} 
            onClick={() => handleChatClick(chat)} // Add click handler
          >
            <Typography variant="subtitle2" color="white">
              {chat.date}: {chat.summary}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </GradientCard>
  );
};

const NewDash = () => {
  const healthData = {
    weight: 70, // kg
    height: 175, // cm
    age: 28, // years
    previousConditions: 'No known previous conditions',
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const calculateIdealWeight = (height) => {
    // Using the BMI formula for ideal weight (BMI = 22)
    const heightInMeters = height / 100;
    return (22 * heightInMeters * heightInMeters).toFixed(2);
  };

  

   

  return (
    <Box sx={{ 
      p: 4, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827, #1f2937)',
      color: 'white'
    }}>
      <Navbar />
      <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
      <br />
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <GradientCard>
            <CardContent>
              <CalendarIntegration />
              <ChatSummary /> {/* Past Chats component */}
            </CardContent>
          </GradientCard>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            <GradientCard>
              <CardContent>
                <GradientTypography variant="h4" gutterBottom>
                  Health Overview
                </GradientTypography>
                <Typography sx={{ color: 'white' }}>
                  Sunday, 23 February 2025
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <MetricCard
                      title="Weight"
                      value={`${healthData.weight} kg`}
                      unit=""
                      color="#ef4444"
                      icon={HeartIcon}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MetricCard
                      title="Height"
                      value={`${healthData.height} cm`}
                      unit=""
                      color="#3b82f6"
                      icon={HeightIcon}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MetricCard
                      title="Age"
                      value={`${healthData.age} years`}
                      unit=""
                      color="#8b5cf6"
                      icon={AgeIcon}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </GradientCard>

            {/* Health Calculations */}
            <GradientCard>
              <CardContent>
                <GradientTypography variant="h5" gutterBottom>
                  Health Metrics
                </GradientTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MetricCard
                      title="BMI"
                      value={calculateBMI(healthData.weight, healthData.height)}
                      unit=""
                      color="#10b981"
                      icon={HeartIcon}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MetricCard
                      title="Ideal Weight (BMI 22)"
                      value={`${calculateIdealWeight(healthData.height)} kg`}
                      unit=""
                      color="#3b82f6"
                      icon={HeightIcon}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </GradientCard>

            {/* CalendarGrid */}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewDash;
