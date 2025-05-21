// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Homepage.css';
import './styles/Global.css'; 
// If you installed Bootstrap via npm:
import 'bootstrap/dist/css/bootstrap.min.css'; //

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);