import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Alert,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: '#1B2132', // Changed to match dark theme
  color: '#FFFFFF', // Added to ensure text is visible on dark background
  '& .MuiTextField-root': {
    backgroundColor: '#2A3447', // Adding darker background for text fields
    borderRadius: theme.spacing(1),
  },
  '& .MuiInputLabel-root': {
    color: '#FFFFFF', // Making labels visible on dark background
  },
  '& .MuiOutlinedInput-root': {
    color: '#FFFFFF', // Making input text visible on dark background
  },
}));

// Rest of the component code remains exactly the same
const CalendarIntegration = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  useEffect(() => {
    const initializeGapi = () => {
      window.gapi.client
        .init({
          clientId:
            '817373369724-gtf3hb6vki6e9smsd4kumgmd98sqji2c.apps.googleusercontent.com',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: 'https://www.googleapis.com/auth/calendar.events',
        })
        .then(() => {
          const auth2 = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth2.isSignedIn.get());
          auth2.isSignedIn.listen(updateSignInStatus);
        })
        .catch((error) => {
          setError('Error initializing Google Calendar API');
          console.error('Error initializing GAPI client:', error);
        });
    };

    if (window.gapi) {
      window.gapi.load('client:auth2', initializeGapi);
    }
  }, []);

  const updateSignInStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
    if (isSignedIn) {
      setSuccess('Successfully signed in!');
    } else {
      setSuccess('');
    }
  };

  const handleSignIn = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signIn();
      setError('');
    } catch (error) {
      setError('Error signing in to Google Calendar');
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      setError('');
    } catch (error) {
      setError('Error signing out');
      console.error('Error signing out:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createEvent = async (e) => {
    e.preventDefault();

    if (
      !eventDetails.summary ||
      !eventDetails.date ||
      !eventDetails.startTime ||
      !eventDetails.endTime
    ) {
      setError('Please fill in all required fields');
      return;
    }

    const startDateTime = new Date(
      `${eventDetails.date}T${eventDetails.startTime}`
    );
    const endDateTime = new Date(
      `${eventDetails.date}T${eventDetails.endTime}`
    );

    const event = {
      summary: eventDetails.summary,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: eventDetails.timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: eventDetails.timeZone,
      },
    };

    try {
      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      setSuccess('Event created successfully!');
      setError('');

      setEventDetails({
        summary: '',
        location: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        timeZone: eventDetails.timeZone,
      });

      console.log('Event created:', response);
    } catch (error) {
      setError('Error creating event');
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Box component="form" onSubmit={createEvent} noValidate>
          <Stack spacing={3}>
            <Typography variant="h4" align="center" gutterBottom>
              Add reminder
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Box>
              {!isSignedIn ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignIn}
                  size="large"
                >
                  Sign In with Google
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleSignOut}
                  size="large"
                >
                  Sign Out
                </Button>
              )}
            </Box>

            {isSignedIn && (
              <Stack spacing={3}>
                <TextField
                  required
                  fullWidth
                  label="Event Title"
                  name="summary"
                  value={eventDetails.summary}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={eventDetails.location}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={eventDetails.description}
                  onChange={handleInputChange}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      label="Date"
                      type="date"
                      name="date"
                      value={eventDetails.date}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      label="Start Time"
                      type="time"
                      name="startTime"
                      value={eventDetails.startTime}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      label="End Time"
                      type="time"
                      name="endTime"
                      value={eventDetails.endTime}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Create Event
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default CalendarIntegration;