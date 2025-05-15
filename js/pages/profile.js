
/**
 * Profile page component for MentorMatch
 */

const ProfilePage = (() => {
  // Available skills and interests for selection
  const availableSkills = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++',
    'HTML', 'CSS', 'React', 'Angular', 'Vue',
    'Node.js', 'Express', 'Django', 'Flask', 'Spring',
    'SQL', 'MongoDB', 'Firebase', 'AWS', 'Azure',
    'DevOps', 'Testing', 'UI/UX', 'Product Management', 'Agile'
  ];
  
  const availableInterests = [
    'Web Development', 'Mobile Development', 'Data Science',
    'Machine Learning', 'Artificial Intelligence', 'Cloud Computing',
    'Game Development', 'Cybersecurity', 'Blockchain', 'IoT',
    'Frontend Development', 'Backend Development', 'Full Stack Development',
    'UI/UX Design', 'Product Management', 'Project Management',
    'Technical Writing', 'Open Source', 'Career Growth', 'Leadership'
  ];

  /**
   * Render the profile page
   */
  const render = () => {
    const appContainer = Utils.qs('#app');
    const currentUser = Auth.getCurrentUser();
    
    // Redirect if not logged in
    if (!currentUser) {
      Router.navigate('/', { auth: 'login' });
      return;
    }
    
    // Create page structure
    const page = Utils.createElement('div', { class: 'min-h-screen flex flex-col bg-gray-50' });
    
    // Add navbar
    page.appendChild(Navbar.render());
    
    // Main content
    const main = Utils.createElement('div', { class: 'flex-1 container py-8' });
    
    // Create profile layout
    const profileContainer = Utils.createElement('div', { class: 'profile-container' });
    
    // Sidebar / Preview
    const sidebar = Utils.createElement('div', {});
    sidebar.appendChild(Utils.createElement('h2', { class: 'text-xl font-bold mb-4' }, 'Profile Preview'));
    sidebar.appendChild(renderProfileCard(currentUser));
    
    const findMatchesBtn = Utils.createElement('button', {
      class: 'button btn-primary mt-6',
      onclick: () => Router.navigate('/discovery')
    }, 'Find Matches');
    sidebar.appendChild(findMatchesBtn);
    
    profileContainer.appendChild(sidebar);
    
    // Main Content / Edit Form
    const content = Utils.createElement('div', {});
    content.appendChild(Utils.createElement('h1', { class: 'text-2xl font-bold mb-6' }, 'Edit Profile'));
    
    const profileForm = Utils.createElement('div', { class: 'card' });
    
    // Basic Info
    const basicInfoSection = Utils.createElement('div', { class: 'mb-6' });
    basicInfoSection.appendChild(Utils.createElement('h3', { class: 'text-lg font-semibold mb-4' }, 'Basic Information'));
    
    // Name input
    const nameGroup = Utils.createElement('div', { class: 'form-group' });
    nameGroup.appendChild(Utils.createElement('label', { for: 'name' }, 'Name'));
    nameGroup.appendChild(Utils.createElement('input', {
      type: 'text',
      id: 'name',
      class: 'form-control',
      value: currentUser.name,
      placeholder: 'Enter your full name'
    }));
    basicInfoSection.appendChild(nameGroup);
    
    // Location input
    const locationGroup = Utils.createElement('div', { class: 'form-group' });
    locationGroup.appendChild(Utils.createElement('label', { for: 'location' }, 'Location'));
    locationGroup.appendChild(Utils.createElement('input', {
      type: 'text',
      id: 'location',
      class: 'form-control',
      value: currentUser.location || '',
      placeholder: 'City, Country'
    }));
    basicInfoSection.appendChild(locationGroup);
    
    // Bio input
    const bioGroup = Utils.createElement('div', { class: 'form-group' });
    bioGroup.appendChild(Utils.createElement('label', { for: 'bio' }, 'Bio'));
    bioGroup.appendChild(Utils.createElement('textarea', {
      id: 'bio',
      class: 'form-control',
      rows: 4,
      placeholder: 'Tell us about yourself'
    }, currentUser.bio || ''));
    basicInfoSection.appendChild(bioGroup);
    
    profileForm.appendChild(basicInfoSection);
    
    // Skills section
    const skillsSection = Utils.createElement('div', { class: 'mb-6' });
    skillsSection.appendChild(Utils.createElement('h3', { class: 'text-lg font-semibold mb-4' }, 'Skills'));
    
    // Skills multiselect
    const skillsGroup = Utils.createElement('div', { class: 'form-group' });
    
    // Current skills display
    const currentSkills = Utils.createElement('div', { class: 'tag-list mb-2', id: 'current-skills' });
    
    // Add each skill as a removable tag
    if (currentUser.skills && currentUser.skills.length > 0) {
      currentUser.skills.forEach(skill => {
        const skillTag = Utils.createElement('div', { class: 'tag' });
        skillTag.appendChild(document.createTextNode(skill));
        skillTag.appendChild(Utils.createElement('button', {
          class: 'ml-2',
          onclick: (e) => {
            e.preventDefault();
            removeSkill(skill);
            skillTag.remove();
          }
        }, '×'));
        currentSkills.appendChild(skillTag);
      });
    }
    
    skillsGroup.appendChild(currentSkills);
    
    // Skills dropdown
    const skillsSelect = Utils.createElement('select', {
      id: 'skills-select',
      class: 'form-control'
    });
    
    // Add empty option
    skillsSelect.appendChild(Utils.createElement('option', { value: '' }, 'Select a skill to add...'));
    
    // Add available skills
    availableSkills.forEach(skill => {
      if (!currentUser.skills || !currentUser.skills.includes(skill)) {
        skillsSelect.appendChild(Utils.createElement('option', { value: skill }, skill));
      }
    });
    
    skillsGroup.appendChild(skillsSelect);
    
    // Add skill button
    const addSkillBtn = Utils.createElement('button', {
      type: 'button',
      class: 'button btn-secondary mt-2',
      onclick: () => {
        const select = Utils.qs('#skills-select');
        const selectedSkill = select.value;
        
        if (selectedSkill) {
          // Add skill to user object
          addSkill(selectedSkill);
          
          // Add skill tag to UI
          const skillTag = Utils.createElement('div', { class: 'tag' });
          skillTag.appendChild(document.createTextNode(selectedSkill));
          skillTag.appendChild(Utils.createElement('button', {
            class: 'ml-2',
            onclick: (e) => {
              e.preventDefault();
              removeSkill(selectedSkill);
              skillTag.remove();
            }
          }, '×'));
          
          Utils.qs('#current-skills').appendChild(skillTag);
          
          // Remove option from dropdown
          select.removeChild(select.querySelector(`option[value="${selectedSkill}"]`));
          select.value = '';
        }
      }
    }, 'Add Skill');
    
    skillsGroup.appendChild(addSkillBtn);
    skillsSection.appendChild(skillsGroup);
    
    profileForm.appendChild(skillsSection);
    
    // Interests section
    const interestsSection = Utils.createElement('div', { class: 'mb-6' });
    interestsSection.appendChild(Utils.createElement('h3', { class: 'text-lg font-semibold mb-4' }, 'Interests'));
    
    // Interests multiselect
    const interestsGroup = Utils.createElement('div', { class: 'form-group' });
    
    // Current interests display
    const currentInterests = Utils.createElement('div', { class: 'tag-list mb-2', id: 'current-interests' });
    
    // Add each interest as a removable tag
    if (currentUser.interests && currentUser.interests.length > 0) {
      currentUser.interests.forEach(interest => {
        const interestTag = Utils.createElement('div', { class: 'tag' });
        interestTag.appendChild(document.createTextNode(interest));
        interestTag.appendChild(Utils.createElement('button', {
          class: 'ml-2',
          onclick: (e) => {
            e.preventDefault();
            removeInterest(interest);
            interestTag.remove();
          }
        }, '×'));
        currentInterests.appendChild(interestTag);
      });
    }
    
    interestsGroup.appendChild(currentInterests);
    
    // Interests dropdown
    const interestsSelect = Utils.createElement('select', {
      id: 'interests-select',
      class: 'form-control'
    });
    
    // Add empty option
    interestsSelect.appendChild(Utils.createElement('option', { value: '' }, 'Select an interest to add...'));
    
    // Add available interests
    availableInterests.forEach(interest => {
      if (!currentUser.interests || !currentUser.interests.includes(interest)) {
        interestsSelect.appendChild(Utils.createElement('option', { value: interest }, interest));
      }
    });
    
    interestsGroup.appendChild(interestsSelect);
    
    // Add interest button
    const addInterestBtn = Utils.createElement('button', {
      type: 'button',
      class: 'button btn-secondary mt-2',
      onclick: () => {
        const select = Utils.qs('#interests-select');
        const selectedInterest = select.value;
        
        if (selectedInterest) {
          // Add interest to user object
          addInterest(selectedInterest);
          
          // Add interest tag to UI
          const interestTag = Utils.createElement('div', { class: 'tag' });
          interestTag.appendChild(document.createTextNode(selectedInterest));
          interestTag.appendChild(Utils.createElement('button', {
            class: 'ml-2',
            onclick: (e) => {
              e.preventDefault();
              removeInterest(selectedInterest);
              interestTag.remove();
            }
          }, '×'));
          
          Utils.qs('#current-interests').appendChild(interestTag);
          
          // Remove option from dropdown
          select.removeChild(select.querySelector(`option[value="${selectedInterest}"]`));
          select.value = '';
        }
      }
    }, 'Add Interest');
    
    interestsGroup.appendChild(addInterestBtn);
    interestsSection.appendChild(interestsGroup);
    
    profileForm.appendChild(interestsSection);
    
    // Save button
    const saveBtn = Utils.createElement('button', {
      type: 'button',
      class: 'button btn-primary',
      onclick: saveProfile
    }, 'Save Changes');
    
    profileForm.appendChild(saveBtn);
    
    content.appendChild(profileForm);
    
    profileContainer.appendChild(content);
    main.appendChild(profileContainer);
    
    page.appendChild(main);
    
    // Append page to app container
    appContainer.innerHTML = '';
    appContainer.appendChild(page);
  };
  
  /**
   * Render a profile card for the given user
   * @param {Object} user - User data
   * @returns {HTMLElement} - Profile card element
   */
  const renderProfileCard = (user) => {
    const card = Utils.createElement('div', { class: 'profile-card' });
    
    // Profile header
    const header = Utils.createElement('div', { class: 'profile-header' });
    
    // Avatar with initials
    const avatar = Utils.createElement('div', { class: 'profile-avatar' }, Utils.getInitials(user.name));
    header.appendChild(avatar);
    
    // Name and role
    const info = Utils.createElement('div', {});
    info.appendChild(Utils.createElement('div', { class: 'profile-name' }, user.name));
    info.appendChild(Utils.createElement('div', { class: 'profile-role' }, 
      user.role === 'mentor' ? 'Mentor' : 'Mentee'
    ));
    header.appendChild(info);
    
    card.appendChild(header);
    
    // Bio
    if (user.bio) {
      card.appendChild(Utils.createElement('div', { class: 'mt-4' }, user.bio));
    }
    
    // Location
    if (user.location) {
      const locationSection = Utils.createElement('div', { class: 'mt-4' });
      locationSection.appendChild(Utils.createElement('div', { class: 'font-medium' }, 'Location:'));
      locationSection.appendChild(Utils.createElement('div', {}, user.location));
      card.appendChild(locationSection);
    }
    
    // Skills
    if (user.skills && user.skills.length > 0) {
      const skillsSection = Utils.createElement('div', { class: 'profile-section' });
      skillsSection.appendChild(Utils.createElement('div', { class: 'profile-section-title' }, 'Skills:'));
      
      const skillsList = Utils.createElement('div', { class: 'tag-list' });
      user.skills.forEach(skill => {
        skillsList.appendChild(Utils.createElement('div', { class: 'tag' }, skill));
      });
      
      skillsSection.appendChild(skillsList);
      card.appendChild(skillsSection);
    }
    
    // Interests
    if (user.interests && user.interests.length > 0) {
      const interestsSection = Utils.createElement('div', { class: 'profile-section' });
      interestsSection.appendChild(Utils.createElement('div', { class: 'profile-section-title' }, 'Interests:'));
      
      const interestsList = Utils.createElement('div', { class: 'tag-list' });
      user.interests.forEach(interest => {
        interestsList.appendChild(Utils.createElement('div', { class: 'tag' }, interest));
      });
      
      interestsSection.appendChild(interestsList);
      card.appendChild(interestsSection);
    }
    
    // Member since
    if (user.dateJoined) {
      const memberSection = Utils.createElement('div', { class: 'profile-section text-sm text-gray-600' });
      memberSection.appendChild(document.createTextNode(`Member since ${Utils.formatDate(user.dateJoined)}`));
      card.appendChild(memberSection);
    }
    
    return card;
  };
  
  /**
   * Add a skill to the current user
   * @param {string} skill - Skill to add
   */
  const addSkill = (skill) => {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser) return;
    
    if (!currentUser.skills) {
      currentUser.skills = [];
    }
    
    if (!currentUser.skills.includes(skill)) {
      currentUser.skills.push(skill);
    }
  };
  
  /**
   * Remove a skill from the current user
   * @param {string} skill - Skill to remove
   */
  const removeSkill = (skill) => {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser || !currentUser.skills) return;
    
    const index = currentUser.skills.indexOf(skill);
    if (index !== -1) {
      currentUser.skills.splice(index, 1);
    }
    
    // Add the skill back to the dropdown
    const select = Utils.qs('#skills-select');
    const option = Utils.createElement('option', { value: skill }, skill);
    select.appendChild(option);
  };
  
  /**
   * Add an interest to the current user
   * @param {string} interest - Interest to add
   */
  const addInterest = (interest) => {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser) return;
    
    if (!currentUser.interests) {
      currentUser.interests = [];
    }
    
    if (!currentUser.interests.includes(interest)) {
      currentUser.interests.push(interest);
    }
  };
  
  /**
   * Remove an interest from the current user
   * @param {string} interest - Interest to remove
   */
  const removeInterest = (interest) => {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser || !currentUser.interests) return;
    
    const index = currentUser.interests.indexOf(interest);
    if (index !== -1) {
      currentUser.interests.splice(index, 1);
    }
    
    // Add the interest back to the dropdown
    const select = Utils.qs('#interests-select');
    const option = Utils.createElement('option', { value: interest }, interest);
    select.appendChild(option);
  };
  
  /**
   * Save profile changes
   */
  const saveProfile = () => {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser) return;
    
    const name = Utils.qs('#name').value;
    const location = Utils.qs('#location').value;
    const bio = Utils.qs('#bio').value;
    
    if (!name.trim()) {
      Toast.error('Name is required');
      return;
    }
    
    // Update user data
    Auth.updateProfile({
      name,
      location,
      bio
    })
      .then(() => {
        Toast.success('Profile updated successfully');
        render(); // Re-render to show updated profile
      })
      .catch(error => {
        Toast.error('Failed to update profile: ' + error.message);
      });
  };
  
  return {
    render
  };
})();
