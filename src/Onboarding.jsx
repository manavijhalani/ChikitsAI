import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Chip,
  Stack,
  InputAdornment,
  Alert,
  MenuItem,
  Select,
  FormControl as MUIFormControl,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled, Card } from '@mui/material';

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff7f50, #ff6347)', // New gradient colors
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.6)', // Darker background for the card
  backdropFilter: 'blur(15px)', // Higher blur effect
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 99, 71, 0.4)', // Slight border to match the gradient theme
}));

const steps = [
  'Device Information',
  'Basic Information',
  'Health Conditions',
  'Medical Records',
];

const commonConditions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Heart Disease',
  'Arthritis',
  'Thyroid Disorders',
  'None',
];

const availableDevices = [
  'Fitbit Charge 5',
  'Apple Watch Series 7',
  'Garmin Forerunner 945',
  'Samsung Galaxy Watch 4',
  'Xiaomi Mi Band 6',
];

const HealthOnboarding = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    hasSmartDevice: '',
    deviceType: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    conditions: [],
    medicalReports: null,
  });
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [isDataSynced, setIsDataSynced] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Navigate to the dashboard when the last step is finished
      navigate('/newdash'); // Change '/newdash' to your desired route
    } else {
      if (formData.hasSmartDevice === 'yes') {
        // Skip all steps and go directly to the dashboard if the user has a device
        navigate('/dashboard');
      } else {
        if (formData.hasSmartDevice === 'yes' && !isDeviceConnected) {
          // If the user has a device but hasn't connected it, do not proceed
          alert('Please connect your device before proceeding.');
          return;
        }
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDeviceChange = (event) => {
    setFormData({
      ...formData,
      hasSmartDevice: event.target.value,
      deviceType: event.target.value === 'no' ? '' : formData.deviceType,
    });
    if (event.target.value === 'no') {
      setIsDeviceConnected(true); // Automatically proceed if no device
    }
  };

  const handleConditionToggle = (condition) => {
    setFormData((prev) => {
      const conditions = prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition];

      // If "None" is selected, remove all other conditions
      if (condition === 'None') {
        return {
          ...prev,
          conditions: conditions.includes('None') ? ['None'] : conditions,
        };
      }

      // If any other condition is selected, remove "None"
      return {
        ...prev,
        conditions: conditions.filter((c) => c !== 'None'),
      };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({ ...prev, medicalReports: file }));
  };

  const connectDevice = () => {
    // Simulate device connection
    setIsDeviceConnected(true);
    alert('Device connected successfully!');
  };

  const syncData = () => {
    // Simulate syncing data with the connected device
    setIsDataSynced(true);
    alert('Data synced successfully!');
  };

  const DeviceStep = () => (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Do you have a smart health monitoring device?
        </FormLabel>
        <RadioGroup value={formData.hasSmartDevice} onChange={handleDeviceChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {formData.hasSmartDevice === 'yes' && (
        <Box>
          <MUIFormControl fullWidth margin="normal">
            <FormLabel component="legend">Choose Device</FormLabel>
            <Select
              value={formData.deviceType}
              onChange={(e) =>
                setFormData({ ...formData, deviceType: e.target.value })
              }
              displayEmpty
              label="Select your device"
            >
              <MenuItem value="" disabled>
                Select a device
              </MenuItem>
              {availableDevices.map((device) => (
                <MenuItem key={device} value={device}>
                  {device}
                </MenuItem>
              ))}
            </Select>
          </MUIFormControl>

          {formData.deviceType && (
            <Button variant="contained" onClick={connectDevice} sx={{ mt: 2 }}>
              Connect Device
            </Button>
          )}

          {isDeviceConnected && !isDataSynced && (
            <Button variant="outlined" onClick={syncData} sx={{ mt: 2 }}>
              Sync Data
            </Button>
          )}
        </Box>
      )}
    </Box>
  );

  const BasicInfoStep = () => (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Age"
        type="number"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        InputProps={{
          endAdornment: <InputAdornment position="end">years</InputAdornment>,
        }}
      />
      <TextField
        fullWidth
        label="Height"
        type="number"
        value={formData.height}
        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />
      <TextField
        fullWidth
        label="Weight"
        type="number"
        value={formData.weight}
        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );

  const ConditionsStep = () => (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Select any pre-existing conditions:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {commonConditions.map((condition) => (
          <Chip
            key={condition}
            label={condition}
            onClick={() => handleConditionToggle(condition)}
            color={formData.conditions.includes(condition) ? 'primary' : 'default'}
            variant={formData.conditions.includes(condition) ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
    </Box>
  );

  const MedicalRecordsStep = () => (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Upload any existing medical reports (optional)
      </Typography>
      <Button component="label" variant="outlined" startIcon={<CloudUpload />} sx={{ mt: 2 }}>
        Upload File
        <input type="file" hidden accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} />
      </Button>
      {formData.medicalReports && (
        <Alert severity="success" sx={{ mt: 2 }}>
          File uploaded: {formData.medicalReports.name}
        </Alert>
      )}
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DeviceStep />;
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <ConditionsStep />;
      case 3:
        return <MedicalRecordsStep />;
      default:
        return 'Unknown step';
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return formData.hasSmartDevice !== '' && (formData.hasSmartDevice === 'no' || isDeviceConnected);
      case 1:
        return formData.age && formData.height && formData.weight && formData.gender;
      case 2:
        return formData.conditions.length > 0;
      case 3:
        return formData.medicalReports !== null;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="sm">
        <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
        <br />
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GradientTypography variant="h4" gutterBottom>
          Health Onboarding
        </GradientTypography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepComplete(activeStep)}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HealthOnboarding;  
