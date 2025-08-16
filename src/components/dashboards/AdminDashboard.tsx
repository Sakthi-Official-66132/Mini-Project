import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Shield,
  Settings,
  UserCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { getUsers, updateUser } = useAuth();

  const stats = [
    {
      label: 'Total Users',
      value: '1,247',
      change: '+23 this week',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Donations',
      value: '89',
      change: '12 expiring soon',
      icon: Package,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Success Rate',
      value: '87%',
      change: '+5% vs last month',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Pending Issues',
      value: '3',
      change: 'Requires attention',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600'
    }
  ];

  const donationData = [
    { name: 'Jan', donations: 145, pickups: 127 },
    { name: 'Feb', donations: 198, pickups: 178 },
    { name: 'Mar', donations: 234, pickups: 203 },
    { name: 'Apr', donations: 267, pickups: 241 },
    { name: 'May', donations: 289, pickups: 256 },
    { name: 'Jun', donations: 312, pickups: 289 }
  ];

  const userGrowthData = [
    { name: 'Week 1', restaurants: 45, activists: 32, donors: 18 },
    { name: 'Week 2', restaurants: 52, activists: 38, donors: 21 },
    { name: 'Week 3', restaurants: 58, activists: 45, donors: 25 },
    { name: 'Week 4', restaurants: 67, activists: 52, donors: 28 }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'user_registration',
      message: 'New restaurant "Fresh Garden" registered',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'donation_posted',
      message: '25 meals posted by Green Bistro',
      timestamp: '4 hours ago',
      status: 'info'
    },
    {
      id: '3',
      type: 'pickup_completed',
      message: 'Successful pickup by Community Kitchen',
      timestamp: '6 hours ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'issue_reported',
      message: 'Quality concern reported for donation #1234',
      timestamp: '1 day ago',
      status: 'warning'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      type: 'Restaurant Registration',
      name: 'Urban Eats',
      email: 'contact@urbaneats.com',
      date: 'Jan 15, 2025'
    },
    {
      id: '2',
      type: 'NGO Verification',
      name: 'Hope Foundation',
      email: 'info@hopefoundation.org',
      date: 'Jan 14, 2025'
    }
  ];

  const handleApprove = (id: string) => {
    const users = getUsers();
    const pendingUser = users.find(u => u.status === 'pending');
    if (pendingUser) {
      updateUser(pendingUser.id, { status: 'active' });
      alert('User approved successfully!');
    } else {
      alert(`Approved item ${id}`);
    }
  };

  const handleReview = (id: string) => {
    navigate('/users');
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to reject this item?')) {
      const users = getUsers();
      const pendingUser = users.find(u => u.status === 'pending');
      if (pendingUser) {
        updateUser(pendingUser.id, { status: 'rejected' });
        alert('User rejected');
      } else {
        alert(`Rejected item ${id}`);
      }
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'users':
        navigate('/users');
        break;
      case 'donations':
        navigate('/all-donations');
        break;
      case 'analytics':
        navigate('/system-analytics');
        break;
      case 'settings':
        navigate('/settings');
        break;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return UserCheck;
      case 'donation_posted': return Package;
      case 'pickup_completed': return CheckCircle;
      case 'issue_reported': return AlertTriangle;
      default: return Clock;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
        <p className="text-gray-600 mt-2">
          Monitor platform performance and manage the FoodBridge ecosystem
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#3B82F6" name="Donations Posted" />
              <Bar dataKey="pickups" fill="#10B981" name="Successful Pickups" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="restaurants" stroke="#3B82F6" name="Restaurants" />
              <Line type="monotone" dataKey="activists" stroke="#10B981" name="Activists" />
              <Line type="monotone" dataKey="donors" stroke="#8B5CF6" name="Donors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {pendingApprovals.length} pending
            </span>
          </div>
          
          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.email}</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleApprove(item.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReview(item.id)}
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Review
                  </button>
                  <button 
                    onClick={() => handleReject(item.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('users')}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Users className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Manage Users</span>
          </button>
          <button 
            onClick={() => handleQuickAction('donations')}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <BarChart3 className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">All Donations</span>
          </button>
          <button 
            onClick={() => handleQuickAction('analytics')}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">System Analytics</span>
          </button>
          <button 
            onClick={() => handleQuickAction('settings')}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Settings className="h-6 w-6 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;