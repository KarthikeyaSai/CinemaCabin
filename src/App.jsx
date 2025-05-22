// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserAuthPage from './pages/UserAuthPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to login if not authenticated, otherwise to home */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } 
        />
        
        {/* Login route - redirect to home if already authenticated */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <UserAuthPage onLogin={handleLogin} />
            )
          } 
        />
        
        {/* Home route - redirect to login if not authenticated */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <HomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Catch all other routes and redirect based on auth status */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;