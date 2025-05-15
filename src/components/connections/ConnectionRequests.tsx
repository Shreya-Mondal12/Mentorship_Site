import React, { useState, useEffect } from 'react';
import { api } from '@/utils/mockApi';
import { ConnectionRequest, User } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ConnectionRequests: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const fetchedRequests = await api.getConnectionRequests(user.id);
        setRequests(fetchedRequests);
        
        // Fetch user details for each request
        const userIds = new Set<string>();
        fetchedRequests.forEach(req => {
          userIds.add(req.senderId);
          userIds.add(req.receiverId);
        });
        
        const userDetails: Record<string, User> = {};
        await Promise.all(
          Array.from(userIds).map(async (id) => {
            if (id !== user.id) {
              const userData = await api.getUserById(id);
              if (userData) {
                userDetails[id] = userData;
              }
            }
          })
        );
        
        setUsers(userDetails);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast({
          title: "Error",
          description: "Failed to load connection requests.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [user]);
  
  const handleUpdateStatus = async (requestId: string, status: 'accepted' | 'declined') => {
    setProcessing({ ...processing, [requestId]: true });
    
    try {
      const updatedRequest = await api.updateConnectionRequest(requestId, status);
      
      if (updatedRequest) {
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req.id === requestId ? { ...req, status } : req
          )
        );
        
        toast({
          title: status === 'accepted' ? 'Request Accepted' : 'Request Declined',
          description: status === 'accepted' 
            ? 'You are now connected.' 
            : 'The connection request has been declined.',
        });
      }
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: "Failed to update connection request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing({ ...processing, [requestId]: false });
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(name => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  const renderRequestsByType = (type: 'incoming' | 'outgoing') => {
    const filteredRequests = requests.filter(req => 
      type === 'incoming' 
        ? req.receiverId === user?.id 
        : req.senderId === user?.id
    );
    
    if (filteredRequests.length === 0) {
      return (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">
            No {type === 'incoming' ? 'incoming' : 'outgoing'} requests.
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {filteredRequests.map(request => {
          const otherUserId = type === 'incoming' ? request.senderId : request.receiverId;
          const otherUser = users[otherUserId];
          
          if (!otherUser) return null;
          
          return (
            <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    {otherUser.avatar ? (
                      <img 
                        src={otherUser.avatar} 
                        alt={otherUser.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      getInitials(otherUser.name)
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-medium">{otherUser.name}</h4>
                        <p className="text-sm text-gray-600">
                          {otherUser.title}
                          {otherUser.company && ` at ${otherUser.company}`}
                        </p>
                      </div>
                      
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status === 'pending' ? 'Pending' : request.status === 'accepted' ? 'Accepted' : 'Declined'}
                      </span>
                    </div>
                    
                    {request.message && (
                      <p className="text-sm text-gray-700 mt-2 mb-3">
                        {request.message}
                      </p>
                    )}
                    
                    {type === 'incoming' && request.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(request.id, 'accepted')}
                          disabled={processing[request.id]}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(request.id, 'declined')}
                          disabled={processing[request.id]}
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  if (isLoading) {
    return <div className="text-center py-8">Loading connections...</div>;
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Incoming Requests</h2>
        {renderRequestsByType('incoming')}
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Outgoing Requests</h2>
        {renderRequestsByType('outgoing')}
      </div>
    </div>
  );
};

export default ConnectionRequests;
