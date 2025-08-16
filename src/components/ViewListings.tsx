import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  MapPin, 
  Package,
  AlertCircle,
  CheckCircle,
  Users
} from 'lucide-react';
import { format } from 'date-fns';

const ViewListings: React.FC = () => {
  const { user, getDonations, updateDonation, deleteDonation } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Get donations from global state
  const donations = getDonations();

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

  const getUrgencyColor = (expiryDate: Date) => {
    const now = new Date();
    const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilExpiry < 0) return 'text-red-600';
    if (hoursUntilExpiry < 3) return 'text-red-600';
    if (hoursUntilExpiry < 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredDonations = donations
    .filter(donation => {
      const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donation.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest': return a.createdAt.getTime() - b.createdAt.getTime();
        case 'expiry': return a.expiryDate.getTime() - b.expiryDate.getTime();
        default: return 0;
      }
    });

  const handleView = (donationId: string) => {
    // In real app, this would open a detailed view modal
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      alert(`Viewing details for: ${donation.title}\nStatus: ${donation.status}\nQuantity: ${donation.quantity} ${donation.unit}`);
    }
  };

  const handleEdit = (donationId: string) => {
    // In real app, this would open edit form
    const donation = donations.find(d => d.id === donationId);
    if (donation && donation.status === 'available') {
      alert(`Edit functionality for: ${donation.title}\n(This would open an edit form)`);
    } else {
      alert('Only available donations can be edited');
    }
  };

  const handleDelete = (donationId: string) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      deleteDonation(donationId);
      alert('Donation deleted successfully');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all your food donations
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search donations..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="expiry">By Expiry Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.map((donation) => {
          const StatusIcon = getStatusIcon(donation.status);
          return (
            <div key={donation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={donation.images[0]}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)} flex items-center space-x-1`}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{donation.status.replace('-', ' ')}</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{donation.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{donation.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{donation.quantity} {donation.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Pickup: {donation.pickupTime.start} - {donation.pickupTime.end}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{donation.pickupAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className={`h-4 w-4 ${getUrgencyColor(donation.expiryDate)}`} />
                    <span className={getUrgencyColor(donation.expiryDate)}>
                      Expires: {format(donation.expiryDate, 'MMM d, HH:mm')}
                    </span>
                  </div>
                </div>

                {donation.activistName && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded">
                    <Users className="h-4 w-4" />
                    <span>Assigned to: {donation.activistName}</span>
                  </div>
                )}

                {/* Dietary Info */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(donation.dietaryInfo || []).slice(0, 2).map((info, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {info}
                    </span>
                  ))}
                  {(donation.dietaryInfo || []).length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{(donation.dietaryInfo || []).length - 2} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleView(donation.id)}
                    className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  {donation.status === 'available' && (
                    <>
                      <button 
                        onClick={() => handleEdit(donation.id)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(donation.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDonations.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start by posting your first donation'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewListings;