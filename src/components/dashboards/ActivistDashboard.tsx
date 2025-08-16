import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  Package, 
  Users, 
  Heart,
  Navigation,
  Phone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

const ActivistDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Available Donations',
      value: '18',
      change: '3 new today',
      icon: Search,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Requests',
      value: '4',
      change: '2 pickup today',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Completed Pickups',
      value: '31',
      change: '+5 this week',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'People Fed',
      value: '243',
      change: 'This month',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const availableDonations = [
    {
      id: '1',
      title: 'Fresh Bread & Pastries',
      donor: 'Sunshine Bakery',
      quantity: '25 items',
      distance: '1.2 km',
      pickupTime: {
        start: '17:00',
        end: '19:00'
      },
      address: '123 Baker St, Downtown',
      expiryDate: new Date('2025-01-16T20:00:00'),
      dietaryInfo: ['Vegetarian options available']
    },
    {
      id: '2',
      title: 'Prepared Meals (Mixed)',
      donor: 'Green Bistro',
      quantity: '30 meals',
      distance: '2.1 km',
      pickupTime: {
        start: '18:30',
        end: '20:00'
      },
      address: '456 Main Ave, Central',
      expiryDate: new Date('2025-01-16T21:00:00'),
      dietaryInfo: ['Contains nuts', 'Halal available']
    },
    {
      id: '3',
      title: 'Fresh Vegetables & Fruits',
      donor: 'Metro Grocery',
      quantity: '50kg mixed',
      distance: '0.8 km',
      pickupTime: {
        start: '16:00',
        end: '18:00'
      },
      address: '789 Oak Rd, Northside',
      expiryDate: new Date('2025-01-17T12:00:00'),
      dietaryInfo: ['Organic', 'Vegan']
    }
  ];

  const myRequests = [
    {
      id: '1',
      title: 'Sandwiches & Salads',
      donor: 'City Cafe',
      status: 'confirmed',
      pickupTime: new Date('2025-01-16T15:30:00'),
      contact: '+1-555-0123'
    },
    {
      id: '2',
      title: 'Surplus Groceries',
      donor: 'Fresh Market',
      status: 'pending',
      pickupTime: new Date('2025-01-16T17:00:00'),
      contact: '+1-555-0456'
    }
  ];

  const handleViewAllDonations = () => {
    navigate('/browse-food');
  };

  const handleRequestPickup = (donationId: string) => {
    // In real app, this would make an API call
    alert(`Pickup request sent for donation ${donationId}`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleViewDetailedReports = () => {
    navigate('/impact-reports');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (expiryDate: Date) => {
    const now = new Date();
    const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilExpiry < 3) return 'text-red-600';
    if (hoursUntilExpiry < 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.organizationName && `${user.organizationName} • `}
          Ready to make a difference in your community today.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Donations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Available Donations Near You</h2>
            <button 
              onClick={handleViewAllDonations}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {availableDonations.map((donation) => (
              <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{donation.title}</h3>
                    <p className="text-sm text-gray-600">by {donation.donor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{donation.quantity}</span>
                    <p className="text-xs text-gray-500">{donation.distance} away</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Pickup: {donation.pickupTime.start} - {donation.pickupTime.end}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{donation.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className={`h-4 w-4 ${getUrgencyColor(donation.expiryDate)}`} />
                    <span className={getUrgencyColor(donation.expiryDate)}>
                      Expires: {format(donation.expiryDate, 'MMM d, HH:mm')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {donation.dietaryInfo.map((info, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {info}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleRequestPickup(donation.id)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Request Pickup
                  </button>
                  <button 
                    onClick={() => alert(`Getting directions to: ${donation.address}`)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Requests */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Active Requests</h2>
            
            <div className="space-y-4">
              {myRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{request.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.donor} • {format(request.pickupTime, 'MMM d, HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <button 
                      onClick={() => handleCall(request.contact)}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Your Impact</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">127kg</div>
                <div className="text-sm text-gray-600">Food rescued</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-600">Partner venues</div>
              </div>
            </div>
            <button 
              onClick={handleViewDetailedReports}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-sm font-medium"
            >
              View Detailed Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivistDashboard;