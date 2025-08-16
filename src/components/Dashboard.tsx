import React from 'react';
import { useAuth } from '../context/AuthContext';
import DonorDashboard from './dashboards/DonorDashboard';
import ActivistDashboard from './dashboards/ActivistDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'restaurant':
    case 'donor':
      return <DonorDashboard />;
    case 'activist':
      return <ActivistDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Unknown user role</div>;
  }
};

export default Dashboard;