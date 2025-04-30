import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TournamentPage from './pages/TournamentPage';
import CreateTournamentPage from './pages/CreateTournamentPage';
import JoinTournamentPage from './pages/JoinTournamentPage';
import AuctionPage from './pages/AuctionPage';
import ProfilePage from './pages/ProfilePage';
import GamesPage from './pages/GamesPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { TournamentProvider } from './context/TournamentContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TournamentProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="tournaments/create" element={<CreateTournamentPage />} />
              <Route path="tournaments/join" element={<JoinTournamentPage />} />
              <Route path="tournaments/:id" element={<TournamentPage />} />
              <Route path="tournaments/:id/auction" element={<AuctionPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="games" element={<GamesPage />} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          <Toaster position="top-right" />
        </TournamentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;