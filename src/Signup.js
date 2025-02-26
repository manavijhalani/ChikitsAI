import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google Icon
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

// Firebase configuration (replace these values with your actual config)

const firebaseConfig = {
    apiKey: "AIzaSyAJfYR_TKCCPAyGSBrbsX3BZeP5qgpDIjU",
    authDomain: "medicine-5d372.firebaseapp.com",
    projectId: "medicine-5d372",
    storageBucket: "medicine-5d372.firebasestorage.app",
    messagingSenderId: "1021180976365",
    appId: "1:1021180976365:web:5c4ea27ee00a07872c00e4",
    measurementId: "G-CD2VJECD73"
  };

// Google API Configuration
const CLIENT_ID = '817373369724-gtf3hb6vki6e9smsd4kumgmd98sqji2c.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          console.log('GAPI client initialized');
        })
        .catch((error) => {
          console.error('Error initializing GAPI client:', error);
        });
    }

    gapi.load('client:auth2', start);
  }, []);


  const handleSubmit = () => {
    if (!name || !email || !password || !phoneNumber) {
      alert('Please fill out all the required fields.');
      return;
    }

    // Create a user with email and password using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully created
        const user = userCredential.user;
        console.log("User created: ", user);
        alert(`Welcome, ${name}! Your account has been created.`);
        navigate('/onboarding');
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Google Sign-In was successful
        const user = result.user;
        console.log("User signed in with Google: ", user);

          gapi.auth2.getAuthInstance().signIn().then(() => {
          console.log('User signed in');
        });

        alert(`Welcome, ${user.displayName || user.email}!`); // Display name or email
        navigate('/message');
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
        alert(`Error: ${error.message}`);
      });
  };


  return (
    <ThemeProvider theme={theme}>
        <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
        <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Card sx={{ width: 500, padding: 4, boxShadow: 3 }}>
          <CardContent>
            {/* Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <LockPersonIcon fontSize="large" color="primary" style={{ transform: 'scale(1.5)' }} />
            </div>
            {/* Title */}
            <Typography variant="h4" component="div" align="center" gutterBottom>
              Medical - Sign Up
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              gutterBottom
              style={{ fontSize: '1rem', marginBottom: '2rem' }}
            >
              Join us and start creating amazing AI-powered blogs!
            </Typography>
            <br />
            {/* Name */}
            <TextField
              id="name"
              label="Full Name"
              variant="outlined"
              size="medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ marginBottom: 3 }}
              required
            />
            {/* Email */}
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              size="medium"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: 3 }}
              required
            />
            {/* Phone Number */}
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              size="medium"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (123) 456-7890"
              fullWidth
              sx={{ marginBottom: 3 }}
              required
              inputProps={{
                inputMode: 'tel',
                pattern: '[0-9]*'
              }}
            />
            {/* Password */}
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              size="medium"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ marginBottom: 3 }}
              required
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              sx={{ padding: '12px', fontSize: '1rem', marginTop: '10px' }}
            >
              Sign Up
            </Button>

            {/* Sign In with Google Button */}
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSignInWithGoogle}
              sx={{ padding: '12px', fontSize: '1rem', marginTop: '10px' }}
              startIcon={<GoogleIcon />} // Add Google Icon
            >
              Sign In with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}


