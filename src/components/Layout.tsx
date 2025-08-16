import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  Plus,
  Search,
  BarChart3,
  User,
  Package,
  ChevronDown
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return <Outlet />;

  const getSidebarItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' }
    ];

    switch (user.role) {
      case 'restaurant':
      case 'donor':
        return [
          ...baseItems,
          { icon: Plus, label: 'Post Donation', path: '/post-donation' },
          { icon: Package, label: 'My Donations', path: '/my-donations' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' }
        ];
      case 'activist':
        return [
          ...baseItems,
          { icon: Search, label: 'Browse Food', path: '/browse-food' },
          { icon: Package, label: 'My Requests', path: '/my-requests' },
          { icon: Users, label: 'Beneficiaries', path: '/beneficiaries' },
          { icon: BarChart3, label: 'Impact Reports', path: '/impact-reports' }
        ];
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'User Management', path: '/users' },
          { icon: Package, label: 'All Donations', path: '/all-donations' },
          { icon: BarChart3, label: 'System Analytics', path: '/system-analytics' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      default:
        return baseItems;
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-xl font-bold text-gray-800">GIVE2GROW</h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {user.role === 'restaurant' ? 'Restaurant Portal' :
             user.role === 'donor' ? 'Donor Portal' :
             user.role === 'activist' ? 'Activist Portal' : 'Admin Portal'}
          </p>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;