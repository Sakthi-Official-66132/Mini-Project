import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Edit,
  Trash2,
  UserCheck,
  Heart,
  Package
} from 'lucide-react';
import { format } from 'date-fns';

const Beneficiaries: React.FC = () => {
  const { getBeneficiaries, addBeneficiary, updateBeneficiary, deleteBeneficiary } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    familySize: '',
    specialNeeds: '',
    notes: ''
  });

  // Get beneficiaries from global state
  const beneficiaries = getBeneficiaries();

  const stats = [
    {
      label: 'Total Beneficiaries',
      value: beneficiaries.length.toString(),
      change: '+3 this month',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Recipients',
      value: beneficiaries.filter(b => b.status === 'active').length.toString(),
      change: 'Currently served',
      icon: UserCheck,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Total People Served',
      value: beneficiaries.reduce((sum, b) => sum + b.familySize, 0).toString(),
      change: 'Family members',
      icon: Heart,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Meals Distributed',
      value: beneficiaries.reduce((sum, b) => sum + b.totalMealsReceived, 0).toString(),
      change: 'All time',
      icon: Package,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBeneficiary(formData);
    setShowAddForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      familySize: '',
      specialNeeds: '',
      notes: ''
    });
    alert('Beneficiary added successfully!');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`);
  };

  const handleEdit = (id: string) => {
    const beneficiary = beneficiaries.find(b => b.id === id);
    if (beneficiary) {
      alert(`Edit functionality for: ${beneficiary.name}\n(This would open an edit form)`);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this beneficiary?')) {
      deleteBeneficiary(id);
      alert('Beneficiary removed successfully');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Beneficiaries</h1>
            <p className="text-gray-600 mt-2">
              Manage the people and families you serve in your community
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Add Beneficiary</span>
          </button>
        </div>
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

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search beneficiaries by name, email, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Add Beneficiary Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Beneficiary</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="familySize" className="block text-sm font-medium text-gray-700 mb-2">
                Family Size *
              </label>
              <input
                type="number"
                id="familySize"
                name="familySize"
                value={formData.familySize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="1"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700 mb-2">
                Special Dietary Needs
              </label>
              <input
                type="text"
                id="specialNeeds"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Vegetarian, Halal, No nuts, etc."
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any additional information about the beneficiary..."
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Add Beneficiary
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Beneficiaries List */}
      <div className="space-y-4">
        {filteredBeneficiaries.map((beneficiary) => (
          <div key={beneficiary.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{beneficiary.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    beneficiary.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {beneficiary.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Family of {beneficiary.familySize}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{beneficiary.totalMealsReceived} meals received</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last served: {format(beneficiary.lastServed, 'MMM d')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{beneficiary.address}</span>
                  </div>
                </div>

                {beneficiary.specialNeeds && (
                  <div className="mb-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Special Needs:</strong> {beneficiary.specialNeeds}
                    </p>
                  </div>
                )}

                {beneficiary.notes && (
                  <div className="mb-3 p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {beneficiary.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleCall(beneficiary.phone)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Call"
                >
                  <Phone className="h-4 w-4" />
                </button>
                {beneficiary.email && (
                  <button
                    onClick={() => handleEmail(beneficiary.email)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => handleEdit(beneficiary.id)}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(beneficiary.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBeneficiaries.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No beneficiaries found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Start by adding your first beneficiary'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Beneficiaries;