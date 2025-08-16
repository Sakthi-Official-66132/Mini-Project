import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import BrowseFood from './components/BrowseFood';
import MyRequests from './components/MyRequests';
import Beneficiaries from './components/Beneficiaries';
import ImpactReports from './components/ImpactReports';
import PostDonation from './components/PostDonation';
import ViewListings from './components/ViewListings';
import Analytics from './components/Analytics';
import ProfileSettings from './components/ProfileSettings';
import UserManagement from './components/UserManagement';
import AllDonations from './components/AllDonations';
import SystemAnalytics from './components/SystemAnalytics';
import SystemSettings from './components/SystemSettings';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/post-donation" element={
            <ProtectedRoute>
              <PostDonation />
            </ProtectedRoute>
          } />
          <Route path="/my-donations" element={
            <ProtectedRoute>
              <ViewListings />
            </ProtectedRoute>
          } />
          <Route path="/browse-food" element={
            <ProtectedRoute>
              <BrowseFood />
            </ProtectedRoute>
          } />
          <Route path="/my-requests" element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          } />
          <Route path="/beneficiaries" element={
            <ProtectedRoute>
              <Beneficiaries />
            </ProtectedRoute>
          } />
          <Route path="/impact-reports" element={
            <ProtectedRoute>
              <ImpactReports />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/all-donations" element={
            <ProtectedRoute>
              <AllDonations />
            </ProtectedRoute>
          } />
          <Route path="/system-analytics" element={
            <ProtectedRoute>
              <SystemAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SystemSettings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;