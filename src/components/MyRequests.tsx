import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Package,
  Navigation,
  MessageCircle,
  Calendar,
  User
} from 'lucide-react';
import { format } from 'date-fns';

const MyRequests: React.FC = () => {
  const { getRequests, updateRequest, deleteRequest } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');

  // Get requests from global state
  const myRequests = getRequests().map(request => ({
    ...request,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredRequests = myRequests.filter(request => 
    statusFilter === 'all' || request.status === statusFilter
  );

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleMessage = (email: string) => {
    window.open(`mailto:${email}`);
  };

  const handleGetDirections = (address: string) => {
    // In real app, this would open maps with directions
    alert(`Getting directions to: ${address}`);
  };

  const handleCancelRequest = (requestId: string) => {
    if (confirm('Are you sure you want to cancel this request?')) {
      updateRequest(requestId, { status: 'cancelled', cancelReason: 'Cancelled by activist' });
      alert('Request cancelled successfully');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Food Requests</h1>
        <p className="text-gray-600 mt-2">
          Track and manage all your food pickup requests
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myRequests.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {myRequests.filter(r => r.status === 'confirmed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {myRequests.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">People Fed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {myRequests.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.estimatedBeneficiaries, 0)}
              </p>
            </div>
            <User className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={request.image}
                      alt={request.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                      <p className="text-sm text-gray-600">from {request.donor}</p>
                      <p className="text-sm text-gray-500">Requested on {format(request.requestDate, 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)} flex items-center space-x-1`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{request.status}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{request.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{format(request.pickupTime, 'MMM d, HH:mm')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{request.pickupAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{request.estimatedBeneficiaries} people</span>
                  </div>
                </div>

                {request.notes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {request.notes}
                    </p>
                  </div>
                )}

                {request.status === 'completed' && request.completedDate && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      <strong>Completed:</strong> {format(request.completedDate, 'MMM d, yyyy \'at\' HH:mm')}
                    </p>
                  </div>
                )}

                {request.status === 'cancelled' && request.cancelReason && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700">
                      <strong>Cancelled:</strong> {request.cancelReason}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCall(request.donorPhone)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Donor</span>
                  </button>
                  
                  <button
                    onClick={() => handleMessage(request.donorEmail)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Message</span>
                  </button>
                  
                  <button
                    onClick={() => handleGetDirections(request.pickupAddress)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Directions</span>
                  </button>

                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <span>Cancel Request</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">
            {statusFilter !== 'all' 
              ? 'Try changing the status filter'
              : 'Start by browsing available food donations'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default MyRequests;