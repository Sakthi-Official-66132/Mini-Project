import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Leaf, Shield, ArrowRight, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                GIVE2GROW
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bridge the Gap Between
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Food Waste{' '}
              </span>
              and Hunger
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect restaurants and food donors with community activists to reduce food waste 
              and feed those in need. Together, we can create a sustainable food ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Start Helping Today</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-white transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              How FoodBridge Works
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform connects three key stakeholders in the fight against food waste
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">For Restaurants & Donors</h4>
              <p className="text-gray-600 leading-relaxed">
                Easily post surplus food, set pickup times, and track your positive impact. 
                Turn your waste into someone's meal while reducing disposal costs.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">For Activists</h4>
              <p className="text-gray-600 leading-relaxed">
                Browse available food donations, request pickups, and coordinate with your network 
                to ensure food reaches those who need it most.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Admin Oversight</h4>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive monitoring, user management, and analytics to ensure the platform 
                operates efficiently and creates maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h3 className="text-4xl font-bold mb-4">Making a Real Impact</h3>
            <p className="text-xl opacity-90">Together, we're building a more sustainable future</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-lg opacity-90">Meals Rescued</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg opacity-90">Partner Restaurants</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">80+</div>
              <div className="text-lg opacity-90">Active Activists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200kg</div>
              <div className="text-lg opacity-90">Waste Reduced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join our community and be part of the solution. Whether you're a restaurant, 
              individual donor, or community activist, your contribution matters.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Join GIVE2GROW Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold">GIVE2GROW</span>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2025 GIVE2GROW. Building bridges, reducing waste, feeding communities.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;