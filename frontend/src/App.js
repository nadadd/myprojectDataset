import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import TechnicalCriteriaPage from './pages/TechnicalCriteriaPage';
import EthicalCriteriaPage from './pages/EthicalCriteriaPage';
import VisualizationsPage from './pages/VisualizationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/technical-criteria" element={<TechnicalCriteriaPage />} />
        <Route path="/ethical-criteria" element={<EthicalCriteriaPage />} />
        <Route path="/visualizations" element={<VisualizationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
