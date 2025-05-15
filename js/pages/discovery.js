
/**
 * Discovery page component for MentorMatch
 */

const DiscoveryPage = (() => {
  // State for filters
  let filters = {
    role: '',
    skills: [],
    interests: []
  };

  // Available skills and interests for filtering
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
   * Render the discovery page
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
    
    main.appendChild(Utils.createElement('h1', { class: 'text-2xl font-bold mb-6' }, 'Find Your Match'));
    
    // Filter bar
    const filterBar = Utils.createElement('div', { class: 'filter-bar' });
    
    // Create filter form
    const filterForm = Utils.createElement('form', {
      class: 'filter-form',
      onsubmit: (e) => {
        e.preventDefault();
        applyFilters();
      }
    });
    
    // Role filter
    const roleGroup = Utils.createElement('div', { class: 'form-group' });
    roleGroup.appendChild(Utils.createElement('label', { for: 'role-filter' }, 'Role'));
    
    const roleSelect = Utils.createElement('select', {
      id: 'role-filter',
      class: 'form-control'
    });
    
    roleSelect.appendChild(Utils.createElement('option', { value: '' }, 'All Roles'));
    roleSelect.appendChild(Utils.createElement('option', { value: 'mentor' }, 'Mentors'));
    roleSelect.appendChild(Utils.createElement('option', { value: 'mentee' }, 'Mentees'));
    
    // Set selected option based on current filter
    if (filters.role) {
      roleSelect.value = filters.role;
    }
    
    roleGroup.appendChild(roleSelect);
    filterForm.appendChild(roleGroup);
    
    // Skills filter
    const skillsGroup = Utils.createElement('div', { class: 'form-group' });
    skillsGroup.appendChild(Utils.createElement('label', { for: 'skills-filter' }, 'Skills'));
    
    const skillsSelect = Utils.createElement('select', {
      id: 'skills-filter',
      class: 'form-control'
    });
    
    skillsSelect.appendChild(Utils.createElement('option', { value: '' }, 'Select a skill...'));
    
    availableSkills.forEach(skill => {
      if (!filters.skills.includes(skill)) {
        skillsSelect.appendChild(Utils.createElement('option', { value: skill }, skill));
      }
    });
    
    skillsGroup.appendChild(skillsSelect);
    filterForm.appendChild(skillsGroup);
    
    // Interests filter
    const interestsGroup = Utils.createElement('div', { class: 'form-group' });
    interestsGroup.appendChild(Utils.createElement('label', { for: 'interests-filter' }, 'Interests'));
    
    const interestsSelect = Utils.createElement('select', {
      id: 'interests-filter',
      class: 'form-control'
    });
    
    interestsSelect.appendChild(Utils.createElement('option', { value: '' }, 'Select an interest...'));
    
    availableInterests.forEach(interest => {
      if (!filters.interests.includes(interest)) {
        interestsSelect.appendChild(Utils.createElement('option', { value: interest }, interest));
      }
    });
    
    interestsGroup.appendChild(interestsSelect);
    filterForm.appendChild(interestsGroup);
    
    // Submit button
    const submitBtn = Utils.createElement('button', {
      type: 'submit',
      class: 'button btn-primary',
      style: 'align-self: end;'
    }, 'Apply Filters');
    
    filterForm.appendChild(submitBtn);
    filterBar.appendChild(filterForm);
    
    // Show active filters
    const activeFilters = Utils.createElement('div', { class: 'filter-tags', id: 'active-filters' });
    
    // Add role filter tag if active
    if (filters.role) {
      const roleTag = Utils.createElement('div', { class: 'filter-tag' });
      roleTag.appendChild(document.createTextNode(`Role: ${filters.role === 'mentor' ? 'Mentors' : 'Mentees'}`));
      roleTag.appendChild(Utils.createElement('button', {
        class: 'filter-tag-remove',
        onclick: () => {
          filters.role = '';
          render();
        }
      }, '×'));
      activeFilters.appendChild(roleTag);
    }
    
    // Add skill filter tags
    filters.skills.forEach(skill => {
      const skillTag = Utils.createElement('div', { class: 'filter-tag' });
      skillTag.appendChild(document.createTextNode(`Skill: ${skill}`));
      skillTag.appendChild(Utils.createElement('button', {
        class: 'filter-tag-remove',
        onclick: () => {
          filters.skills = filters.skills.filter(s => s !== skill);
          render();
        }
      }, '×'));
      activeFilters.appendChild(skillTag);
    });
    
    // Add interest filter tags
    filters.interests.forEach(interest => {
      const interestTag = Utils.createElement('div', { class: 'filter-tag' });
      interestTag.appendChild(document.createTextNode(`Interest: ${interest}`));
      interestTag.appendChild(Utils.createElement('button', {
        class: 'filter-tag-remove',
        onclick: () => {
          filters.interests = filters.interests.filter(i => i !== interest);
          render();
        }
      }, '×'));
      activeFilters.appendChild(interestTag);
    });
    
    if (filters.role || filters.skills.length > 0 || filters.interests.length > 0) {
      // Add clear all button
      const clearAllBtn = Utils.createElement('button', {
        class: 'button btn-secondary ml-2',
        onclick: () => {
          filters = { role: '', skills: [], interests: [] };
          render();
        }
      }, 'Clear All');
      
      activeFilters.appendChild(clearAllBtn);
      filterBar.appendChild(activeFilters);
    }
    
    main.appendChild(filterBar);
    
    // Results section
    const resultsSection = Utils.createElement('div', { class: 'mt-8' });
    
    // Load users based on filters
    Auth.getUsers(filters)
      .then(users => {
        if (users.length === 0) {
          resultsSection.appendChild(Utils.createElement('div', { class: 'text-center py-8' }, 'No users found matching your filters.'));
        } else {
          resultsSection.appendChild(Utils.createElement('h2', { class: 'text-xl font-semibold mb-4' }, `Found ${users.length} ${users.length === 1 ? 'match' : 'matches'}`));
          
          // User grid
          const userGrid = Utils.createElement('div', { class: 'user-grid' });
          
          users.forEach(user => {
            userGrid.appendChild(renderUserCard(user));
          });
          
          resultsSection.appendChild(userGrid);
        }
        
        main.appendChild(resultsSection);
        
        // Append page to app container
        appContainer.innerHTML = '';
        appContainer.appendChild(page);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        
        resultsSection.appendChild(Utils.createElement('div', { class: 'text-center py-8 text-red-600' }, 'Error loading users. Please try again.'));
        
        main.appendChild(resultsSection);
        
        // Append page to app container
        appContainer.innerHTML = '';
        appContainer.appendChild(page);
      });
  };
  
  /**
   * Apply filters from the form
   */
  const applyFilters = () => {
    const roleSelect = Utils.qs('#role-filter');
    const skillsSelect = Utils.qs('#skills-filter');
    const interestsSelect = Utils.qs('#interests-filter');
    
    // Update role filter
    filters.role = roleSelect.value;
    
    // Add skill filter if selected
    const selectedSkill = skillsSelect.value;
    if (selectedSkill && !filters.skills.includes(selectedSkill)) {
      filters.skills.push(selectedSkill);
    }
    
    // Add interest filter if selected
    const selectedInterest = interestsSelect.value;
    if (selectedInterest && !filters.interests.includes(selectedInterest)) {
      filters.interests.push(selectedInterest);
    }
    
    // Re-render with new filters
    render();
  };
  
  /**
   * Render a user card
   * @param {Object} user - User data
   * @returns {HTMLElement} - User card element
   */
  const renderUserCard = (user) => {
    const card = Utils.createElement('div', { class: 'card' });
    
    // User header
    const header = Utils.createElement('div', { class: 'flex items-center mb-4' });
    
    // Avatar with initials
    const avatar = Utils.createElement('div', { class: 'profile-avatar' }, Utils.getInitials(user.name));
    header.appendChild(avatar);
    
    // User info
    const info = Utils.createElement('div', { class: 'ml-3' });
    info.appendChild(Utils.createElement('h3', { class: 'font-semibold text-lg' }, user.name));
    info.appendChild(Utils.createElement('div', { class: 'text-sm text-gray-600' }, user.role === 'mentor' ? 'Mentor' : 'Mentee'));
    
    if (user.location) {
      info.appendChild(Utils.createElement('div', { class: 'text-sm text-gray-600' }, user.location));
    }
    
    header.appendChild(info);
    card.appendChild(header);
    
    // Bio
    if (user.bio) {
      card.appendChild(Utils.createElement('p', { class: 'mb-4 text-sm' }, user.bio));
    }
    
    // Skills
    if (user.skills && user.skills.length > 0) {
      const skillsSection = Utils.createElement('div', { class: 'mb-3' });
      skillsSection.appendChild(Utils.createElement('div', { class: 'text-sm font-medium' }, 'Skills:'));
      
      const skillsList = Utils.createElement('div', { class: 'tag-list' });
      user.skills.slice(0, 5).forEach(skill => {
        skillsList.appendChild(Utils.createElement('div', { class: 'tag' }, skill));
      });
      
      if (user.skills.length > 5) {
        skillsList.appendChild(Utils.createElement('div', { class: 'tag' }, `+${user.skills.length - 5} more`));
      }
      
      skillsSection.appendChild(skillsList);
      card.appendChild(skillsSection);
    }
    
    // Interests
    if (user.interests && user.interests.length > 0) {
      const interestsSection = Utils.createElement('div', { class: 'mb-4' });
      interestsSection.appendChild(Utils.createElement('div', { class: 'text-sm font-medium' }, 'Interests:'));
      
      const interestsList = Utils.createElement('div', { class: 'tag-list' });
      user.interests.slice(0, 5).forEach(interest => {
        interestsList.appendChild(Utils.createElement('div', { class: 'tag' }, interest));
      });
      
      if (user.interests.length > 5) {
        interestsList.appendChild(Utils.createElement('div', { class: 'tag' }, `+${user.interests.length - 5} more`));
      }
      
      interestsSection.appendChild(interestsList);
      card.appendChild(interestsSection);
    }
    
    // Connect button
    const connectBtn = Utils.createElement('button', {
      class: 'button btn-primary mt-2',
      onclick: () => {
        sendConnectionRequest(user.id);
      }
    }, 'Connect');
    
    card.appendChild(connectBtn);
    
    return card;
  };
  
  /**
   * Send a connection request to a user
   * @param {number} userId - ID of the user to connect with
   */
  const sendConnectionRequest = (userId) => {
    Auth.sendConnectionRequest(userId)
      .then(result => {
        if (result.success) {
          Toast.success('Connection request sent successfully');
        } else {
          Toast.error('Failed to send connection request');
        }
      })
      .catch(error => {
        Toast.error('Error: ' + error.message);
      });
  };
  
  return {
    render
  };
})();
