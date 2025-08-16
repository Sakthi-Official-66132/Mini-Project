import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  Package, 
  Users, 
  Leaf, 
  Calendar,
  MapPin,
  Clock,
  Award,
  Target,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  const { user } = useAuth();

  const monthlyData = [
    { name: 'Jan', donations: 12, pickups: 10, waste: 45 },
    { name: 'Feb', donations: 18, pickups: 16, waste: 67 },
    { name: 'Mar', donations: 15, pickups: 13, waste: 52 },
    { name: 'Apr', donations: 22, pickups: 20, waste: 78 },
    { name: 'May', donations: 28, pickups: 25, waste: 95 },
    { name: 'Jun', donations: 24, pickups: 22, waste: 89 }
  ];

  const foodTypeData = [
    { name: 'Prepared Meals', value: 45, color: '#3B82F6' },
    { name: 'Bakery Items', value: 25, color: '#10B981' },
    { name: 'Fresh Produce', value: 20, color: '#F59E0B' },
    { name: 'Packaged Foods', value: 10, color: '#8B5CF6' }
  ];

  const impactStats = [
    {
      label: 'Total Donations',
      value: '147',
      change: '+23%',
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'People Fed',
      value: '1,247',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Waste Reduced',
      value: '426kg',
      change: '+31%',
      trend: 'up',
      icon: Leaf,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Success Rate',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const topPartners = [
    { name: 'Community Kitchen', pickups: 23, rating: 4.9 },
    { name: 'Hope Foundation', pickups: 18, rating: 4.8 },
    { name: 'Local Food Bank', pickups: 15, rating: 4.7 },
    { name: 'Shelter Support', pickups: 12, rating: 4.6 }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'pickup_completed',
      message: 'Fresh sandwiches picked up by Community Kitchen',
      timestamp: '2 hours ago',
      impact: '15 meals rescued'
    },
    {
      id: '2',
      type: 'donation_posted',
      message: 'New bakery items donation posted',
      timestamp: '5 hours ago',
      impact: '20 items available'
    },
    {
      id: '3',
      type: 'pickup_requested',
      message: 'Hope Foundation requested vegetarian meals',
      timestamp: '1 day ago',
      impact: '12 meals requested'
    },
    {
      id: '4',
      type: 'milestone',
      message: 'Reached 1000+ people fed milestone!',
      timestamp: '2 days ago',
      impact: 'Major achievement'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Track your impact and donation performance over time
        </p>
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
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
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
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="donations" stroke="#3B82F6" name="Donations" strokeWidth={2} />
              <Line type="monotone" dataKey="pickups" stroke="#10B981" name="Pickups" strokeWidth={2} />
            </LineChart>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Partners */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Partner Organizations</h3>
          <div className="space-y-4">
            {topPartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{partner.name}</p>
                    <p className="text-sm text-gray-600">{partner.pickups} pickups completed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  <p className="text-xs text-green-600 font-medium">{activity.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center space-x-3 mb-6">
          <Leaf className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Environmental Impact</h2>
            <p className="text-gray-600">Your contribution to sustainability</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">426kg</div>
            <div className="text-sm text-gray-600">Food waste prevented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">People helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">892kg</div>
            <div className="text-sm text-gray-600">CO₂ emissions saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">147</div>
            <div className="text-sm text-gray-600">Donations completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;