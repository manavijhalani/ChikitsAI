import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Menu,
  MenuItem,
  Grid,
  Container,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { jsPDF } from 'jspdf';

// Braille conversion mapping (Unicode Braille Patterns)
const brailleMap = {
  a: '⠁',
  b: '⠃',
  c: '⠉',
  d: '⠙',
  e: '⠑',
  f: '⠋',
  g: '⠛',
  h: '⠓',
  i: '⠊',
  j: '⠚',
  k: '⠅',
  l: '⠇',
  m: '⠍',
  n: '⠝',
  o: '⠕',
  p: '⠏',
  q: '⠟',
  r: '⠗',
  s: '⠎',
  t: '⠞',
  u: '⠥',
  v: '⠧',
  w: '⠺',
  x: '⠭',
  y: '⠽',
  z: '⠵',
  ' ': '⠀',
  '.': '⠲',
  ',': '⠂',
  '!': '⠖',
  '?': '⠦',
  '"': '⠶',
  "'": '⠄',
  ';': '⠆',
  ':': '⠒',
  '\n': '\n',
};

const ChatHistoryPage = () => {
  const [chatHistories, setChatHistories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    // Retrieve chat summary from localStorage
    const savedSummary = localStorage.getItem("chatSummary");
    if (savedSummary) {
      const summaryData = JSON.parse(savedSummary);
      setChatHistories((prevHistories) => [
        ...prevHistories,
        {
          id: prevHistories.length + 1, // Generate a new ID
          title: `Chat on ${summaryData.timestamp}`,
          summary: summaryData.analysisResult,
          timestamp: summaryData.timestamp,
          fullContent: summaryData.analysisResult, // Assuming full content is the same as analysis result
        },
      ]);
    }
  }, []);

  const handleMenuClick = (event, chatId) => {
    setAnchorEl(event.currentTarget);
    setSelectedChat(chatId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChat(null);
  };

  const handleDelete = (chatId) => {
    setChatHistories((histories) =>
      histories.filter((chat) => chat.id !== chatId)
    );
  };

  const textToBraille = (text) => {
    return text
      .toLowerCase()
      .split('')
      .map((char) => brailleMap[char] || char)
      .join('');
  };

  const downloadBraille = (chat) => {
    const brailleText = textToBraille(
      `${chat.title}\n\n${chat.summary}\n\n${chat.fullContent}`
    );

    const blob = new Blob([brailleText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chat.title.replace(/\s+/g, '_')}_braille.brf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = (chat) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(chat.title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(chat.timestamp).toLocaleDateString()}`, 20, 30);
    doc.text('Summary:', 20, 40);
    doc.text(doc.splitTextToSize(chat.summary, 170), 20, 50);
    doc.text('Conversation:', 20, 70);
    doc.text(doc.splitTextToSize(chat.fullContent, 170), 20, 80);
    doc.save(`${chat.title.replace(/\s+/g, '_')}.pdf`);
  };

  const handleDownload = (format) => {
    const chat = chatHistories.find((c) => c.id === selectedChat);
    if (!chat) return;
    if (format === 'braille') {
      downloadBraille(chat);
    } else if (format === 'pdf') {
      downloadPDF(chat);
    }
    handleMenuClose();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
        <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
        <br />
      <Typography variant="h4" component="h1" gutterBottom>
        Chat History
      </Typography>

      <Grid container spacing={3}>
        {chatHistories.map((chat) => (
          <Grid item xs={12} md={6} lg={4} key={chat.id}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="h6" component="h2" gutterBottom>
                    {chat.title}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, chat.id)}
                      size="small"
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(chat.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {chat.summary}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(chat.timestamp).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDownload('braille')}>
          Download as Braille
        </MenuItem>
        <MenuItem onClick={() => handleDownload('pdf')}>
          Download as PDF
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default ChatHistoryPage;