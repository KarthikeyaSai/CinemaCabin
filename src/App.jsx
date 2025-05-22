// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserAuthPage from './pages/UserAuthPage';
import Recommendation from './pages/Recommendation';
import MoviePage from './pages/MoviePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handlePreferencesContinue = (movies) => {
    console.log('User preferences saved:', movies);
    // Here you could save the preferences to state, localStorage, or send to API
    // For now, we'll just log them
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
        
        {/* Recommendation/Preferences route */}
        <Route 
          path="/recommendation" 
          element={<Recommendation onContinue={handlePreferencesContinue} />} 
        />
        
        {/* Movie detail page route */}
        <Route 
          path="/movie/:movieId" 
          element={<MoviePage />} 
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