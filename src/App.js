import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Chatbot from './Chatbot';
import HealthOnboarding from './Onboarding';
import HealthDashboard from './HealthDashboard';
import ChatHistoryPage from './ChatHistoryPage';
import Camera from './Video';
import MedicalReportPage from './Upload';
import Front from './Front';
import NewDash from './NewDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Front/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/onboarding" element={<HealthOnboarding />} />
        <Route path="/dashboard" element={<HealthDashboard />} />
        <Route path="/chat-history" element={<ChatHistoryPage />} />
        <Route path="/vid" element={<Camera />} />
        <Route path="/report" element={<MedicalReportPage />} />
        <Route path="/newdash" element={<NewDash />} />





      </Routes>
    </Router>
  );
}

export default App;
