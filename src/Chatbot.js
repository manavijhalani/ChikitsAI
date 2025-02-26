import React, { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import KeyboardComponent from './Keyboard';
import LanguageSelector from './dropbox';
import CameraComponent from './x';

const Chatbot = () => {
  const [layout, setLayout] = useState('english');
  const [input, setInput] = useState('');
  const [res, setRes] = useState('');

  const handleLanguageChange = (newLayout) => {
    setLayout(newLayout);
    setInput('');
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#121212',
        flexDirection: { xs: 'column', md: 'row' },
        color: '#ffffff',
        gap: 2,
        p: 2
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {/* Language Selector */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            borderRadius: 2,
            overflow: 'hidden',
            minHeight: '150px',
            bgcolor: '#1B2132',
            color: '#ffffff'
          }}
        >
          <LanguageSelector
            onLanguageChange={handleLanguageChange}
            selectedLanguage={layout}
          />
        </Paper>

        {/* Response Section */}
        <Paper
          elevation={3}
          sx={{
            flex: 2,
            borderRadius: 2,
            overflow: 'hidden',
            minHeight: '150px',
            bgcolor: '#1B2132',
            color: '#ffffff',
            p: 2
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Box sx={{ fontWeight: 'bold', mb: 1 }}>
              {layout === 'marathi' ? 'उत्तर:' :
               layout === 'hindi' ? 'उत्तर:' :
               'Response:'}
            </Box>
            <Box
              sx={{
                mt: 1,
                p: 2,
                bgcolor: '#2A3447',
                borderRadius: 1,
                minHeight: '100px'
              }}
            >
              {res}
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {/* Avatar Section */}
        <Paper
          elevation={3}
          sx={{
            flex: 2,
            borderRadius: 2,
            overflow: 'hidden',
            minHeight: '300px',
            bgcolor: '#1B2132',
            color: '#ffffff'
          }}
        >
        </Paper>

        {/* Camera Section */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            borderRadius: 2,
            overflow: 'hidden',
            minHeight: '150px',
            bgcolor: '#1B2132',
            color: '#ffffff'
          }}
        >
          <CameraComponent
            setChatInput={setInput}
            chatInput={input}
            layout={layout}
            setRes={setRes}
          />
        </Paper>

        {/* Keyboard Section */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: '#1B2132',
            color: '#ffffff'
          }}
        >
          <KeyboardComponent
            setInput={setInput}
            layout={layout}
            input={input}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Chatbot;