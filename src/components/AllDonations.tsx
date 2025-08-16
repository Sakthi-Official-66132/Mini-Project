import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  MapPin, 
  Clock, 
  User,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';

const AllDonations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [foodTypeFilter, setFoodTypeFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const donations = [
    {
      id: '1',
      title: 'Fresh Sandwiches & Salads',
      description: 'Assorted fresh sandwiches and garden salads from lunch menu',
      donor: 'Green Bistro',
      donorEmail: 'contact@greenbistro.com',
      donorPhone: '+1-555-0123',
      foodType: 'prepared',
      quantity: 15,
      unit: 'meals',
      status: 'picked-up',
      expiryDate: new Date('2025-01-16T20:00:00'),
      pickupAddress: '123 Main St, Downtown',
      pickupTime: { start: '17:00', end: '19:00' },
      createdAt: new Date('2025-01-16T10:00:00'),
      requestedBy: 'Sarah Johnson',
      activistEmail: 'sarah.j@email.com',
      activistPhone: '+1-555-0456',
      completedAt: new Date('2025-01-16T17:30:00')
    },
    {
      id: '2',
      title: 'Bakery Items - End of Day',
      description: 'Fresh bread, pastries, and baked goods from today\'s production',
      donor: 'Sunshine Bakery',
      donorEmail: 'info@sunshinebakery.com',
      donorPhone: '+1-555-0789',
      foodType: 'bakery',
      quantity: 25,
      unit: 'items',
      status: 'requested',
      expiryDate: new Date('2025-01-17T08:00:00'),
      pickupAddress: '456 Baker St, Central',
      pickupTime: { start: '18:00', end: '20:00' },
      createdAt: new Date('2025-01-16T08:00:00'),
      requestedBy: 'Mike Chen',
      activistEmail: 'mike.chen@email.com',
      activistPhone: '+1-555-0321'
    },
    {
      id: '3',
      title: 'Fresh Vegetables & Fruits',
      description: 'Assorted vegetables and fruits - slightly imperfect but fresh',
      donor: 'Metro Grocery',
      donorEmail: 'manager@metrogrocery.com',
      donorPhone: '+1-555-0654',
      foodType: 'fresh',
      quantity: 30,
      unit: 'kg',
      status: 'available',
      expiryDate: new Date('2025-01-17T12:00:00'),
      pickupAddress: '789 Market St, Westside',
      pickupTime: { start: '16:00', end: '18:00' },
      createdAt: new Date('2025-01-16T12:00:00')
    },
    {
      id: '4',
      title: 'Prepared Indian Meals',
      description: 'Vegetarian curry, rice, and naan bread - freshly prepared',
      donor: 'Spice Garden',
      donorEmail: 'orders@spicegarden.com',
      donorPhone: '+1-555-0987',
      foodType: 'prepared',
      quantity: 20,
      unit: 'meals',
      status: 'expired',
      expiryDate: new Date('2025-01-15T22:00:00'),
      pickupAddress: '321 Spice Ave, Eastside',
      pickupTime: { start: '19:00', end: '21:00' },
      createdAt: new Date('2025-01-15T16:00:00')
    }
  ];

  const stats = [
    {
      label: 'Total Donations',
      value: donations.length.toString(),
      change: '+8 today',
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Available Now',
      value: donations.filter(d => d.status === 'available').length.toString(),
      change: 'Ready for pickup',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'In Progress',
      value: donations.filter(d => d.status === 'requested').length.toString(),
      change: 'Being processed',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Completed',
      value: donations.filter(d => d.status === 'picked-up').length.toString(),
      change: 'Successfully rescued',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'picked-up': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return Package;
      case 'requested': return Clock;
      case 'picked-up': return CheckCircle;
      case 'expired': return AlertCircle;
      default: return Package;
    }
  };

  const getFoodTypeColor = (foodType: string) => {
    switch (foodType) {
      case 'prepared': return 'bg-blue-100 text-blue-800';
      case 'bakery': return 'bg-yellow-100 text-yellow-800';
      case 'fresh': return 'bg-green-100 text-green-800';
      case 'packaged': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    const matchesFoodType = foodTypeFilter === 'all' || donation.foodType === foodTypeFilter;
    return matchesSearch && matchesStatus && matchesFoodType;
  });

  const handleViewDetails = (donationId: string) => {
    alert(`Viewing details for donation ${donationId}`);
  };

  const handleContactDonor = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleContactActivist = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Donations</h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage all food donations across the GIVE2GROW platform
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

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search donations by title, donor, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="requested">Requested</option>
              <option value="picked-up">Picked Up</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={foodTypeFilter}
              onChange={(e) => setFoodTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Food Types</option>
              <option value="prepared">Prepared Meals</option>
              <option value="bakery">Bakery Items</option>
              <option value="fresh">Fresh Produce</option>
              <option value="packaged">Packaged Foods</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Info</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activist</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDonations.map((donation) => {
                const StatusIcon = getStatusIcon(donation.status);
                return (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{donation.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{donation.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getFoodTypeColor(donation.foodType)}`}>
                            {donation.foodType}
                          </span>
                          <span className="text-xs text-gray-500">{donation.quantity} {donation.unit}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donor}</p>
                        <p className="text-sm text-gray-600">{donation.donorEmail}</p>
                        <p className="text-sm text-gray-500">{donation.donorPhone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)} flex items-center space-x-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        <span>{donation.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-900">{donation.pickupTime.start} - {donation.pickupTime.end}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600 truncate">{donation.pickupAddress}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-500">Expires: {format(donation.expiryDate, 'MMM d, HH:mm')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {donation.requestedBy ? (
                        <div>
                          <p className="font-medium text-gray-900">{donation.requestedBy}</p>
                          <p className="text-sm text-gray-600">{donation.activistEmail}</p>
                          <p className="text-sm text-gray-500">{donation.activistPhone}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(donation.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleContactDonor(donation.donorPhone)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Call Donor"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                        {donation.activistPhone && (
                          <button
                            onClick={() => handleContactActivist(donation.activistPhone)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Call Activist"
                          >
                            <User className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDonations.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default AllDonations;