import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Import your CSS file
import Orb from './Orb';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { BookOpen, Target, PenTool, Globe } from 'lucide-react';

function Front() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mt: 4, // Adjust margin-top for spacing
        }}
      >
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
        <Typography variant="h3" className="ai-helper-text">
          ChikitsAi
        </Typography>
        <Typography variant="h6" className="ai-description">
          Your intelligent assistant for smarter solutions. Powered by AI,
          designed for you.
        </Typography>
      </Box>

      {/* Feature Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // Responsive columns
          gap: 3,
          mt: 6, // Ensures it comes below the description
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {[
          {
            icon: BookOpen,
            title: 'Topic Discovery',
            description:
              "Setup your blog's direction with AI-powered topic suggestions and trending analysis.",
            color: '#6b46c1',
            path: '/recent',
          },
          {
            icon: Target,
            title: 'Research Assistant',
            description:
              'Get instant access to verified facts, statistics, and reliable sources.',
            color: '#3182ce',
            path: '/Research_chat',
          },
          {
            icon: PenTool,
            title: 'AI Writer',
            description:
              'Generate engaging content with AI assistance and real-time suggestions.',
            color: '#38a169',
            path: '/AIBlogCreator',
          },
          {
            icon: Globe,
            title: 'Translation',
            description:
              'Translate your content into multiple languages with one click.',
            color: '#319795',
            path: '/LanguageTranslator',
          },
        ].map((feature, index) => (
          <Card
            key={index}
            sx={{
              width: 380,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: 3,
              borderRadius: 3,
              transition: 'transform 0.3s',
              ':hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: feature.color + '20',
                  mb: 2,
                }}
              >
                <feature.icon size={28} color={feature.color} />
              </Box>
              <Typography variant="h5" color="text.primary" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: feature.color,
                  ':hover': { bgcolor: feature.color },
                }}
                fullWidth
                onClick={() => handleNavigation(feature.path)}
              >
                Explore {feature.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quick Start */}
      <Box textAlign="center" mt={4}>
        <Button variant="text" color="primary" onClick={() => navigate('/dashboard')}>
          Skip to Dashboard →
        </Button>
      </Box>
    </>
  );
}

export default Front;
