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
  Globe,
  Clock,
  Award,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const SystemAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const platformStats = [
    {
      label: 'Total Platform Users',
      value: '2,847',
      change: '+23% this month',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Total Donations',
      value: '1,456',
      change: '+18% this month',
      icon: Package,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Success Rate',
      value: '89.2%',
      change: '+2.1% improvement',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Environmental Impact',
      value: '3.2T CO₂',
      change: 'Emissions prevented',
      icon: Leaf,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const monthlyGrowthData = [
    { name: 'Jan', users: 1245, donations: 234, pickups: 198, revenue: 0 },
    { name: 'Feb', users: 1456, donations: 289, pickups: 256, revenue: 0 },
    { name: 'Mar', users: 1678, donations: 345, pickups: 312, revenue: 0 },
    { name: 'Apr', users: 1923, donations: 412, pickups: 378, revenue: 0 },
    { name: 'May', users: 2234, donations: 489, pickups: 445, revenue: 0 },
    { name: 'Jun', users: 2567, donations: 567, pickups: 523, revenue: 0 },
    { name: 'Jul', users: 2847, donations: 634, pickups: 589, revenue: 0 }
  ];

  const userTypeData = [
    { name: 'Restaurants', value: 45, color: '#3B82F6' },
    { name: 'Activists', value: 35, color: '#10B981' },
    { name: 'Individual Donors', value: 18, color: '#F59E0B' },
    { name: 'Admins', value: 2, color: '#8B5CF6' }
  ];

  const regionData = [
    { name: 'North America', users: 1234, donations: 456, success: 91 },
    { name: 'Europe', users: 987, donations: 345, success: 88 },
    { name: 'Asia Pacific', users: 456, donations: 234, success: 85 },
    { name: 'Latin America', users: 170, donations: 89, success: 87 }
  ];

  const systemHealth = [
    {
      metric: 'Server Uptime',
      value: '99.9%',
      status: 'excellent',
      trend: 'stable'
    },
    {
      metric: 'Response Time',
      value: '245ms',
      status: 'good',
      trend: 'improving'
    },
    {
      metric: 'Error Rate',
      value: '0.02%',
      status: 'excellent',
      trend: 'stable'
    },
    {
      metric: 'Database Performance',
      value: '98.5%',
      status: 'good',
      trend: 'stable'
    }
  ];

  const topPerformers = [
    { name: 'Green Bistro Network', type: 'Restaurant Chain', donations: 234, impact: 'High' },
    { name: 'Community Food Alliance', type: 'NGO Network', pickups: 189, impact: 'High' },
    { name: 'Metro Grocery Chain', type: 'Retail Partner', donations: 156, impact: 'Medium' },
    { name: 'Local Food Heroes', type: 'Activist Group', pickups: 145, impact: 'High' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingUp className="h-4 w-4 text-red-600 transform rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleDownloadReport = () => {
    alert('Downloading comprehensive system analytics report...');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
            <p className="text-gray-600 mt-2">
              Comprehensive platform performance and usage analytics
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
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Report Type:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="overview">Platform Overview</option>
              <option value="users">User Analytics</option>
              <option value="donations">Donation Analytics</option>
              <option value="performance">System Performance</option>
              <option value="regional">Regional Analysis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platformStats.map((stat, index) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Platform Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Users" />
              <Area type="monotone" dataKey="donations" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Donations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {userTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemHealth.map((metric, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
          <div className="space-y-4">
            {regionData.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{region.name}</p>
                    <p className="text-sm text-gray-600">{region.users} users • {region.donations} donations</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{region.success}%</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Partners</h3>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {performer.donations ? `${performer.donations} donations` : `${performer.pickups} pickups`}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    performer.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {performer.impact} Impact
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Activity Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="donations" stroke="#3B82F6" name="Donations Posted" strokeWidth={2} />
            <Line type="monotone" dataKey="pickups" stroke="#10B981" name="Successful Pickups" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SystemAnalytics;