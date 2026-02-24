import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NFTDetailPage from './pages/NFTDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nft/:id" element={<NFTDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;