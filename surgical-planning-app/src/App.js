import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Calendar from './pages/Calender';
import NewCase from './pages/NewCase';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Reference from './pages/Reference';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Public Route Component (redirects to dashboard if already logged in)
function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken');
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Logout Route */}
          <Route path="/logout" element={<LogoutHandler />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><><Navbar /><Dashboard /></></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><><Navbar /><Patients /></></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><><Navbar /><Calendar /></></ProtectedRoute>} />
          <Route path="/new-case" element={<ProtectedRoute><><Navbar /><NewCase /></></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><><Navbar /><Chat /></></ProtectedRoute>} />
          <Route path="/reference" element={<ProtectedRoute><><Navbar /><Reference /></></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

// Logout Handler Component
function LogoutHandler() {
  React.useEffect(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  }, []);
  return null;
}

export default App;