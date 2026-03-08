import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import EtudiantPage from './pages/EtudiantPage';
import CohortesPage from './pages/CohortesPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/etudiant" element={<EtudiantPage />} />
        <Route path="/cohortes" element={<CohortesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;