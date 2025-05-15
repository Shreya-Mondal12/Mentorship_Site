
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'mentee';
  skills: string[];
  interests: string[];
  bio: string;
  avatar?: string;
  location?: string;
  title?: string;
  company?: string;
  yearsOfExperience?: number;
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jessica Chen',
    email: 'jessica.chen@example.com',
    role: 'mentor',
    skills: ['JavaScript', 'React', 'Node.js'],
    interests: ['Web Development', 'Open Source', 'Teaching'],
    bio: 'Senior Frontend Developer with 8 years of experience, passionate about mentoring new developers and contributing to open source projects.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'San Francisco, CA',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    yearsOfExperience: 8
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@example.com',
    role: 'mentor',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    interests: ['AI Research', 'Data Visualization', 'Startups'],
    bio: 'Data Scientist with a PhD in Computer Science, experienced in building machine learning models and mentoring junior data scientists.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    location: 'New York, NY',
    title: 'Lead Data Scientist',
    company: 'DataInsights',
    yearsOfExperience: 6
  },
  {
    id: '3',
    name: 'Sophia Patel',
    email: 'sophia.patel@example.com',
    role: 'mentee',
    skills: ['HTML', 'CSS', 'JavaScript'],
    interests: ['Frontend Development', 'UX/UI Design', 'Accessibility'],
    bio: 'Computer Science student looking to improve my frontend development skills and learn best practices from experienced developers.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    location: 'Chicago, IL',
    title: 'CS Student',
    company: 'University of Illinois'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'mentee',
    skills: ['Java', 'Android', 'Kotlin'],
    interests: ['Mobile Development', 'App Architecture', 'Kotlin Multiplatform'],
    bio: 'Self-taught Android developer seeking guidance on app architecture and best practices from experienced mentors.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    location: 'Seattle, WA',
    title: 'Junior Android Developer',
    company: 'MobileApps Co.'
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'mentor',
    skills: ['Product Management', 'UX Research', 'Agile'],
    interests: ['Product Strategy', 'User-Centered Design', 'Leadership'],
    bio: 'Product Manager with 10+ years of experience in tech, passionate about helping aspiring PMs navigate their career path.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    location: 'Austin, TX',
    title: 'Senior Product Manager',
    company: 'ProductLab'
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'mentee',
    skills: ['SQL', 'Excel', 'Tableau'],
    interests: ['Data Analysis', 'Business Intelligence', 'Dashboard Design'],
    bio: 'Business analyst looking to transition into data science and seeking guidance on developing technical skills and building a portfolio.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    location: 'Denver, CO',
    title: 'Business Analyst',
    company: 'AnalyticsPro'
  }
];

export const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: '1',
    senderId: '3',
    receiverId: '1',
    status: 'pending',
    message: 'Hi Jessica, I really admire your work in React and would love to learn from your experience. Would you be open to mentoring me?',
    createdAt: '2023-04-15T10:30:00Z'
  },
  {
    id: '2',
    senderId: '4',
    receiverId: '1',
    status: 'accepted',
    message: 'Hello Jessica, I\'m trying to improve my JavaScript skills. Would you be willing to mentor me?',
    createdAt: '2023-04-10T14:20:00Z'
  },
  {
    id: '3',
    senderId: '6',
    receiverId: '2',
    status: 'pending',
    message: 'Hi Marcus, I\'m interested in transitioning to data science and would appreciate your guidance.',
    createdAt: '2023-04-12T09:15:00Z'
  },
  {
    id: '4',
    senderId: '3',
    receiverId: '5',
    status: 'declined',
    message: 'Hello Emily, I\'m interested in learning more about product management. Would you be my mentor?',
    createdAt: '2023-04-05T16:45:00Z'
  }
];

export const skillsList = [
  'JavaScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET',
  'Ruby', 'Ruby on Rails', 'PHP', 'Laravel', 'Kotlin', 'Swift',
  'HTML', 'CSS', 'Sass', 'LESS', 'TailwindCSS', 'Bootstrap',
  'TypeScript', 'GraphQL', 'REST API', 'SQL', 'PostgreSQL', 'MySQL',
  'MongoDB', 'Redis', 'AWS', 'Azure', 'Google Cloud', 'Docker',
  'Kubernetes', 'CI/CD', 'Git', 'GitHub', 'GitLab', 'Bitbucket',
  'Agile', 'Scrum', 'Product Management', 'UX/UI Design', 'Figma',
  'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Data Analysis',
  'Data Science', 'Machine Learning', 'Deep Learning', 'AI',
  'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Blockchain',
  'Smart Contracts', 'Solidity', 'Ethereum', 'Web3', 'Mobile Development',
  'Android', 'iOS', 'React Native', 'Flutter', 'Game Development',
  'Unity', 'Unreal Engine', 'C++', 'DevOps', 'Linux', 'Bash',
  'PowerShell', 'Networking', 'Security', 'Penetration Testing',
  'Ethical Hacking', 'SEO', 'Digital Marketing', 'Content Creation',
  'Technical Writing', 'Project Management', 'Leadership', 'Public Speaking'
];

export const interestsList = [
  'Web Development', 'Mobile Development', 'Game Development', 'Data Science',
  'Machine Learning', 'Artificial Intelligence', 'Blockchain', 'Cloud Computing',
  'DevOps', 'Cybersecurity', 'UI/UX Design', 'Product Management', 'Project Management',
  'Technical Writing', 'Open Source', 'Startups', 'Enterprise Software',
  'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'GreenTech', 'Social Media',
  'Digital Marketing', 'Content Creation', 'Community Building', 'Leadership',
  'Career Development', 'Remote Work', 'Work-Life Balance', 'Personal Branding',
  'Networking', 'Mentorship', 'Teaching', 'Public Speaking', 'Technical Interviews',
  'Code Reviews', 'Pair Programming', 'Agile Methodologies', 'Team Collaboration',
  'Cross-functional Collaboration', 'Entrepreneurship', 'Innovation', 'Research',
  'Accessibility', 'Diversity and Inclusion', 'Ethics in Technology'
];
