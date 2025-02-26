// Frontend: MedicalReportPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Grid, CircularProgress, Card, CardContent, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
        },
    },
});

const MedicalReportPage = () => {
    const [file, setFile] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadPrescription = async () => {
        if (!file) {
            alert('Please upload a prescription image.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Make sure we're getting an array
            const parsedInfo = Array.isArray(response.data.parsed_info) 
                ? response.data.parsed_info 
                : [];
                
            console.log("Parsed Info:", parsedInfo);
            setMedicines(parsedInfo);
        } catch (error) {
            console.error('Error uploading prescription:', error);
            alert('An error occurred while processing the prescription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper style={{ padding: '20px', minHeight: '100vh' }}>
            <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
            <br />
                <div id="google_translate_element" style={{ marginBottom: '20px' }}></div>
                <Typography variant="h4" gutterBottom align="center">
                    Prescription Parser
                </Typography>
                
                <Box display="flex" justifyContent="center" mb={2}>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginRight: '10px', backgroundColor: '#333', color: 'white', padding: '10px' }}
                    />
                    <Button 
                        onClick={uploadPrescription} 
                        variant="contained" 
                        color="primary" 
                        disabled={loading}
                        style={{ height: '50px' }}
                    >
                        {loading ? 'Processing...' : 'Upload Prescription'}
                    </Button>
                </Box>

                {loading && (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                            Processing prescription...
                        </Typography>
                    </div>
                )}

                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom>Medication Details:</Typography>
                    <Grid container spacing={2}>
                        {medicines.length > 0 ? (
                            medicines.map((med, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card elevation={3} style={{ backgroundColor: '#1e1e1e' }}>
                                        <CardContent>
                                            <Typography variant="h6" color="primary" gutterBottom>
                                                {med.medicine || 'Unknown Medicine'}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <strong>Dosage:</strong> {med.dosage || 'Not specified'}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <strong>Frequency:</strong> {med.frequency || 'Not specified'}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <strong>Duration:</strong> {med.duration || 'Not specified'}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <strong>Instructions:</strong> {med.instructions || 'None provided'}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Total:</strong> {med.total || 'Not specified'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="body1" color="textSecondary" align="center">
                                    No medications found. Upload a prescription to see the details.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </Paper>
        </ThemeProvider>
    );
};

export default MedicalReportPage;