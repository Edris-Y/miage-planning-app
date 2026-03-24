import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages globales
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Enseignant
import EnseignantCalendar from './enseignant/pages/EnseignantCalendar';
import EnseignantNotifications from './enseignant/pages/EnseignantNotifications';
import EnseignantDemandes from './enseignant/pages/EnseignantDemandes';
import EnseignantNouvelleDemandeReservation from './enseignant/pages/EnseignantNouvelleDemandeReservation';
import EnseignantSeanceDetails from './enseignant/pages/EnseignantSeanceDetails';
import EnseignantCohortes from './enseignant/pages/EnseignantCohortes';

// Étudiant
import EtudiantPage from './etudiant/pages/EtudiantPage';

// Admin
import AdminLayout from './admin/layout/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminGeneration from './admin/pages/AdminGeneration';
import AdminReservations from './admin/pages/AdminReservations';
import AdminConflits from './admin/pages/AdminConflits';
import AdminSalles from './admin/pages/AdminSalles';
import AdminUtilisateurs from './admin/pages/AdminUtilisateurs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnseignantCalendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<EnseignantCalendar />} />
        <Route path="/enseignant/notifications" element={<EnseignantNotifications />} />
        <Route path="/enseignant/demandes" element={<EnseignantDemandes />} />
        <Route path="/enseignant/demandes/nouvelle-reservation" element={<EnseignantNouvelleDemandeReservation />} />
        <Route path="/enseignant/seance/:id" element={<EnseignantSeanceDetails />} />
        <Route path="/enseignant/cohortes" element={<EnseignantCohortes />} />

        <Route path="/etudiant" element={<EtudiantPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="generation" element={<AdminGeneration />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="conflits" element={<AdminConflits />} />
          <Route path="salles" element={<AdminSalles />} />
          <Route path="utilisateurs" element={<AdminUtilisateurs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;