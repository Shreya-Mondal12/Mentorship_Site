
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import DiscoveryPage from '@/components/discovery/DiscoveryPage';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Discovery = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to home if not logged in
  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/?auth=login');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <DiscoveryPage />
      </div>
    </div>
  );
};

export default Discovery;
