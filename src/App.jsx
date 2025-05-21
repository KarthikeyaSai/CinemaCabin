// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserAuthPage from './pages/UserAuthPage';
// You might want a Navbar component that's separate from the HomePage's Header
// if you want it on all pages, or adapt the existing Header.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserAuthPage />} />
        {/* Define other routes here, e.g., for popular, new releases */}
        {/* <Route path="/popular" element={<PopularPage />} /> */}
        {/* <Route path="/new-releases" element={<NewReleasesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;