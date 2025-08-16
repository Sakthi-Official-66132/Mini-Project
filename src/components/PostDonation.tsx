import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Upload, 
  MapPin, 
  Clock, 
  Package, 
  AlertCircle, 
  Plus,
  X,
  Camera,
  Save
} from 'lucide-react';

const PostDonation: React.FC = () => {
  const { user, addDonation } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    foodType: 'prepared',
    quantity: '',
    unit: 'meals',
    expiryDate: '',
    expiryTime: '',
    pickupAddress: '',
    pickupStartTime: '',
    pickupEndTime: '',
    dietaryInfo: [] as string[],
    specialInstructions: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const foodTypes = [
    { value: 'prepared', label: 'Prepared Meals' },
    { value: 'packaged', label: 'Packaged Foods' },
    { value: 'fresh', label: 'Fresh Produce' },
    { value: 'bakery', label: 'Bakery Items' },
    { value: 'other', label: 'Other' }
  ];

  const units = [
    { value: 'meals', label: 'Meals' },
    { value: 'portions', label: 'Portions' },
    { value: 'kg', label: 'Kilograms' },
    { value: 'items', label: 'Items' },
    { value: 'boxes', label: 'Boxes' }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
    'Halal', 'Kosher', 'Low-Sodium', 'Organic'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDietaryChange = (option: string) => {
    setFormData({
      ...formData,
      dietaryInfo: formData.dietaryInfo.includes(option)
        ? formData.dietaryInfo.filter(item => item !== option)
        : [...formData.dietaryInfo, option]
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload to a server/cloud storage
      // For demo, we'll use placeholder URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400`
      );
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add donation to global state
    const { pickupStartTime, pickupEndTime, expiryDate, expiryTime, ...restFormData } = formData;
    
    const donationData = {
      ...restFormData,
      images,
      pickupTime: {
        start: pickupStartTime,
        end: pickupEndTime
      },
      expiryDate: new Date(`${expiryDate}T${expiryTime}`)
    };
    
    addDonation(donationData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      foodType: 'prepared',
      quantity: '',
      unit: 'meals',
      expiryDate: '',
      expiryTime: '',
      pickupAddress: '',
      pickupStartTime: '',
      pickupEndTime: '',
      specialInstructions: ''
    });
    setImages([]);
    setIsSubmitting(false);

    alert('Donation posted successfully! You can view it in "My Donations".');
    navigate('/my-donations');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post New Donation</h1>
        <p className="text-gray-600 mt-2">
          Share your surplus food with the community and help reduce waste.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Donation Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Fresh Sandwiches & Salads"
                required
              />
            </div>

            <div>
              <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-2">
                Food Type *
              </label>
              <select
                id="foodType"
                name="foodType"
                value={formData.foodType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {foodTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <div className="flex-1">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="1"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  {units.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe the food items, preparation method, ingredients, etc."
                required
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Food Images</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> food images
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                </div>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Food ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pickup Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pickup Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="pickupAddress"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter pickup address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="pickupStartTime" className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Start Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  id="pickupStartTime"
                  name="pickupStartTime"
                  value={formData.pickupStartTime}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="pickupEndTime" className="block text-sm font-medium text-gray-700 mb-2">
                Pickup End Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  id="pickupEndTime"
                  name="pickupEndTime"
                  value={formData.pickupEndTime}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label htmlFor="expiryTime" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Time *
              </label>
              <input
                type="time"
                id="expiryTime"
                name="expiryTime"
                value={formData.expiryTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Dietary Information */}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Post Donation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostDonation;