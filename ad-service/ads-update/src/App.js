import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdsUpdateForm from './components/AdsUpdateForm';
import AdsList from './components/AdsList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<AdsList />} />
            <Route path="/update" element={<AdsUpdateForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;