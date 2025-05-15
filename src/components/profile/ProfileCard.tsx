
import React from 'react';
import { User } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface ProfileCardProps {
  user: User;
  isSendingRequest?: boolean;
  onConnect?: () => void;
  connectionStatus?: 'none' | 'pending' | 'connected';
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isSendingRequest = false,
  onConnect,
  connectionStatus = 'none'
}) => {
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;
  
  // Generate a random but consistent color for avatar placeholder
  const getColorFromString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
  };
  
  const avatarColor = getColorFromString(user.name);
  const initials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  const renderConnectionButton = () => {
    if (isCurrentUser) return null;
    
    switch (connectionStatus) {
      case 'connected':
        return (
          <Button disabled className="w-full sm:w-auto">
            Connected
          </Button>
        );
      case 'pending':
        return (
          <Button disabled variant="outline" className="w-full sm:w-auto">
            Request Pending
          </Button>
        );
      default:
        return (
          <Button 
            onClick={onConnect} 
            disabled={isSendingRequest}
            className="w-full sm:w-auto"
          >
            {isSendingRequest ? 'Sending...' : 'Connect'}
          </Button>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: avatarColor }}
          >
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              initials
            )}
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">
                  {user.title}
                  {user.company && ` at ${user.company}`}
                </p>
              </div>
              
              <div className="sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'mentor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'mentor' ? 'Mentor' : 'Mentee'}
                </span>
                
                {user.location && (
                  <p className="text-gray-500 text-sm mt-1">{user.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio */}
        {user.bio && (
          <div className="mt-4">
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}
        
        {/* Skills & Interests */}
        <div className="mt-4 space-y-3">
          {user.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="bg-primary-light text-primary text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {user.interests.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Interested In</h4>
              <div className="flex flex-wrap gap-2">
                {user.interests.map(interest => (
                  <span 
                    key={interest} 
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Connect Button */}
        <div className="mt-6">
          {renderConnectionButton()}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
