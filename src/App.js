import React from 'react';
import CalendarIntegration from './CalendarIntegration';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Stack, 
  Paper, 
  styled 
} from '@mui/material';
import { 
  AttachMoney as InvestmentIcon, 
  AccountBalance as BankIcon, 
  Assessment as RiskIcon, 
  VerifiedUser as KYCIcon 
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from './Navbar';

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #60a5fa, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'rgba(31, 41, 55, 0.5)',
  backdropFilter: 'blur(12px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(107, 114, 128, 0.3)',
}));

const MetricCard = ({ title, value, unit, icon: Icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      background: `linear-gradient(135deg, ${color}19, ${color}33)`,
      borderRadius: 4,
      border: `1px solid ${color}33`,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    }}
  >
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Icon sx={{ color: color }} />
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {unit}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

const Dash = () => {
  const investmentData = [
    { month: 'Jan', returns: 5.2 },
    { month: 'Feb', returns: 6.8 },
    { month: 'Mar', returns: 5.4 },
    { month: 'Apr', returns: 7.1 },
    { month: 'May', returns: 6.3 },
  ];

  return (
    <Box sx={{ 
      p: 4, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827, #1f2937)',
      color: 'white'
    }}>
      <Navbar />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <GradientCard>
            <CalendarIntegration/>
          </GradientCard>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            <GradientCard>
              <CardContent>
                <GradientTypography variant="h4" gutterBottom>
                  Portfolio Summary
                </GradientTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <MetricCard
                      title="Investments"
                      value="Rs 13K"
                      unit="INR"
                      color="#3b82f6"
                      icon={InvestmentIcon}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MetricCard
                      title="Risk Level"
                      value="Moderate"
                      unit=""
                      color="#ef4444"
                      icon={RiskIcon}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MetricCard
                      title="KYC Status"
                      value="Verified"
                      unit=""
                      color="#10b981"
                      icon={KYCIcon}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MetricCard
                      title="Bank Balance"
                      value="Rs 25K"
                      unit="INR"
                      color="#8b5cf6"
                      icon={BankIcon}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </GradientCard>

            <GradientCard>
              <CardContent>
                <GradientTypography variant="h5" gutterBottom>
                  Investment Growth
                </GradientTypography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={investmentData}>
                    <XAxis dataKey="month" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Line type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dash;
