import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import UploadRecognitionPage from './Pages/UploadRecognition'; // Example page for upload recognition
import ExplorePage from './Pages/Explore';  // Example for Explore page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* These are child routes under /dashboard */}
          <Route path="uploadrecognition" element={<UploadRecognitionPage />} />
          <Route path="explore" element={<ExplorePage />} />
          {/* Other dashboard routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
