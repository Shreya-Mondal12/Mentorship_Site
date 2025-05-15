
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileCard from '@/components/profile/ProfileCard';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Profile = () => {
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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Preview */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold mb-4">Profile Preview</h2>
              <ProfileCard user={user} />
              
              <div className="mt-6">
                <Button variant="outline" onClick={() => navigate('/discovery')}>
                  Find Matches
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
