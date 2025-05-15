
/**
 * Authentication page component for MentorMatch
 */

const AuthPage = (() => {
  /**
   * Render the authentication form
   * @param {string} initialMode - Initial form mode ('login' or 'register')
   * @returns {HTMLElement} - The auth form element
   */
  const renderAuthForm = (initialMode = 'login') => {
    // Create form container
    const authContainer = Utils.createElement('div', { class: 'auth-container' });
    
    // State for form mode
    let formMode = initialMode;
    
    // Function to render the appropriate form based on mode
    const renderForm = () => {
      authContainer.innerHTML = '';
      
      // Form header
      const header = Utils.createElement('div', { class: 'auth-header' });
      header.appendChild(Utils.createElement('h2', { class: 'text-2xl font-bold' }, 
        formMode === 'login' ? 'Log In' : 'Create an Account'
      ));
      authContainer.appendChild(header);
      
      // Create form element
      const form = Utils.createElement('form', {
        onsubmit: (e) => {
          e.preventDefault();
          
          if (formMode === 'login') {
            handleLogin();
          } else {
            handleRegister();
          }
        }
      });
      
      // Add appropriate form fields
      if (formMode === 'register') {
        // Name field
        const nameGroup = Utils.createElement('div', { class: 'form-group' });
        nameGroup.appendChild(Utils.createElement('label', { for: 'name' }, 'Name'));
        nameGroup.appendChild(Utils.createElement('input', {
          type: 'text',
          id: 'name',
          class: 'form-control',
          placeholder: 'Enter your full name',
          required: true
        }));
        form.appendChild(nameGroup);
      }
      
      // Email field
      const emailGroup = Utils.createElement('div', { class: 'form-group' });
      emailGroup.appendChild(Utils.createElement('label', { for: 'email' }, 'Email'));
      emailGroup.appendChild(Utils.createElement('input', {
        type: 'email',
        id: 'email',
        class: 'form-control',
        placeholder: 'Enter your email',
        required: true
      }));
      form.appendChild(emailGroup);
      
      // Password field
      const passwordGroup = Utils.createElement('div', { class: 'form-group' });
      passwordGroup.appendChild(Utils.createElement('label', { for: 'password' }, 'Password'));
      passwordGroup.appendChild(Utils.createElement('input', {
        type: 'password',
        id: 'password',
        class: 'form-control',
        placeholder: 'Enter your password',
        minlength: formMode === 'register' ? 6 : undefined,
        required: true
      }));
      form.appendChild(passwordGroup);
      
      if (formMode === 'register') {
        // Role selection
        const roleGroup = Utils.createElement('div', { class: 'form-group' });
        roleGroup.appendChild(Utils.createElement('label', {}, 'I want to be a:'));
        
        const roleOptions = Utils.createElement('div', { class: 'flex gap-4 mt-2' });
        
        // Mentor option
        const mentorLabel = Utils.createElement('label', { class: 'flex items-center cursor-pointer' });
        mentorLabel.appendChild(Utils.createElement('input', {
          type: 'radio',
          name: 'role',
          value: 'mentor',
          checked: true
        }));
        mentorLabel.appendChild(Utils.createElement('span', { class: 'ml-2' }, 'Mentor'));
        roleOptions.appendChild(mentorLabel);
        
        // Mentee option
        const menteeLabel = Utils.createElement('label', { class: 'flex items-center cursor-pointer' });
        menteeLabel.appendChild(Utils.createElement('input', {
          type: 'radio',
          name: 'role',
          value: 'mentee'
        }));
        menteeLabel.appendChild(Utils.createElement('span', { class: 'ml-2' }, 'Mentee'));
        roleOptions.appendChild(menteeLabel);
        
        roleGroup.appendChild(roleOptions);
        form.appendChild(roleGroup);
      }
      
      // Submit button
      const submitBtn = Utils.createElement('button', {
        type: 'submit',
        class: 'button btn-primary w-100 mt-4',
        style: 'width: 100%;'
      }, formMode === 'login' ? 'Log In' : 'Sign Up');
      form.appendChild(submitBtn);
      
      authContainer.appendChild(form);
      
      // Form toggle
      const toggleText = formMode === 'login'
        ? 'Don\'t have an account? '
        : 'Already have an account? ';
      
      const toggleLink = formMode === 'login' ? 'Sign up' : 'Log in';
      
      const formToggle = Utils.createElement('div', { class: 'auth-toggle' });
      formToggle.appendChild(document.createTextNode(toggleText));
      formToggle.appendChild(Utils.createElement('span', {
        class: 'auth-toggle-link',
        onclick: () => {
          formMode = formMode === 'login' ? 'register' : 'login';
          renderForm();
        }
      }, toggleLink));
      
      authContainer.appendChild(formToggle);
    };
    
    // Handle login form submission
    const handleLogin = () => {
      const email = Utils.qs('#email').value;
      const password = Utils.qs('#password').value;
      
      // Validate input
      if (!email || !password) {
        Toast.error('Please fill in all fields');
        return;
      }
      
      if (!Utils.isValidEmail(email)) {
        Toast.error('Please enter a valid email address');
        return;
      }
      
      // Attempt login
      Auth.login(email, password)
        .then(user => {
          Toast.success(`Welcome back, ${user.name}!`);
          Router.navigate('/');
        })
        .catch(error => {
          Toast.error(error.message);
        });
    };
    
    // Handle register form submission
    const handleRegister = () => {
      const name = Utils.qs('#name').value;
      const email = Utils.qs('#email').value;
      const password = Utils.qs('#password').value;
      const roleInputs = Utils.qsAll('input[name="role"]');
      let role = 'mentee';
      
      // Get selected role
      roleInputs.forEach(input => {
        if (input.checked) {
          role = input.value;
        }
      });
      
      // Validate input
      if (!name || !email || !password) {
        Toast.error('Please fill in all fields');
        return;
      }
      
      if (!Utils.isValidEmail(email)) {
        Toast.error('Please enter a valid email address');
        return;
      }
      
      if (password.length < 6) {
        Toast.error('Password must be at least 6 characters');
        return;
      }
      
      // Attempt registration
      Auth.register({ name, email, password, role })
        .then(user => {
          Toast.success('Account created successfully!');
          Router.navigate('/profile');
        })
        .catch(error => {
          Toast.error(error.message);
        });
    };
    
    // Initial render
    renderForm();
    
    return authContainer;
  };
  
  return {
    renderAuthForm
  };
})();
