import React, { useState, useEffect } from 'react';
import { User } from '@/utils/mockData';
import { api } from '@/utils/mockApi';
import ProfileCard from '@/components/profile/ProfileCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { skillsList, interestsList } from '@/utils/mockData';
import { X, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DiscoveryPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState<Record<string, string>>({});
  const [sendingRequest, setSendingRequest] = useState<Record<string, boolean>>({});
  
  // Filter states
  const [roleFilter, setRoleFilter] = useState<'mentor' | 'mentee' | ''>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchUsersAndRequests = async () => {
      setIsLoading(true);
      try {
        if (!user) return;
        
        const [fetchedUsers, requests] = await Promise.all([
          api.getUsers(),
          api.getConnectionRequests(user.id)
        ]);
        
        // Remove current user from the list
        const filteredUsers = fetchedUsers.filter(u => u.id !== user.id);
        setUsers(filteredUsers);
        
        // Build a map of connection requests
        const requestMap: Record<string, string> = {};
        requests.forEach(req => {
          if (req.senderId === user.id) {
            requestMap[req.receiverId] = req.status;
          } else if (req.receiverId === user.id) {
            requestMap[req.senderId] = req.status;
          }
        });
        setConnectionRequests(requestMap);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsersAndRequests();
  }, [user]);
  
  useEffect(() => {
    // Apply filters
    let result = [...users];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(term) || 
        u.bio.toLowerCase().includes(term) || 
        (u.title && u.title.toLowerCase().includes(term)) || 
        (u.company && u.company.toLowerCase().includes(term))
      );
    }
    
    // Apply role filter
    if (roleFilter) {
      result = result.filter(u => u.role === roleFilter);
    }
    
    // Apply skills filter
    if (selectedSkills.length > 0) {
      result = result.filter(u => 
        selectedSkills.some(skill => u.skills.includes(skill))
      );
    }
    
    // Apply interests filter
    if (selectedInterests.length > 0) {
      result = result.filter(u => 
        selectedInterests.some(interest => u.interests.includes(interest))
      );
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, selectedSkills, selectedInterests]);
  
  const handleConnect = async (otherUser: User) => {
    if (!user) return;
    
    try {
      setSendingRequest({ ...sendingRequest, [otherUser.id]: true });
      
      const message = `Hi ${otherUser.name}, I'd like to connect with you on MentorMatch!`;
      const request = await api.sendConnectionRequest(user.id, otherUser.id, message);
      
      if (request) {
        setConnectionRequests({ ...connectionRequests, [otherUser.id]: 'pending' });
        toast({
          title: "Request Sent",
          description: `Connection request sent to ${otherUser.name}.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send connection request. You may have already sent a request to this user.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingRequest({ ...sendingRequest, [otherUser.id]: false });
    }
  };
  
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const clearFilters = () => {
    setRoleFilter('');
    setSelectedSkills([]);
    setSelectedInterests([]);
    setSearchTerm('');
  };
  
  const getConnectionStatus = (userId: string) => {
    const status = connectionRequests[userId];
    if (!status) return 'none';
    if (status === 'accepted') return 'connected';
    return 'pending';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Find Your Match</h1>
          <p className="text-gray-600">
            Connect with {user?.role === 'mentor' ? 'mentees' : 'mentors'} and expand your network
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </Button>
      </div>
      
      {/* Search and Filters */}
      <div className={`${showFilters ? 'block' : 'hidden'} bg-gray-50 rounded-lg p-4 border border-gray-200`}>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Search & Filters</h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search by name, bio, or title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field mb-4"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Role</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setRoleFilter('mentor')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    roleFilter === 'mentor'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mentors
                </button>
                <button
                  onClick={() => setRoleFilter('mentee')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    roleFilter === 'mentee'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mentees
                </button>
                {roleFilter && (
                  <button
                    onClick={() => setRoleFilter('')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skillsList.slice(0, 5).map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary-light text-primary'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
                {selectedSkills.length > 0 && (
                  <button
                    onClick={() => setSelectedSkills([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {interestsList.slice(0, 5).map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedInterests.includes(interest)
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
                {selectedInterests.length > 0 && (
                  <button
                    onClick={() => setSelectedInterests([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No users found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="text-primary hover:underline mt-2"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredUsers.map(user => (
            <ProfileCard
              key={user.id}
              user={user}
              onConnect={() => handleConnect(user)}
              isSendingRequest={sendingRequest[user.id]}
              connectionStatus={getConnectionStatus(user.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DiscoveryPage;
