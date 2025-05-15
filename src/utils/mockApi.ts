
import { User, ConnectionRequest, mockUsers, mockConnectionRequests } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth API
  login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
    await delay(800);
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      // In a real app, we would validate the password
      return { user, token: 'mock-jwt-token' };
    }
    return null;
  },
  
  register: async (name: string, email: string, password: string, role: 'mentor' | 'mentee'): Promise<{ user: User; token: string } | null> => {
    await delay(1000);
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return null;
    }
    
    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role,
      skills: [],
      interests: [],
      bio: '',
    };
    
    // In a real app, we would add this user to the database
    mockUsers.push(newUser);
    
    return { user: newUser, token: 'mock-jwt-token' };
  },
  
  // User API
  getCurrentUser: async (): Promise<User | null> => {
    await delay(500);
    // In a real app, we would fetch the user based on the JWT token
    return mockUsers[0];
  },
  
  updateProfile: async (userId: string, profileData: Partial<User>): Promise<User | null> => {
    await delay(800);
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...profileData };
      return mockUsers[userIndex];
    }
    return null;
  },
  
  // Discovery API
  getUsers: async (filters?: { role?: 'mentor' | 'mentee'; skills?: string[]; interests?: string[] }): Promise<User[]> => {
    await delay(800);
    let filteredUsers = [...mockUsers];
    
    if (filters) {
      if (filters.role) {
        filteredUsers = filteredUsers.filter(u => u.role === filters.role);
      }
      
      if (filters.skills && filters.skills.length > 0) {
        filteredUsers = filteredUsers.filter(u => 
          filters.skills!.some(skill => u.skills.includes(skill))
        );
      }
      
      if (filters.interests && filters.interests.length > 0) {
        filteredUsers = filteredUsers.filter(u => 
          filters.interests!.some(interest => u.interests.includes(interest))
        );
      }
    }
    
    return filteredUsers;
  },
  
  // Connection Requests API
  getConnectionRequests: async (userId: string): Promise<ConnectionRequest[]> => {
    await delay(600);
    return mockConnectionRequests.filter(
      request => request.senderId === userId || request.receiverId === userId
    );
  },
  
  sendConnectionRequest: async (senderId: string, receiverId: string, message: string): Promise<ConnectionRequest | null> => {
    await delay(1000);
    
    // Check if a request already exists
    const existingRequest = mockConnectionRequests.find(
      req => req.senderId === senderId && req.receiverId === receiverId
    );
    
    if (existingRequest) {
      return null;
    }
    
    const newRequest: ConnectionRequest = {
      id: `${mockConnectionRequests.length + 1}`,
      senderId,
      receiverId,
      status: 'pending',
      message,
      createdAt: new Date().toISOString(),
    };
    
    mockConnectionRequests.push(newRequest);
    return newRequest;
  },
  
  updateConnectionRequest: async (requestId: string, status: 'accepted' | 'declined'): Promise<ConnectionRequest | null> => {
    await delay(800);
    const requestIndex = mockConnectionRequests.findIndex(req => req.id === requestId);
    
    if (requestIndex !== -1) {
      mockConnectionRequests[requestIndex] = {
        ...mockConnectionRequests[requestIndex],
        status,
      };
      return mockConnectionRequests[requestIndex];
    }
    
    return null;
  },
  
  getUserById: async (userId: string): Promise<User | null> => {
    await delay(500);
    return mockUsers.find(user => user.id === userId) || null;
  },
};
