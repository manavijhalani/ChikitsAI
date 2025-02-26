import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

// Firebase configuration (replace with your actual config values)
const firebaseConfig = {
  apiKey: "AIzaSyAJfYR_TKCCPAyGSBrbsX3BZeP5qgpDIjU",
  authDomain: "medicine-5d372.firebaseapp.com",
  projectId: "medicine-5d372",
  storageBucket: "medicine-5d372.firebasestorage.app",
  messagingSenderId: "1021180976365",
  appId: "1:1021180976365:web:5c4ea27ee00a07872c00e4",
  measurementId: "G-CD2VJECD73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();  // Initialize navigation

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    // Sign in with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in: ", user);
        alert(`Welcome back! You have successfully logged in.`);
        navigate('/onboarding');
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
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
        <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
        <br />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <LockOutlinedIcon fontSize="large" color="primary" style={{ transform: 'scale(1.5)' }} />
          </div>
          <Typography variant="h4" component="div" align="center" gutterBottom>
            ChikitsAI
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Welcome back! Sign in to continue your health journey
          </Typography>
          <br />
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
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="medium"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link href="#" variant="body2" color="primary">
              Forgot password?
            </Link>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSubmit}
            sx={{ padding: '12px', fontSize: '1rem', marginBottom: 2 }}
          >
            Sign In
          </Button>
          <Typography align="center" variant="body2">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              color="primary"
              onClick={() => navigate('/signup')} // Navigate to signup page
            >
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
