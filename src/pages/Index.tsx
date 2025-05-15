
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthForm] = useState<'login' | 'register' | null>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authParam = searchParams.get('auth');
    
    if (authParam === 'login') {
      setShowAuthForm('login');
    } else if (authParam === 'register') {
      setShowAuthForm('register');
    } else {
      setShowAuthForm(null);
    }
  }, [location]);
  
  const closeAuthForm = () => {
    setShowAuthForm(null);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {showAuthForm ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <AuthForm initialMode={showAuthForm} onClose={closeAuthForm} />
        </div>
      ) : (
        <div className="flex-1">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white">
            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="max-w-lg">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Find Your Perfect Mentorship Match
                  </h1>
                  <p className="text-xl mb-8">
                    Connect with experienced mentors or eager mentees in your field. 
                    Share knowledge, grow together, and advance your career.
                  </p>
                  
                  {user ? (
                    <div className="space-x-4">
                      <Button
                        size="lg"
                        onClick={() => navigate('/discovery')}
                        className="bg-white text-primary hover:bg-gray-100"
                      >
                        Find Matches
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/profile')}
                        className="border-white text-white hover:bg-white/10"
                      >
                        View Profile
                      </Button>
                    </div>
                  ) : (
                    <div className="space-x-4">
                      <Button
                        size="lg"
                        onClick={() => navigate('/?auth=register')}
                        className="bg-white text-primary hover:bg-gray-100"
                      >
                        Get Started
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/?auth=login')}
                        className="border-white text-white hover:bg-white/10"
                      >
                        Log In
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&q=80&w=800"
                    alt="Mentorship" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your profile with your skills, interests, and what you're looking for in a mentorship relationship.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Your Match</h3>
                <p className="text-gray-600">
                  Browse through potential mentors or mentees, filter by skills, interests, or experience level to find your perfect match.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect & Grow</h3>
                <p className="text-gray-600">
                  Send connection requests, start conversations, and begin your mentorship journey to accelerate your personal and professional growth.
                </p>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 italic mb-4">
                    "I found an amazing mentor who helped me navigate my first year in tech. The guidance I received was invaluable for my career growth."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-sm text-gray-500">Junior Developer</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 italic mb-4">
                    "As a mentor, I've connected with passionate mentees who remind me why I love my field. It's been rewarding to give back and watch them grow."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Sarah Chen</p>
                      <p className="text-sm text-gray-500">Senior Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Mentorship Journey?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're looking to share your knowledge or seeking guidance, join our community today.
            </p>
            
            {user ? (
              <Button 
                size="lg" 
                onClick={() => navigate('/discovery')}
              >
                Find Your Match Now
              </Button>
            ) : (
              <Button 
                size="lg" 
                onClick={() => navigate('/?auth=register')}
              >
                Sign Up For Free
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">MentorMatch</h3>
              <p className="text-gray-400">Connecting mentors and mentees worldwide</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary">About</a>
              <a href="#" className="hover:text-primary">FAQ</a>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} MentorMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
