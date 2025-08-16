import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

// Global state for managing donations, requests, and users
let globalDonations: any[] = [];
let globalRequests: any[] = [];
let globalUsers: any[] = [];
let globalBeneficiaries: any[] = [];

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  restaurantName?: string;
  organizationName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  addDonation: (donation: any) => void;
  getDonations: () => any[];
  updateDonation: (id: string, updates: any) => void;
  deleteDonation: (id: string) => void;
  addRequest: (request: any) => void;
  getRequests: () => any[];
  updateRequest: (id: string, updates: any) => void;
  deleteRequest: (id: string) => void;
  getUsers: () => any[];
  updateUser: (id: string, updates: any) => void;
  deleteUser: (id: string) => void;
  addBeneficiary: (beneficiary: any) => void;
  getBeneficiaries: () => any[];
  updateBeneficiary: (id: string, updates: any) => void;
  deleteBeneficiary: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'restaurant@demo.com',
    name: 'Green Bistro',
    role: 'restaurant',
    restaurantName: 'Green Bistro',
    address: '123 Main St, City',
    phone: '+1234567890',
    createdAt: new Date(),
    joinDate: new Date('2024-01-15'),
    lastActive: new Date(),
    isActive: true
  },
  {
    id: '2',
    email: 'activist@demo.com',
    name: 'Sarah Johnson',
    role: 'activist',
    organizationName: 'Community Food Network',
    address: '456 Oak Ave, City',
    phone: '+1987654321',
    createdAt: new Date(),
    joinDate: new Date('2024-02-20'),
    lastActive: new Date(),
    isActive: true
  },
  {
    id: '3',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    joinDate: new Date('2024-01-01'),
    lastActive: new Date(),
    isActive: true
  },
  {
    id: '4',
    email: 'donor@demo.com',
    name: 'John Smith',
    role: 'donor',
    address: '789 Pine St, City',
    phone: '+1122334455',
    createdAt: new Date(),
    joinDate: new Date('2024-03-10'),
    lastActive: new Date(),
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize global data
  useEffect(() => {
    if (globalDonations.length === 0) {
      globalDonations = [
        {
          id: '1',
          title: 'Fresh Sandwiches & Salads',
          description: 'Assorted fresh sandwiches and garden salads from our lunch menu',
          foodType: 'prepared',
          quantity: 15,
          unit: 'meals',
          status: 'available',
          expiryDate: new Date('2025-01-16T20:00:00'),
          pickupAddress: '123 Main St, Downtown',
          pickupTime: { start: '17:00', end: '19:00' },
          images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'],
          createdAt: new Date('2025-01-16T10:00:00'),
          donorId: '1',
          donorName: 'Green Bistro'
        }
      ];
    }
    
    if (globalUsers.length === 0) {
      globalUsers = [...mockUsers];
    }
  }, []);

  useEffect(() => {
    // Simulate checking for existing auth
    const storedUser = localStorage.getItem('foodbridge_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('foodbridge_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role as 'restaurant' | 'donor' | 'activist' | 'admin',
      phone: data.phone,
      address: data.address,
      restaurantName: data.restaurantName,
      organizationName: data.organizationName,
      createdAt: new Date(),
      joinDate: new Date(),
      lastActive: new Date(),
      isActive: true
    };
    
    // Add to mock users (in real app, this would be saved to backend)
    mockUsers.push(newUser);
    
    setUser(newUser);
    localStorage.setItem('foodbridge_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodbridge_user');
  };

  // Donation management functions
  const addDonation = (donation: any) => {
    const newDonation = {
      ...donation,
      id: Date.now().toString(),
      createdAt: new Date(),
      donorId: user?.id,
      donorName: user?.name || user?.restaurantName,
      status: 'available'
    };
    globalDonations.push(newDonation);
  };

  const getDonations = () => {
    return globalDonations.filter(d => d.donorId === user?.id);
  };

  const updateDonation = (id: string, updates: any) => {
    const index = globalDonations.findIndex(d => d.id === id);
    if (index !== -1) {
      globalDonations[index] = { ...globalDonations[index], ...updates };
    }
  };

  const deleteDonation = (id: string) => {
    globalDonations = globalDonations.filter(d => d.id !== id);
  };

  // Request management functions
  const addRequest = (request: any) => {
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      requestDate: new Date(),
      activistId: user?.id,
      activistName: user?.name,
      status: 'pending'
    };
    globalRequests.push(newRequest);
    
    // Update the donation status
    updateDonation(request.donationId, { 
      status: 'requested', 
      requestedBy: user?.id,
      activistName: user?.name 
    });
  };

  const getRequests = () => {
    return globalRequests.filter(r => r.activistId === user?.id);
  };

  const updateRequest = (id: string, updates: any) => {
    const index = globalRequests.findIndex(r => r.id === id);
    if (index !== -1) {
      globalRequests[index] = { ...globalRequests[index], ...updates };
    }
  };

  const deleteRequest = (id: string) => {
    globalRequests = globalRequests.filter(r => r.id !== id);
  };

  // User management functions
  const getUsers = () => {
    return globalUsers;
  };

  const updateUser = (id: string, updates: any) => {
    const index = globalUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      globalUsers[index] = { ...globalUsers[index], ...updates };
    }
  };

  const deleteUser = (id: string) => {
    globalUsers = globalUsers.filter(u => u.id !== id);
  };

  // Beneficiary management functions
  const addBeneficiary = (beneficiary: any) => {
    const newBeneficiary = {
      ...beneficiary,
      id: Date.now().toString(),
      addedDate: new Date(),
      lastServed: new Date(),
      totalMealsReceived: 0,
      status: 'active'
    };
    globalBeneficiaries.push(newBeneficiary);
  };

  const getBeneficiaries = () => {
    return globalBeneficiaries;
  };

  const updateBeneficiary = (id: string, updates: any) => {
    const index = globalBeneficiaries.findIndex(b => b.id === id);
    if (index !== -1) {
      globalBeneficiaries[index] = { ...globalBeneficiaries[index], ...updates };
    }
  };

  const deleteBeneficiary = (id: string) => {
    globalBeneficiaries = globalBeneficiaries.filter(b => b.id !== id);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      addDonation,
      getDonations,
      updateDonation,
      deleteDonation,
      addRequest,
      getRequests,
      updateRequest,
      deleteRequest,
      getUsers,
      updateUser,
      deleteUser,
      addBeneficiary,
      getBeneficiaries,
      updateBeneficiary,
      deleteBeneficiary
    }}>
      {children}
    </AuthContext.Provider>
  );
};