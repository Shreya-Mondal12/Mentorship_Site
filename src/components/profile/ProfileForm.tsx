
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/utils/mockData';
import { skillsList, interestsList } from '@/utils/mockData';
import { Button } from '@/components/ui/button';

const ProfileForm: React.FC = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    bio: '',
    skills: [],
    interests: [],
    location: '',
    title: '',
    company: '',
    yearsOfExperience: 0,
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        skills: user.skills || [],
        interests: user.interests || [],
        location: user.location || '',
        title: user.title || '',
        company: user.company || '',
        yearsOfExperience: user.yearsOfExperience || 0,
      });
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleSkillSelect = (skill: string) => {
    if (!formData.skills!.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill],
      }));
    }
    setSkillInput('');
  };
  
  const handleInterestSelect = (interest: string) => {
    if (!formData.interests!.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), interest],
      }));
    }
    setInterestInput('');
  };
  
  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills!.filter(s => s !== skill),
    }));
  };
  
  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests!.filter(i => i !== interest),
    }));
  };
  
  const filteredSkills = skillInput
    ? skillsList.filter(skill => 
        skill.toLowerCase().includes(skillInput.toLowerCase()) && 
        !formData.skills!.includes(skill)
      )
    : [];
    
  const filteredInterests = interestInput
    ? interestsList.filter(interest => 
        interest.toLowerCase().includes(interestInput.toLowerCase()) && 
        !formData.interests!.includes(interest)
      )
    : [];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateUser(formData);
    if (success) {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  
  if (!user) return null;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="input-field"
                placeholder="Tell others about yourself, your experience, and what you're looking for..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>
        
        {/* Professional Info Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Professional Information</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Software Engineer, Student, etc."
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company/School
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            {user.role === 'mentor' && (
              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  min="0"
                  value={formData.yearsOfExperience}
                  onChange={handleNumberChange}
                  className="input-field"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Skills</h3>
        
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="input-field"
              placeholder="Search and add skills..."
            />
            
            {skillInput && filteredSkills.length > 0 && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto border border-gray-200">
                {filteredSkills.slice(0, 5).map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills!.map((skill) => (
              <span
                key={skill}
                className="bg-primary-light text-primary px-2 py-1 rounded-md flex items-center text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 text-primary hover:text-primary-dark focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Interests Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Interests</h3>
        
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="input-field"
              placeholder="Search and add interests..."
            />
            
            {interestInput && filteredInterests.length > 0 && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto border border-gray-200">
                {filteredInterests.slice(0, 5).map((interest) => (
                  <div
                    key={interest}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleInterestSelect(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.interests!.map((interest) => (
              <span
                key={interest}
                className="bg-secondary text-white px-2 py-1 rounded-md flex items-center text-sm"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
