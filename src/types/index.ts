export interface User {
  id: string;
  email: string;
  name: string;
  role: 'restaurant' | 'donor' | 'activist' | 'admin';
  phone?: string;
  address?: string;
  restaurantName?: string;
  organizationName?: string;
  createdAt: Date;
  joinDate: Date;
  lastActive: Date;
  isActive: boolean;
}

export interface FoodDonation {
  id: string;
  donorId: string;
  donorName: string;
  title: string;
  description: string;
  foodType: 'prepared' | 'packaged' | 'fresh' | 'other';
  quantity: number;
  unit: string;
  expiryDate: Date;
  pickupAddress: string;
  pickupTime: {
    start: string;
    end: string;
  };
  status: 'available' | 'requested' | 'picked-up' | 'expired';
  images?: string[];
  dietaryInfo?: string[];
  createdAt: Date;
  requestedBy?: string;
  activistName?: string;
  activistPhone?: string;
}

export interface DashboardStats {
  totalDonations: number;
  activeDonations: number;
  completedPickups: number;
  totalBeneficiaries: number;
  wasteReduced: number; // in kg
}