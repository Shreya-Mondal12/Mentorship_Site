
/**
 * Authentication module for MentorMatch
 * Manages user registration, login, and profile data
 */

const Auth = (() => {
  // Private variables
  let currentUser = null;
  
  // Load user from localStorage on initialization
  const init = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        currentUser = JSON.parse(savedUser);
        console.log('User loaded from local storage:', currentUser.name);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }
  };
  
  // Mock user database (in a real app, this would be on the server)
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // In a real app, this would be hashed
      role: "mentor",
      skills: ["JavaScript", "React", "Node.js"],
      interests: ["Web Development", "Teaching"],
      bio: "Senior developer with 10 years of experience, passionate about mentoring new developers.",
      location: "San Francisco, CA",
      dateJoined: "2023-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123",
      role: "mentee",
      skills: ["HTML", "CSS", "JavaScript"],
      interests: ["Web Design", "UX/UI", "Frontend Development"],
      bio: "Junior developer looking to improve my skills in frontend development.",
      location: "New York, NY",
      dateJoined: "2023-02-20"
    }
  ];
  
  // Private methods
  const findUserByEmail = (email) => {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  };
  
  const generateId = () => {
    return Math.max(...users.map(u => u.id), 0) + 1;
  };
  
  // Public methods
  return {
    init,
    
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise} - Resolves with user data or rejects with error
     */
    register: (userData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Validate input
          if (!userData.name || !userData.email || !userData.password || !userData.role) {
            return reject(new Error("All fields are required"));
          }
          
          if (!Utils.isValidEmail(userData.email)) {
            return reject(new Error("Invalid email format"));
          }
          
          if (userData.password.length < 6) {
            return reject(new Error("Password must be at least 6 characters"));
          }
          
          // Check if user already exists
          if (findUserByEmail(userData.email)) {
            return reject(new Error("Email already exists"));
          }
          
          // Create new user
          const newUser = {
            id: generateId(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // In a real app, this would be hashed
            role: userData.role,
            skills: [],
            interests: [],
            bio: "",
            location: "",
            dateJoined: new Date().toISOString().split('T')[0]
          };
          
          users.push(newUser);
          
          // Set current user and save to localStorage
          const userDataToStore = { ...newUser };
          delete userDataToStore.password;
          
          currentUser = userDataToStore;
          localStorage.setItem('user', JSON.stringify(userDataToStore));
          
          resolve(userDataToStore);
        }, 500); // Simulate network delay
      });
    },
    
    /**
     * Log in a user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} - Resolves with user data or rejects with error
     */
    login: (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Find user by email
          const user = findUserByEmail(email);
          
          if (!user || user.password !== password) {
            return reject(new Error("Invalid email or password"));
          }
          
          // Set current user and save to localStorage
          const userDataToStore = { ...user };
          delete userDataToStore.password;
          
          currentUser = userDataToStore;
          localStorage.setItem('user', JSON.stringify(userDataToStore));
          
          resolve(userDataToStore);
        }, 500); // Simulate network delay
      });
    },
    
    /**
     * Log out the current user
     */
    logout: () => {
      currentUser = null;
      localStorage.removeItem('user');
    },
    
    /**
     * Update user profile
     * @param {Object} userData - Updated user data
     * @returns {Promise} - Resolves with updated user data or rejects with error
     */
    updateProfile: (userData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!currentUser) {
            return reject(new Error("Not logged in"));
          }
          
          // Find user in the database
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          
          if (userIndex === -1) {
            return reject(new Error("User not found"));
          }
          
          // Update user data
          const updatedUser = {
            ...users[userIndex],
            ...userData
          };
          
          users[userIndex] = updatedUser;
          
          // Update current user and save to localStorage
          const userDataToStore = { ...updatedUser };
          delete userDataToStore.password;
          
          currentUser = userDataToStore;
          localStorage.setItem('user', JSON.stringify(userDataToStore));
          
          resolve(userDataToStore);
        }, 500); // Simulate network delay
      });
    },
    
    /**
     * Get the current user
     * @returns {Object|null} - Current user data or null if not logged in
     */
    getCurrentUser: () => {
      return currentUser;
    },
    
    /**
     * Get all users (for discovery)
     * @param {Object} filters - Optional filters
     * @returns {Promise} - Resolves with filtered users
     */
    getUsers: (filters = {}) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!currentUser) {
            return resolve([]);
          }
          
          let filteredUsers = users
            .filter(u => u.id !== currentUser.id) // Exclude current user
            .map(u => {
              const { password, ...userWithoutPassword } = u;
              return userWithoutPassword;
            });
          
          // Apply role filter
          if (filters.role) {
            filteredUsers = filteredUsers.filter(u => u.role === filters.role);
          }
          
          // Apply skills filter
          if (filters.skills && filters.skills.length > 0) {
            filteredUsers = filteredUsers.filter(u => 
              filters.skills.some(skill => u.skills.includes(skill))
            );
          }
          
          // Apply interests filter
          if (filters.interests && filters.interests.length > 0) {
            filteredUsers = filteredUsers.filter(u => 
              filters.interests.some(interest => u.interests.includes(interest))
            );
          }
          
          resolve(filteredUsers);
        }, 500); // Simulate network delay
      });
    },
    
    /**
     * Send a connection request to another user
     * @param {number} userId - ID of the user to connect with
     * @returns {Promise} - Resolves with success message or rejects with error
     */
    sendConnectionRequest: (userId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!currentUser) {
            return reject(new Error("Not logged in"));
          }
          
          // Check if user exists
          const targetUser = users.find(u => u.id === userId);
          if (!targetUser) {
            return reject(new Error("User not found"));
          }
          
          // In a real app, we would save the connection request to the database
          // For this demo, we'll just simulate success
          resolve({ success: true, message: "Connection request sent" });
        }, 500); // Simulate network delay
      });
    },
    
    /**
     * Get all pending connection requests for the current user
     * @returns {Promise} - Resolves with connection requests
     */
    getConnectionRequests: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!currentUser) {
            return reject(new Error("Not logged in"));
          }
          
          // In a real app, we would fetch actual connection requests from the database
          // For this demo, we'll create mock data
          const requests = [
            {
              id: 101,
              senderId: 2,
              receiverId: 1,
              senderName: "Jane Smith",
              status: "pending",
              createdAt: "2023-08-15"
            }
          ].filter(r => r.receiverId === currentUser.id);
          
          resolve(requests);
        }, 500); // Simulate network delay
      });
    },
    
    /**
     * Accept or reject a connection request
     * @param {number} requestId - ID of the connection request
     * @param {boolean} accept - Whether to accept the request
     * @returns {Promise} - Resolves with success message or rejects with error
     */
    respondToConnectionRequest: (requestId, accept) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // In a real app, we would update the connection request in the database
          // For this demo, we'll just simulate success
          const action = accept ? "accepted" : "declined";
          resolve({ success: true, message: `Connection request ${action}` });
        }, 500); // Simulate network delay
      });
    }
  };
})();
