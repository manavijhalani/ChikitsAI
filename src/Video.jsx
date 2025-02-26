import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Card,
  CardContent,
  CardActions,
  Divider,
  CircularProgress,
  Alert,
  ThemeProvider,
  createTheme,
  alpha,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Camera as CameraIcon,
  Analytics as AnalyticsIcon,
  Warning as WarningIcon,
  ExitToApp as ExitIcon
} from "@mui/icons-material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00BCD4', light: '#62efff', dark: '#008ba3' },
    secondary: { main: '#7C4DFF', light: '#b47cff', dark: '#3f1dcb' },
    background: { default: '#0A1929', paper: '#132F4C' },
    error: { main: '#ff5252' }
  },
  typography: {
    h3: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 600 }
  },
  shape: { borderRadius: 16 }
});

const genAI = new GoogleGenerativeAI("AIzaSyAYUXS6nTsC8YBD5yBjob9VSE55Mb3XLvw");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
      setError(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setError("Failed to access camera. Please check your permissions.");
    }
  };

  const captureAndAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      const base64Image = imageData.split(",")[1];

      const response = await model.generateContent([
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
        `Analyze the image and provide a structured skin condition diagnosis including:
         - **Possible Condition:**
         - **Characteristics:**
         - **Recommended Actions:**
         - **Additional Notes (if any):**`
      ]);

      const analysisText = response.response.text();
      setResult(analysisText.replace(/\n/g, "\n\n"));
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError("Error analyzing image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const endChat = () => {
    const summary = {
      timestamp: new Date().toLocaleString(),
      analysisResult: result || "No analysis performed."
    };
    localStorage.setItem("chatSummary", JSON.stringify(summary));
    alert("Chat summary saved!");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 4, pb: 8 }}>
        <Container maxWidth="md">
        <div id="google_translate_element" style={{ marginBottom: '20px' }}></div> {/* Google Translate Element */}
        <br />
          <Paper elevation={24} sx={{ borderRadius: 4, p: { xs: 2, sm: 4 } }}>
            <Typography variant="h3" align="center" sx={{ color: 'primary.light', mb: 4 }}>
              AI Medical Screening
            </Typography>

            <Card>
              <CardContent>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <video ref={videoRef} autoPlay style={{ width: '100%', height: '400px' }} />
                  <canvas ref={canvasRef} width="400" height="300" style={{ display: "none" }} />
                </Box>

                <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
                  <Button variant="contained" startIcon={<CameraIcon />} onClick={startCamera} disabled={isCameraActive}>
                    Start Camera
                  </Button>
                  <Button variant="contained" startIcon={<AnalyticsIcon />} onClick={captureAndAnalyze} disabled={!isCameraActive || isAnalyzing}>
                    {isAnalyzing ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Capture & Analyze'}
                  </Button>
                  <Button variant="contained" startIcon={<ExitIcon />} color="error" onClick={endChat}>
                    End Chat
                  </Button>
                </CardActions>
                {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
                {result && (
                  <Box sx={{ mt: 4 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                      Analysis Results
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400', whiteSpace: 'pre-line' }}>{result}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Camera;
