import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Package,
  AlertCircle,
  Navigation,
  Phone,
  Heart,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

const BrowseFood: React.FC = () => {
  const { addRequest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  // Mock data - in real app, this would come from API
  const availableDonations = [
    {
      id: '1',
      title: 'Fresh Sandwiches & Salads',
      description: 'Assorted fresh sandwiches and garden salads from our lunch menu',
      donor: 'Green Bistro',
      donorPhone: '+1-555-0123',
      foodType: 'prepared',
      quantity: 15,
      unit: 'meals',
      distance: 1.2,
      pickupAddress: '123 Main St, Downtown',
      pickupTime: { start: '17:00', end: '19:00' },
      expiryDate: new Date('2025-01-16T20:00:00'),
      dietaryInfo: ['Vegetarian options', 'Gluten-free available'],
      images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'],
      rating: 4.8,
      createdAt: new Date('2025-01-16T10:00:00')
    },
    {
      id: '2',
      title: 'Bakery Items - End of Day',
      description: 'Fresh bread, pastries, and baked goods from today\'s production',
      donor: 'Sunshine Bakery',
      donorPhone: '+1-555-0456',
      foodType: 'bakery',
      quantity: 25,
      unit: 'items',
      distance: 0.8,
      pickupAddress: '456 Baker St, Central',
      pickupTime: { start: '18:00', end: '20:00' },
      expiryDate: new Date('2025-01-17T08:00:00'),
      dietaryInfo: ['Contains gluten', 'Some vegan options'],
      images: ['https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400'],
      rating: 4.9,
      createdAt: new Date('2025-01-16T08:00:00')
    },
    {
      id: '3',
      title: 'Fresh Vegetables & Fruits',
      description: 'Assorted vegetables and fruits - slightly imperfect but fresh',
      donor: 'Metro Grocery',
      donorPhone: '+1-555-0789',
      foodType: 'fresh',
      quantity: 30,
      unit: 'kg',
      distance: 2.1,
      pickupAddress: '789 Market St, Westside',
      pickupTime: { start: '16:00', end: '18:00' },
      expiryDate: new Date('2025-01-17T12:00:00'),
      dietaryInfo: ['Organic', 'Vegan'],
      images: ['https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'],
      rating: 4.7,
      createdAt: new Date('2025-01-16T12:00:00')
    },
    {
      id: '4',
      title: 'Prepared Indian Meals',
      description: 'Vegetarian curry, rice, and naan bread - freshly prepared',
      donor: 'Spice Garden',
      donorPhone: '+1-555-0321',
      foodType: 'prepared',
      quantity: 20,
      unit: 'meals',
      distance: 1.5,
      pickupAddress: '321 Spice Ave, Eastside',
      pickupTime: { start: '19:00', end: '21:00' },
      expiryDate: new Date('2025-01-16T22:00:00'),
      dietaryInfo: ['Vegetarian', 'Dairy-free options', 'Halal'],
      images: ['https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400'],
      rating: 4.6,
      createdAt: new Date('2025-01-16T16:00:00')
    }
  ];

  const getUrgencyColor = (expiryDate: Date) => {
    const now = new Date();
    const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilExpiry < 0) return 'text-red-600';
    if (hoursUntilExpiry < 3) return 'text-red-600';
    if (hoursUntilExpiry < 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredDonations = availableDonations
    .filter(donation => {
      const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donation.donor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFoodType = foodTypeFilter === 'all' || donation.foodType === foodTypeFilter;
      const matchesDistance = distanceFilter === 'all' || 
                             (distanceFilter === 'near' && donation.distance <= 1) ||
                             (distanceFilter === 'medium' && donation.distance <= 3) ||
                             (distanceFilter === 'far' && donation.distance > 3);
      return matchesSearch && matchesFoodType && matchesDistance;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance': return a.distance - b.distance;
        case 'expiry': return a.expiryDate.getTime() - b.expiryDate.getTime();
        case 'quantity': return b.quantity - a.quantity;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const handleRequestPickup = (donationId: string) => {
    const donation = availableDonations.find(d => d.id === donationId);
    if (donation) {
      addRequest({
        donationId: donationId,
        title: donation.title,
        donor: donation.donor,
        donorPhone: donation.donorPhone,
        donorEmail: donation.donorEmail || `${donation.donor.toLowerCase().replace(' ', '')}@email.com`,
        quantity: `${donation.quantity} ${donation.unit}`,
        pickupTime: new Date(`2025-01-16T${donation.pickupTime.start}:00`),
        pickupAddress: donation.pickupAddress,
        notes: donation.description,
        estimatedBeneficiaries: donation.quantity
      });
      alert(`Pickup request sent for "${donation.title}"! Check "My Requests" to track status.`);
    }
  };

  const handleGetDirections = (address: string) => {
    // In real app, this would open maps with directions
    alert(`Getting directions to: ${address}`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Available Food</h1>
        <p className="text-gray-600 mt-2">
          Discover food donations near you and help reduce waste in your community
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search food donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
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

            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Distances</option>
              <option value="near">Within 1km</option>
              <option value="medium">Within 3km</option>
              <option value="far">Beyond 3km</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="distance">Sort by Distance</option>
              <option value="expiry">Sort by Expiry</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found {filteredDonations.length} available donation{filteredDonations.length !== 1 ? 's' : ''} near you
        </p>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.map((donation) => (
          <div key={donation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative h-48">
              <img
                src={donation.images[0]}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{donation.distance}km away</span>
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{donation.rating}</span>
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{donation.title}</h3>
                <button
                  onClick={() => handleCall(donation.donorPhone)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">by {donation.donor}</p>
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

              {/* Dietary Info */}
              <div className="flex flex-wrap gap-1 mb-4">
                {donation.dietaryInfo.slice(0, 2).map((info, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {info}
                  </span>
                ))}
                {donation.dietaryInfo.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{donation.dietaryInfo.length - 2} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleRequestPickup(donation.id)}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-sm font-medium"
                >
                  Request Pickup
                </button>
                <button 
                  onClick={() => handleGetDirections(donation.pickupAddress)}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600">
            {searchTerm || foodTypeFilter !== 'all' || distanceFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Check back later for new donations'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseFood;