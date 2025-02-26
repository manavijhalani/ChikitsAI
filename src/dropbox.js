import React from 'react';
import { 
  Box, 
  Button, 
  ButtonGroup,
  Typography 
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const LanguageSelector = ({ onLanguageChange, selectedLanguage }) => {
  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी' },
    { code: 'marathi', name: 'मराठी' }
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1 
        }}
      >
        <LanguageIcon color="primary" />
        Select Language
      </Typography>

      <ButtonGroup variant="contained" size="large">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            sx={{
              minWidth: '120px',
              bgcolor: selectedLanguage === lang.code ? 'primary.dark' : 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            {lang.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSelector;