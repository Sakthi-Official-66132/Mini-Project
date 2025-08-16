import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  Leaf,
  Calendar,
  Download,
  Filter,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const ImpactReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const monthlyData = [
    { name: 'Jan', pickups: 12, meals: 145, people: 89, waste: 67 },
    { name: 'Feb', pickups: 18, meals: 198, people: 124, waste: 89 },
    { name: 'Mar', pickups: 15, meals: 167, people: 98, waste: 78 },
    { name: 'Apr', pickups: 22, meals: 234, people: 156, waste: 102 },
    { name: 'May', pickups: 28, meals: 289, people: 187, waste: 134 },
    { name: 'Jun', pickups: 24, meals: 267, people: 178, waste: 123 }
  ];

  const weeklyData = [
    { name: 'Week 1', pickups: 6, meals: 67, people: 45 },
    { name: 'Week 2', pickups: 8, meals: 89, people: 58 },
    { name: 'Week 3', pickups: 5, meals: 56, people: 34 },
    { name: 'Week 4', pickups: 9, meals: 98, people: 67 }
  ];

  const foodTypeData = [
    { name: 'Prepared Meals', value: 45, color: '#3B82F6' },
    { name: 'Bakery Items', value: 25, color: '#10B981' },
    { name: 'Fresh Produce', value: 20, color: '#F59E0B' },
    { name: 'Packaged Foods', value: 10, color: '#8B5CF6' }
  ];

  const impactStats = [
    {
      label: 'Total Pickups',
      value: '119',
      change: '+23%',
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Meals Rescued',
      value: '1,300',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'People Fed',
      value: '832',
      change: '+31%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Waste Reduced',
      value: '593kg',
      change: '+15%',
      trend: 'up',
      icon: Leaf,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const topDonors = [
    { name: 'Green Bistro', pickups: 23, meals: 287, rating: 4.9 },
    { name: 'Sunshine Bakery', pickups: 18, meals: 234, rating: 4.8 },
    { name: 'Metro Grocery', pickups: 15, meals: 198, rating: 4.7 },
    { name: 'Spice Garden', pickups: 12, meals: 156, rating: 4.6 }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'pickup_completed',
      message: 'Picked up 15 meals from Green Bistro',
      timestamp: '2 hours ago',
      impact: '15 people fed',
      location: 'Downtown'
    },
    {
      id: '2',
      type: 'distribution',
      message: 'Distributed food to 25 families',
      timestamp: '5 hours ago',
      impact: '78 people helped',
      location: 'Community Center'
    },
    {
      id: '3',
      type: 'pickup_completed',
      message: 'Collected bakery items from Sunshine Bakery',
      timestamp: '1 day ago',
      impact: '20 items rescued',
      location: 'Central District'
    },
    {
      id: '4',
      type: 'milestone',
      message: 'Reached 1000+ meals rescued milestone!',
      timestamp: '2 days ago',
      impact: 'Major achievement',
      location: 'Platform-wide'
    }
  ];

  const environmentalImpact = {
    co2Saved: 1247, // kg
    waterSaved: 3456, // liters
    energySaved: 892, // kWh
    landfillDiverted: 593 // kg
  };

  const handleDownloadReport = () => {
    // In real app, this would generate and download a PDF report
    alert('Downloading detailed impact report...');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'pickup_completed': return Package;
      case 'distribution': return Users;
      case 'milestone': return Award;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'pickup_completed': return 'text-blue-600 bg-blue-100';
      case 'distribution': return 'text-green-600 bg-green-100';
      case 'milestone': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Impact Reports</h1>
            <p className="text-gray-600 mt-2">
              Detailed analysis of your community impact and food rescue activities
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Report Type:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="overview">Overview</option>
              <option value="detailed">Detailed Analysis</option>
              <option value="environmental">Environmental Impact</option>
              <option value="community">Community Impact</option>
            </select>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {impactStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  <span className="text-xs text-gray-500 ml-1">vs last period</span>
                </div>
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
        {/* Activity Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="meals" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Meals Rescued" />
              <Area type="monotone" dataKey="people" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="People Fed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Food Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={foodTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {foodTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Partner Donors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Partner Donors</h3>
          <div className="space-y-4">
            {topDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{donor.name}</p>
                    <p className="text-sm text-gray-600">{donor.pickups} pickups • {donor.meals} meals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{donor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      <p className="text-xs text-green-600 font-medium">{activity.impact}</p>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{activity.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center space-x-3 mb-6">
          <Leaf className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Environmental Impact</h2>
            <p className="text-gray-600">Your contribution to environmental sustainability</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{environmentalImpact.co2Saved}kg</div>
            <div className="text-sm text-gray-600">CO₂ emissions prevented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{environmentalImpact.waterSaved}L</div>
            <div className="text-sm text-gray-600">Water saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{environmentalImpact.energySaved}kWh</div>
            <div className="text-sm text-gray-600">Energy saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{environmentalImpact.landfillDiverted}kg</div>
            <div className="text-sm text-gray-600">Diverted from landfill</div>
          </div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pickups" fill="#3B82F6" name="Pickups" />
            <Bar dataKey="meals" fill="#10B981" name="Meals" />
            <Bar dataKey="people" fill="#8B5CF6" name="People Fed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ImpactReports;