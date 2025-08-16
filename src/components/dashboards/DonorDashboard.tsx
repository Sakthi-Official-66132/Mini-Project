import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Leaf,
  Plus,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Donations',
      value: '24',
      change: '+3 this week',
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Listings',
      value: '5',
      change: '2 expiring soon',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Successful Pickups',
      value: '19',
      change: '+2 this week',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'People Helped',
      value: '147',
      change: 'Estimated reach',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recentDonations = [
    {
      id: '1',
      title: 'Fresh Sandwiches & Salads',
      quantity: '15 meals',
      status: 'picked-up',
      pickupTime: new Date('2025-01-16T14:30:00'),
      activistName: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Bakery Items - End of Day',
      quantity: '20 items',
      status: 'requested',
      pickupTime: new Date('2025-01-16T18:00:00'),
      activistName: 'Mike Chen'
    },
    {
      id: '3',
      title: 'Prepared Meals (Vegetarian)',
      quantity: '12 meals',
      status: 'available',
      pickupTime: new Date('2025-01-16T19:30:00'),
      activistName: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'picked-up': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'post-donation':
        navigate('/post-donation');
        break;
      case 'view-listings':
        navigate('/my-donations');
        break;
      case 'analytics':
        navigate('/analytics');
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.restaurantName || user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your impact dashboard. Thank you for helping fight food waste.
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => handleQuickAction('post-donation')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
            <Plus className="h-4 w-4" />
            <span>Post New Donation</span>
          </button>
          <button 
            onClick={() => handleQuickAction('view-listings')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4" />
            <span>View All Listings</span>
          </button>
          <button 
            onClick={() => handleQuickAction('analytics')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-4 w-4" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
          <button 
            onClick={() => navigate('/my-donations')}
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentDonations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{donation.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {donation.quantity} • Pickup: {format(donation.pickupTime, 'MMM d, HH:mm')}
                </p>
                {donation.activistName && (
                  <p className="text-sm text-gray-500">Assigned to: {donation.activistName}</p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                  {donation.status.replace('-', ' ')}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <Leaf className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Your Impact This Month</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89kg</div>
            <div className="text-sm text-gray-600">Food waste prevented</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">147</div>
            <div className="text-sm text-gray-600">People helped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Partner organizations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;