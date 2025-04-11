import './styles/globals.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HeroSection from './components/home/HeroSection';
import GDRoom from './components/gd-room/GDRoom';

const HomePage = () => (
  <div>
    <HeroSection />
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gd" element={<GDRoom />} />
          <Route path="/resume" element={<div>Resume Tips</div>} />
          <Route path="/leaderboard" element={<div>Leaderboard</div>} />
          <Route path="/history" element={<div>History</div>} />
          <Route path="/profile" element={<div>Profile</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;